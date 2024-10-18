import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { UserController } from './user/user.controller';
import { AppController } from './app.controller';

@Module({
  imports: [
    // ClientsModule.register([
    //   {
    //     name: 'USER_SERVICE',
    //     transport: Transport.RMQ,
    //     options: {
    //       urls: [process.env.RABBITMQ_URL],
    //       queue: 'users-queue',
    //     }
    //   },
    //   { name: 'PRODUCT_SERVICE', transport: Transport.TCP, options: { port: 3002 } },
    //   { name: 'CART_SERVICE', transport: Transport.TCP, options: { port: 3003 } },
    //   { name: 'ORDER_SERVICE', transport: Transport.TCP, options: { port: 3004 } },
    //   { name: 'PAYMENT_SERVICE', transport: Transport.TCP, options: { port: 3005 } },
    // ]),
    ClientsModule.registerAsync([
      {
        name: 'USER_SERVICE',
        useFactory: () => ({
          transport: Transport.RMQ,
          options: {
            urls: [process.env.RABBITMQ_URL], // Now you can access process.env safely
            queue: 'users-queue',
          },
        }),
      },
      // { name: 'PRODUCT_SERVICE', transport: Transport.TCP, options: { port: 3002 } },
      // { name: 'CART_SERVICE', transport: Transport.TCP, options: { port: 3003 } },
      // { name: 'ORDER_SERVICE', transport: Transport.TCP, options: { port: 3004 } },
      // { name: 'PAYMENT_SERVICE', transport: Transport.TCP, options: { port: 3005 } },
    ]),
  ],
  controllers: [AppController, UserController],
  providers: [AppService],
})
export class AppModule {}
