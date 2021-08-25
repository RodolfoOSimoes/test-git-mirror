import { Inject, Injectable } from '@nestjs/common';
import { ActiveStorageAttachment } from 'src/entities/active_storage_attachment.entity';
import { ActiveStorageBlob } from 'src/entities/active_storage_blobs.entity';
import { Repository } from 'typeorm';
import * as request from 'request';
import * as aws from 'aws-sdk';

@Injectable()
export class StorageService {
  private s3client;
  constructor(
    @Inject('ACTIVE_STORAGE_BLOB_REPOSITORY')
    private blobRepository: Repository<ActiveStorageBlob>,
    @Inject('ACTIVE_STORAGE_ATTACHMENT_REPOSITORY')
    private attachmentRepository: Repository<ActiveStorageAttachment>,
  ) {
    const awsConfig = {
      accessKeyId: process.env.SMEHOST_STORAGE_ACCESS_KEY_ID,
      secretAccessKey: process.env.SMEHOST_STORAGE_SECRET_ACCESS_KEY,
      endpoint: process.env.SMEHOST_STORAGE_REGION,
      signatureVersion: 's3',
      s3ForcePathStyle: true,
    };
    this.s3client = new aws.S3(new aws.Config(awsConfig));
  }

  async saveProfilePic(url: string, userId: number) {
    try {
      const { res, body } = await new Promise((resolve, reject) => {
        request({ url: url, encoding: null }, (err, res, body) => {
          if (err) reject(err);
          resolve({
            res: res,
            body: body,
          });
        });
      });

      const key = this.generateRandomKey();

      await this.s3client.putObject(
        {
          Bucket: process.env.SMEHOST_STORAGE_BUCKET_NAME,
          Key: key,
          ContentType: res.headers['content-type'],
          ContentLength: res.headers['content-length'],
          Body: body,
          ACL: 'public-read',
        },
        async (err, data) => {
          if (err) throw err;
        },
      );

      const blob = await this.blobRepository.save({
        key: key,
        filename: 'profilepic',
        byte_size: res.headers['content-length'],
        content_type: 'image/jpeg',
        metadata: JSON.stringify({
          identified: true,
          width: 320,
          height: 320,
          analyzed: true,
        }),
        created_at: new Date(),
      });

      await this.attachmentRepository.save({
        name: 'image',
        record_type: 'User',
        record_id: userId,
        blob: blob,
        created_at: new Date(),
      });
    } catch (error) {
      console.log(
        'StorageService::saveProfilePic::Erro ao salvar imagem de perfil:: ',
        {
          error: JSON.stringify(error),
          userId: userId,
          url: url,
        },
      );
    }
  }

  async createPic(data: string, record_id: number, type: string) {
    try {
      const key = this.generateRandomKey();

      const buffer = Buffer.from(
        data.replace(/^data:image\/\w+;base64,/, ''),
        'base64',
      );

      const contentType = data.split('data:')[1]?.split(';')[0] ?? 'image/jpeg';

      await this.s3client.putObject(
        {
          Bucket: process.env.SMEHOST_STORAGE_BUCKET_NAME,
          Key: key,
          ContentType: contentType,
          ContentLength: buffer.length,
          ContentEncoding: 'base64',
          Body: buffer,
          ACL: 'public-read',
        },
        async (err, data) => {
          if (err) throw err;
        },
      );

      const blob = await this.blobRepository.save({
        key: key,
        filename:
          type == 'User' ? 'profilepic' : new Date().getTime().toString(),
        byte_size: buffer.length,
        content_type: contentType,
        metadata: JSON.stringify({
          identified: true,
          width: 320,
          height: 320,
          analyzed: true,
        }),
        created_at: new Date(),
      });

      await this.attachmentRepository.save({
        name: 'image',
        record_type: type,
        record_id: record_id,
        blob: blob,
        created_at: new Date(),
      });
    } catch (error) {
      console.log(
        'StorageService::createPic::Erro ao salvar imagem de perfil:: ',
        {
          error: JSON.stringify(error),
          id: record_id,
          data: data,
          type: type,
        },
      );
    }
  }

  async updatePic(data: string, record_id: number, type: string) {
    try {
      const attachment = await this.attachmentRepository.findOne({
        where: { record_type: type, record_id: record_id },
        relations: ['blob'],
      });

      if (!attachment || (attachment && !attachment.blob)) {
        await this.createPic(data, record_id, type);
      }

      const buffer = Buffer.from(
        data.replace(/^data:image\/\w+;base64,/, ''),
        'base64',
      );

      const key = this.generateRandomKey();

      const contentType = data.split('data:')[1]?.split(';')[0] ?? 'image/jpeg';

      await this.s3client.deleteObject(
        {
          Bucket: process.env.SMEHOST_STORAGE_BUCKET_NAME,
          Key: attachment.blob.key,
        },
        (err, data) => {
          if (err) console.log(err, err.stack); // error
        },
      );

      await this.s3client.putObject(
        {
          Bucket: process.env.SMEHOST_STORAGE_BUCKET_NAME,
          Key: key,
          ContentType: contentType,
          ContentLength: buffer.length,
          ContentEncoding: 'base64',
          Body: buffer,
          ACL: 'public-read',
        },
        async (err, data) => {
          if (err) throw err;
        },
      );

      this.blobRepository.update(attachment.blob.id, {
        key: key,
      });
    } catch (error) {
      console.log(
        'StorageService::updatePic::Erro ao salvar authentication token:: ',
        {
          error: JSON.stringify(error),
          id: record_id,
          data: data,
          type: type,
        },
      );
    }
  }

  async getPicture(type: string, id: number) {
    const attachment = await this.attachmentRepository.findOne({
      where: { record_type: type, record_id: id },
      relations: ['blob'],
    });

    if (attachment && attachment.blob) {
      return `https://cdn.smehost.net/apifiltrgamecom-brdevel/${attachment.blob.key}`;
    }

    return undefined;
  }

  generateRandomKey() {
    return (
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15)
    );
  }
}
