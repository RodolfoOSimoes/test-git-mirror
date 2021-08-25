"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StorageService = void 0;
const common_1 = require("@nestjs/common");
const active_storage_attachment_entity_1 = require("../../entities/active_storage_attachment.entity");
const active_storage_blobs_entity_1 = require("../../entities/active_storage_blobs.entity");
const typeorm_1 = require("typeorm");
const request = require("request");
const aws = require("aws-sdk");
let StorageService = class StorageService {
    constructor(blobRepository, attachmentRepository) {
        this.blobRepository = blobRepository;
        this.attachmentRepository = attachmentRepository;
        const awsConfig = {
            accessKeyId: process.env.SMEHOST_STORAGE_ACCESS_KEY_ID,
            secretAccessKey: process.env.SMEHOST_STORAGE_SECRET_ACCESS_KEY,
            endpoint: process.env.SMEHOST_STORAGE_REGION,
            signatureVersion: 's3',
            s3ForcePathStyle: true,
        };
        this.s3client = new aws.S3(new aws.Config(awsConfig));
    }
    async saveProfilePic(url, userId) {
        try {
            const { res, body } = await new Promise((resolve, reject) => {
                request({ url: url, encoding: null }, (err, res, body) => {
                    if (err)
                        reject(err);
                    resolve({
                        res: res,
                        body: body,
                    });
                });
            });
            const key = this.generateRandomKey();
            await this.s3client.putObject({
                Bucket: process.env.SMEHOST_STORAGE_BUCKET_NAME,
                Key: key,
                ContentType: res.headers['content-type'],
                ContentLength: res.headers['content-length'],
                Body: body,
                ACL: 'public-read',
            }, async (err, data) => {
                if (err)
                    throw err;
            });
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
        }
        catch (error) {
            console.log('StorageService::saveProfilePic::Erro ao salvar imagem de perfil:: ', {
                error: JSON.stringify(error),
                userId: userId,
                url: url,
            });
        }
    }
    async createPic(data, record_id, type) {
        var _a, _b;
        try {
            const key = this.generateRandomKey();
            const buffer = Buffer.from(data.replace(/^data:image\/\w+;base64,/, ''), 'base64');
            const contentType = (_b = (_a = data.split('data:')[1]) === null || _a === void 0 ? void 0 : _a.split(';')[0]) !== null && _b !== void 0 ? _b : 'image/jpeg';
            await this.s3client.putObject({
                Bucket: process.env.SMEHOST_STORAGE_BUCKET_NAME,
                Key: key,
                ContentType: contentType,
                ContentLength: buffer.length,
                ContentEncoding: 'base64',
                Body: buffer,
                ACL: 'public-read',
            }, async (err, data) => {
                if (err)
                    throw err;
            });
            const blob = await this.blobRepository.save({
                key: key,
                filename: type == 'User' ? 'profilepic' : new Date().getTime().toString(),
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
        }
        catch (error) {
            console.log('StorageService::createPic::Erro ao salvar imagem de perfil:: ', {
                error: JSON.stringify(error),
                id: record_id,
                data: data,
                type: type,
            });
        }
    }
    async updatePic(data, record_id, type) {
        var _a, _b;
        try {
            const attachment = await this.attachmentRepository.findOne({
                where: { record_type: type, record_id: record_id },
                relations: ['blob'],
            });
            if (!attachment || (attachment && !attachment.blob)) {
                await this.createPic(data, record_id, type);
            }
            const buffer = Buffer.from(data.replace(/^data:image\/\w+;base64,/, ''), 'base64');
            const key = this.generateRandomKey();
            const contentType = (_b = (_a = data.split('data:')[1]) === null || _a === void 0 ? void 0 : _a.split(';')[0]) !== null && _b !== void 0 ? _b : 'image/jpeg';
            await this.s3client.deleteObject({
                Bucket: process.env.SMEHOST_STORAGE_BUCKET_NAME,
                Key: attachment.blob.key,
            }, (err, data) => {
                if (err)
                    console.log(err, err.stack);
            });
            await this.s3client.putObject({
                Bucket: process.env.SMEHOST_STORAGE_BUCKET_NAME,
                Key: key,
                ContentType: contentType,
                ContentLength: buffer.length,
                ContentEncoding: 'base64',
                Body: buffer,
                ACL: 'public-read',
            }, async (err, data) => {
                if (err)
                    throw err;
            });
            this.blobRepository.update(attachment.blob.id, {
                key: key,
            });
        }
        catch (error) {
            console.log('StorageService::updatePic::Erro ao salvar authentication token:: ', {
                error: JSON.stringify(error),
                id: record_id,
                data: data,
                type: type,
            });
        }
    }
    async getPicture(type, id) {
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
        return (Math.random().toString(36).substring(2, 15) +
            Math.random().toString(36).substring(2, 15));
    }
};
StorageService = __decorate([
    common_1.Injectable(),
    __param(0, common_1.Inject('ACTIVE_STORAGE_BLOB_REPOSITORY')),
    __param(1, common_1.Inject('ACTIVE_STORAGE_ATTACHMENT_REPOSITORY')),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.Repository])
], StorageService);
exports.StorageService = StorageService;
//# sourceMappingURL=storage.service.js.map