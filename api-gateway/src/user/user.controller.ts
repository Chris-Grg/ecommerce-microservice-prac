import { Controller, Post, Get, Body, Inject, BadRequestException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { createUserDto } from './dto/createUserDto';
import { loginDto } from './dto/loginDto';

@Controller('users')
export class UserController {
    constructor(
        @Inject('USER_SERVICE') private userService: ClientProxy,
    ) { }

    @Get("/hello")
    async localHello() {
        return "Hello from local"
    }
    @Get()
    async getHello() {
        try {
            return await this.userService.send({ cmd: 'gethello' }, {})
        } catch (error) {
            console.error(error)
        }
    }
    @Post('register')
    async register(@Body() createUserDto: createUserDto) {
        try {
            return await this.userService.send({ cmd: 'register' }, createUserDto);
        } catch (error) {
            throw new BadRequestException(error);
        }
    }

    @Post('login')
    async login(@Body() loginDto: loginDto) {
        try {
            return await this.userService.send({ cmd: 'login' }, loginDto);
        } catch (error) {
            console.error(`::::ERROR::::${error}`)
            throw new BadRequestException(error);
        }
    }



}