import { Module } from '@nestjs/common';
import { UserController } from './controllers/User/user.controller';
import { UserService } from './controllers/User/user.service';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [UserService],
})
export class AppModule {}
