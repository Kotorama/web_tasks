import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UserService } from './service/users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Users, UsersSchema } from './schema/users.schema';
import { UsersController } from './controllers/users.controller';
import { UserAuthorizationMiddleware } from './middleware/userAuthorization.middleware';
import { LinksController } from './controllers/links.controller';
import { LinksService } from './service/links.service';
import { Links, LinksSchema } from './schema/links.schema';

@Module({
  imports: [MongooseModule.forRoot(
    'mongodb+srv://michaelshapovalov3012:ZOp1uAKNOVCbuRLA@cluster0.vgcjazr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
    { dbName: 'Cluster0' },
  ),
  MongooseModule.forFeature([
    {
      name: Users.name,
      schema: UsersSchema,
    },
    {
      name: Links.name,
      schema: LinksSchema,
    },
  ]),
  ],
  controllers: [UsersController, LinksController],
  providers: [UserService, LinksService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(UserAuthorizationMiddleware).forRoutes('/links')
  }
}
