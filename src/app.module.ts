import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SumServiceService } from './sum-service/sum-service.service';
import { SaynameModule } from './sayname/sayname.module';
import { AuthCheckMiddleware } from './middleware/authcheck.middleware';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [SaynameModule, AuthModule],
  controllers: [AppController, AuthController],
  providers: [AppService, SumServiceService, AuthService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthCheckMiddleware)
      .forRoutes({ path: '/sayname', method: RequestMethod.ALL });
  }
}
