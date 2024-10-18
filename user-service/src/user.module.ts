import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ConfigurationService } from './config/configuration.service';
import { User } from './typeorm/entities/User';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'users-db',
      port: 3307,
      database: 'users',
      entities: [User],
      synchronize: true,
      username: 'testUser',
      password: 'testUserPassword@',
    }),
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [UserController],
  providers: [UserService, ConfigurationService],
})
export class UserModule {}
