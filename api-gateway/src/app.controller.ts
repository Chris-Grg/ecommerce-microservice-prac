import { Controller, Get } from "@nestjs/common";

@Controller()
export class AppController {
    @Get('/')
    sendWelcome() {
        return "Welcome to api gateway!";
    }
}