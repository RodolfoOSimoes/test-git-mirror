import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateAdminDto } from './dto/create-admin.dto';
import { Admin } from '../../entities/admin.entity';
import { AdminRole } from 'src/enums/AdminRoles';
import * as bcrypt from 'bcrypt';
import { MfaService } from 'src/utils/mfa/mfa.service';
import { MfaInterface } from 'src/utils/mfa/MfaInterface';
import * as generatePassword from 'generate-password';
import { PaginationService } from 'src/utils/pagination/pagination.service';
import { SendMailProducerService } from 'src/jobs/producers/sendMail-producer-service';
import { UpdateAdminProfileDto } from './dto/update-profile.dto';

@Injectable()
export class AdminService {
  constructor(
    @Inject('ADMIN_REPOSITORY')
    private adminRepository: Repository<Admin>,
    private mfaService: MfaService,
    private paginationService: PaginationService,
    private sendMailProducer: SendMailProducerService,
  ) {}

  async create(createAdminDto: CreateAdminDto) {
    if (
      createAdminDto.admin.password !==
      createAdminDto.admin.password_confirmation
    ) {
      return { message: 'Passwords não são iguais.' };
    }
    try {
      if (await this.findByEmail(createAdminDto.admin.email)) {
        return { message: 'Email já cadastrado.' };
      }
      const token: MfaInterface = this.mfaService.generateSecret();

      const admin = new Admin();
      admin.email = createAdminDto.admin.email;
      admin.password_digest = bcrypt.hashSync(
        createAdminDto.admin.password + process.env.PASSWORD_SALT,
        8,
      );
      admin.roles = AdminRole[createAdminDto.admin.roles.toUpperCase()];
      admin.status = createAdminDto.admin.status;
      admin.last_otp_at = new Date();
      admin.update_password_time = new Date();
      admin.otp_secret = token.base32;
      admin.token = token.hex;
      admin.token_reset = token.ascii;
      admin.created_at = new Date();
      await this.adminRepository.save(admin);
      return { message: 'Admin registrado com sucesso! ' };
    } catch (error) {
      console.error('AdminService::create::error::', error);
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Ops. Ocorreu um erro inesperado.',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll(page = 1): Promise<any> {
    const limit = 10;
    try {
      const count = await this.adminRepository.count();
      const data = (
        await this.adminRepository.find({
          where: { deleted: false },
          skip: (page - 1) * limit,
          take: limit,
          order: { id: 'DESC' },
        })
      )?.map((admin: Admin) => {
        return this.adminMapper(admin);
      });

      return {
        data,
        currentPage: page,
        size: Math.ceil(count / limit),
        links: this.paginationService.pagination(
          'v1/backoffice/admins',
          page,
          limit,
          count,
        ),
      };
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Ops. Ocorreu um erro inesperado.',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async me(email: string): Promise<any> {
    try {
      return this.adminMapper(
        await this.adminRepository.findOne({
          email: email,
        }),
      );
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Ops. Ocorreu um erro inesperado.',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(id: number): Promise<any> {
    try {
      return this.adminMapper(await this.adminRepository.findOne(id));
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Ops. Ocorreu um erro inesperado.',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async forgetPassword(email: string) {
    try {
      const admin = await this.findByEmail(email);
      if (!admin) {
        throw new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            error: 'Admin não encontrado.',
          },
          HttpStatus.BAD_REQUEST,
        );
      }
      const password = this.generatePassword();
      const password_digest = bcrypt.hashSync(
        password + process.env.PASSWORD_SALT,
        8,
      );
      await this.adminRepository.update(admin.id, {
        password_digest: password_digest,
      });

      this.sendMailProducer.sendNewPasswordEmail(email, password);
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Ops. Ocorreu um erro inesperado.',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(id: number, createAdminDto: CreateAdminDto) {
    try {
      const admin = await this.adminRepository.findOne({ id: id });

      const resultAdmin = await this.findByEmail(createAdminDto.admin.email);

      if (resultAdmin && createAdminDto.admin.email != admin.email) {
        throw new HttpException(
          {
            status: HttpStatus.FORBIDDEN,
            error: 'E-mail já está sendo utilizado.',
          },
          HttpStatus.FORBIDDEN,
        );
      }

      await this.adminRepository.update(admin.id, {
        email: createAdminDto.admin.email || admin.email,
        password_digest: createAdminDto.admin.password
          ? bcrypt.hashSync(
              createAdminDto.admin.password + process.env.PASSWORD_SALT,
              8,
            )
          : admin.password_digest,
        roles: createAdminDto.admin.roles
          ? AdminRole[createAdminDto.admin.roles.toUpperCase()]
          : admin.roles,
        status: createAdminDto.admin.status,
      });
      return { message: 'Admin atualizado com sucesso! ' };
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: error.response.error || error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async updateByToken(email: string, createAdminDto: CreateAdminDto) {
    try {
      const admin = await this.adminRepository.findOne({ email: email });
      if (!admin) {
        throw new HttpException(
          {
            status: HttpStatus.FORBIDDEN,
            error: 'Admin não encontrado.',
          },
          HttpStatus.FORBIDDEN,
        );
      }
      const resultAdmin = await this.findByEmail(createAdminDto.admin.email);
      if (resultAdmin) {
        throw new HttpException(
          {
            status: HttpStatus.FORBIDDEN,
            error: 'E-mail já está sendo utilizado.',
          },
          HttpStatus.FORBIDDEN,
        );
      }

      const newAdmin = new Admin();
      newAdmin.email = createAdminDto.admin.email || admin.email;
      newAdmin.password_digest = createAdminDto.admin.password
        ? bcrypt.hashSync(
            createAdminDto.admin.password + process.env.PASSWORD_SALT,
            8,
          )
        : admin.password_digest;
      newAdmin.roles = createAdminDto.admin.roles
        ? AdminRole[createAdminDto.admin.roles.toUpperCase()]
        : admin.roles;
      newAdmin.status = createAdminDto.admin.status || admin.status;
      newAdmin.last_otp_at = new Date();
      newAdmin.update_password_time = new Date();
      await this.adminRepository.update(admin.id, newAdmin);
      return { message: 'Admin atualizado com sucesso! ' };
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: error.response.error || error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(email: string): Promise<void> {
    const admin = await this.adminRepository.findOne({ email: email });
    await this.adminRepository.update(admin.id, { status: false });
  }

  async findByEmail(email: string): Promise<Admin> {
    return await this.adminRepository.findOne({ email: email });
  }

  async findByToken(token: string): Promise<Admin> {
    return await this.adminRepository.findOne({ token: token });
  }

  async findById(id: number): Promise<Admin> {
    return await this.adminRepository.findOne(id);
  }

  async updateProfile(id: number, dto: UpdateAdminProfileDto) {
    const newPassword = bcrypt.hashSync(
      dto.admin.new_password + process.env.PASSWORD_SALT,
      8,
    );

    await this.adminRepository.update(id, {
      password_digest: newPassword,
      email: dto.admin.email,
    });

    return 'ok';
  }

  adminMapper(admin: Admin) {
    return {
      id: admin?.id,
      email: admin?.email,
      status: admin?.status,
      roles: AdminRole[admin?.roles]?.toLowerCase(),
      created_at: admin?.created_at,
      updated_at: admin?.updated_at,
    };
  }

  generatePassword() {
    return generatePassword.generate({
      length: 8,
      symbols: true,
      numbers: true,
    });
  }
}
