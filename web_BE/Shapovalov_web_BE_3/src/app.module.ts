import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AdminController, DriverController, UsersController } from './controllers/users.controller';
import { UserService } from './service/user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Orders, OrdersSchema, UserSchema, Users } from './schema';
import { UserAuthorizationMiddleware } from './midellware/userAuthorization.middleware';
import { OrdersController } from './controllers/orders.controller';
import { OrderService } from './service';
import { AppController } from './controllers/app.controller';

// mongodb + srv://michaelshapovalov3012:6RZT2f8UtBPbBE03@cluster0.jyshuak.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://michaelshapovalov3012:6RZT2f8UtBPbBE03@cluster0.jyshuak.mongodb.net/',
      { dbName: 'Cluster0' },
    ),
    MongooseModule.forFeature([
      {
        name: Users.name,
        schema: UserSchema,
      },
      {
        name: Orders.name,
        schema: OrdersSchema,
      },
    ]),
  ],
  controllers: [UsersController, OrdersController, AdminController, AppController, DriverController],
  providers: [UserService, OrderService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(UserAuthorizationMiddleware).forRoutes('/orders');
  }
}
