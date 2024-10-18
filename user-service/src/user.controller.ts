// user-service/src/user.controller.ts
import { Controller, Get } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/createUserDto';
import { LoginDto } from './dto/loginDto';
import { BadRequestException } from '@nestjs/common';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) { }

  @MessagePattern({ cmd: 'getAll' })
  async getAll() {
    return await this.userService.getAll();
  }

  @MessagePattern({ cmd: 'register' })
  async register(createUserDto: CreateUserDto) {
    try {
      return await this.userService.createUser(createUserDto);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @MessagePattern({ cmd: 'gethello' })
  async sendHello() {
    return await this.userService.getHello();
  }

  @MessagePattern({ cmd: 'login' })
  async login(loginDto: LoginDto) {
    return await this.userService.login(loginDto);
  }

  // @MessagePattern({ cmd: 'deleteUser' })
  // async deleteUser(id: string): Promise<String> {
  //   try {
  //     console.log('ID::::', JSON.stringify(id));
  //     const res = await this.userService.deleteUser(id);
  //     console.log(res);
  //   } catch (err) {
  //     console.error(err.message);
  //     throw new BadRequestException(err);
  //   }
  //   return `Deleted id: ${JSON.parse(id)} Successfully`;
  // }
  @Get('/')
  welcomeMessage() {
    return 'Welcome to the user microservice!';
  }
}
