import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/createUserDto";
import { LoginDto } from "./dto/loginDto";

@Injectable()
export class UserService {
    private users = []
    async createUser(createUserDto: CreateUserDto) {
        this.users.push(createUserDto);
        return `created user ${JSON.stringify(createUserDto)}`
    }
    async getHello() {
        return "Hello Welcome to world of microservices!"
    }

    async login(loginDto: LoginDto) {
        console.log(`Users:${this.users} login: ${loginDto}`)
        if ((this.users) && this.users.find(users => loginDto.username === users.username && users.password === loginDto.password)) {
            return "Logged in successfully"
        }
        else {
            return "Invalid credentials"
        }
    }
}