import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class ConfigurationService {
    private mysqlUsername: string;
    private mysqlPassword: string;
    private mysqlDatabase: string;
    private mysqlHost: string;
    private mysqlPort: number;
    private rabbitmqUrl: string;


    constructor(private readonly configService: ConfigService) {
        this.mysqlUsername = configService.get<string>("MYSQL_USERNAME");
        this.mysqlPassword = configService.get<string>("MYSQL_PASSWORD");
        this.mysqlDatabase = configService.get<string>("MYSQL_DATABASE");
        this.mysqlHost = configService.get<string>("MYSQL_HOST");
        this.mysqlPort = configService.get<number>("MYSQL_PORT");
        this.rabbitmqUrl = configService.get<string>("RABBITMQ_URL");
    }
    getMysqlUsername(): string {
        return this.mysqlUsername;
    }
    getMysqlPassword(): string {
        return this.mysqlPassword;
    }
    getMysqlDatabase(): string {
        return this.mysqlDatabase
    }
    getMysqlHost(): string {
        return this.mysqlHost;
    }
    getMysqlPort(): number {
        return this.mysqlPort;
    }

    getRabbitmqUrl(): string {
        return this.rabbitmqUrl;
    }

}