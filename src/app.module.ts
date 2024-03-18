import { Module } from '@nestjs/common';
import { FavoritesModule } from './controllers/Favorites/favorites.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AlbumModule } from './controllers/Albums/album.module';
import { TrackModule } from './controllers/Tracks/track.module';
import { ArtistModule } from './controllers/Artists/artist.module';
import { UserModule } from './controllers/User/user.module';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    FavoritesModule,
    AlbumModule,
    TrackModule,
    ArtistModule,
    UserModule,
    PrismaModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
