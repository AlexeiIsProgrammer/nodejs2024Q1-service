import { Module } from '@nestjs/common';
import { AlbumService } from 'src/controllers/Albums/album.service';
import { ArtistService } from 'src/controllers/Artists/artist.service';
import { FavoritesService } from 'src/controllers/Favorites/favorites.service';
import { TrackService } from 'src/controllers/Tracks/track.service';
import { UserService } from 'src/controllers/User/user.service';

@Module({
  providers: [
    AlbumService,
    ArtistService,
    TrackService,
    FavoritesService,
    UserService,
  ],
  exports: [
    AlbumService,
    ArtistService,
    TrackService,
    FavoritesService,
    UserService,
  ],
})
export class SharedModule {}
