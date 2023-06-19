import { Module } from '@nestjs/common';
import { UserRepository } from 'src/controllers/db/user.repository';
import { UserController } from 'src/controllers/http/user.controller';
import { UserService } from 'src/core/use-cases/user.service';
import { GracefulShutdownService } from './shutdown.service';

@Module({
  controllers: [UserController],
  providers: [
    UserRepository,
    {
      provide: 'IUserRepository',
      useClass: UserRepository,
    },
    UserService,
    GracefulShutdownService
  ],
})
export class AppModule {}
