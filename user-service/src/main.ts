import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { UserModule } from './user.module';
import { ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv';
dotenv.config();

async function bootstrap() {
  const rabbitmqUrl = process.env.RABBITMQ_URL;
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    UserModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: [rabbitmqUrl],
        queue: 'users-queue',
      },
    },
  );
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Strip properties not defined in DTO
      forbidNonWhitelisted: true, // Throw error if unknown properties are provided
      transform: true, // Automatically transform payloads to DTO instances
      exceptionFactory: (errors) => {
        // Customize the exception to include detailed validation errors
        const messages = errors.map((error) => ({
          property: error.property,
          constraints: error.constraints,
        }));
        return { statusCode: 400, message: messages, error: 'Bad Request' };
      },
    }),
  );
  await app.listen();
  console.log(
    `User Service is running internally at port ${process.env.PORT}🚀`,
  );
}
bootstrap();
