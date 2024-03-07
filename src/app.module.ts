import { Module } from '@nestjs/common';
import { UserController } from './controllers/User/user.controller';
import { UserService } from './controllers/User/user.service';
import { TrackService } from './controllers/Tracks/track.service';
import { TrackController } from './controllers/Tracks/track.controller';
import { ArtistController } from './controllers/Artists/artist.controller';
import { ArtistService } from './controllers/Artists/artist.service';

@Module({
  imports: [],
  controllers: [UserController, TrackController, ArtistController],
  providers: [UserService, TrackService, ArtistService],
})
export class AppModule {}
