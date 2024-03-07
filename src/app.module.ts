import { Module } from '@nestjs/common';
import { UserController } from './controllers/User/user.controller';
import { UserService } from './controllers/User/user.service';
import { TrackService } from './controllers/Tracks/track.service';
import { TrackController } from './controllers/Tracks/track.controller';
import { ArtistController } from './controllers/Artists/artist.controller';
import { ArtistService } from './controllers/Artists/artist.service';
import { AlbumController } from './controllers/Albums/album.controller';
import { AlbumService } from './controllers/Albums/album.service';

@Module({
  imports: [],
  controllers: [
    UserController,
    TrackController,
    ArtistController,
    AlbumController,
  ],
  providers: [UserService, TrackService, ArtistService, AlbumService],
})
export class AppModule {}
