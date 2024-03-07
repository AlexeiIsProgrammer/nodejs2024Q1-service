import { Module } from '@nestjs/common';
import { SharedModule } from 'src/Shared/shared.module';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [SharedModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
