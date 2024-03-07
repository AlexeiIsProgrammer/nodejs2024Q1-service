import { Module } from '@nestjs/common';
import { UserController } from './controllers/User/user.controller';
import { UserService } from './controllers/User/user.service';
import { TrackService } from './controllers/Tracks/track.service';
import { TrackController } from './controllers/Tracks/track.controller';

@Module({
  imports: [],
  controllers: [UserController, TrackController],
  providers: [UserService, TrackService],
})
export class AppModule {}
