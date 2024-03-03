import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modules/auth/auth.module';
import { Task } from './modules/task/entities/task';
import { TaskModule } from './modules/task/task.module';
import { User } from './modules/user/entities/user.entity';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const fac = {
          type: 'postgres',
          host: configService.getOrThrow<string>('DB_HOST'),
          port: configService.getOrThrow<number>('DB_PORT'),
          username: configService.getOrThrow<string>('DB_USER'),
          password: configService.getOrThrow<string>('DB_PASS'),
          database: configService.getOrThrow<string>('DB_NAME'),
          entities: [User, Task],
          synchronize: true,
        };

        console.log(fac);

        return {
          type: 'postgres',
          host: configService.getOrThrow<string>('DB_HOST'),
          port: configService.getOrThrow<number>('DB_PORT'),
          username: configService.getOrThrow<string>('DB_USER'),
          password: configService.getOrThrow<string>('DB_PASS'),
          database: configService.getOrThrow<string>('DB_NAME'),
          entities: [User, Task],
          synchronize: true,
        };
      },
    }),
    UserModule,
    AuthModule,
    TaskModule,
  ],
})
export class AppModule {}
