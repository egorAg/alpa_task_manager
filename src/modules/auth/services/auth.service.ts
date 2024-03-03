import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { UserAuthDTO } from '../../user/dto/user.auth.dto';
import { UserCreateDTO } from '../../user/dto/user.create.dto';
import { User } from '../../user/entities/user.entity';
import { UserRepository } from '../../user/repository/user.repository';

@Injectable()
export class AuthService {
  constructor(
    private userRepo: UserRepository,
    private jwtService: JwtService,
  ) {}
  public async login(data: UserAuthDTO) {
    const user = await this.validateUser(data);

    return this.generateToken(user);
  }

  public async register(data: UserCreateDTO) {
    const candidate = await this.userRepo.findByLogin(data.login);

    if (candidate) {
      throw new HttpException(
        `User with login: ${data.login} already registered`,
        HttpStatus.BAD_REQUEST,
      );
    }

    const hashPassword = await bcrypt.hash(data.password, 5);

    const user = await this.userRepo.create({
      ...data,
      password: hashPassword,
    });

    return this.generateToken(user);
  }

  private async generateToken(user: User) {
    const payload = {
      id: user.id,
      login: user.login,
    };

    return {
      auth_token: await this.jwtService.signAsync(payload),
    };
  }

  private async validateUser(data: UserAuthDTO): Promise<User> {
    const user = await this.userRepo.findByLogin(data.login);

    const isPasswordValid = await bcrypt.compare(data.password, user.password);

    if (user && isPasswordValid) {
      return user;
    } else {
      throw new UnauthorizedException({ message: 'Invalid credentials!' });
    }
  }
}
