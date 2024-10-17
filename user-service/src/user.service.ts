import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/createUserDto";
import { LoginDto } from "./dto/loginDto";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./typeorm/entities/User";
import { Repository } from "typeorm";
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private userRepository: Repository<User>) { }
    private users = []
    async createUser(createUserDto: CreateUserDto) {
        const saltOrRounds = 10;
        const hashedPassword = await bcrypt.hash(createUserDto.password, saltOrRounds);

        const newUser = this.userRepository.create({
            ...createUserDto,
            password: hashedPassword,
        });
        return this.userRepository.save(newUser)
    }
    async getHello() {
        return "Hello Welcome to world of microservices!"
    }

    async login(loginDto: LoginDto) {
        const user = await this.userRepository.findOne({
            where: { username: loginDto.username },
        });

        if (!user) {
            return "Invalid credentials";
        }

        const isPasswordValid = await bcrypt.compare(loginDto.password, user.password);

        if (isPasswordValid) {
            return "Logged in successfully";
        } else {
            return "Invalid credentials";
        }
    }
}