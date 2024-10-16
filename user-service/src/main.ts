import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { UserModule } from './user.module';
import { ValidationPipe } from '@nestjs/common';


async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    UserModule,
    {
      transport: Transport.TCP,
      options: {
        host: '0.0.0.0',
        port: 3001,
      },
    },

  );
  app.useGlobalPipes(new ValidationPipe(
    {
      whitelist: true, // Strip properties not defined in DTO
      forbidNonWhitelisted: true, // Throw error if unknown properties are provided
      transform: true, // Automatically transform payloads to DTO instances
      exceptionFactory: (errors) => {
        // Customize the exception to include detailed validation errors
        const messages = errors.map(
          (error) => ({
            property: error.property,
            constraints: error.constraints,
          }),
        );
        return { statusCode: 400, message: messages, error: 'Bad Request' };
      },
    }
  ));
  await app.listen();
  console.log('User Service is running on port 3001 🚀')
}
bootstrap();