import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString } from "class-validator"

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    firstName: string
    @IsString()
    @IsNotEmpty()
    lastName: string
    @IsString()
    @IsNotEmpty()
    username: string
    @IsEmail()
    @IsNotEmpty()
    email: string
    @IsString()
    @IsNotEmpty()
    phone: string
    @IsString()
    @IsNotEmpty()
    password: string
}