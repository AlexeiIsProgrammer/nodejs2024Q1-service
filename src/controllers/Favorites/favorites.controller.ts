import { Controller, Get, Post, Delete, Param } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesResponse } from './interfaces';

@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  findAll(): FavoritesResponse {
    return this.favoritesService.findAll();
  }

  @Post('track/:id')
  addToFavoritesTrack(@Param('id') id: string) {
    return this.favoritesService.addToFavoritesTrack(id);
  }

  @Delete('track/:id')
  removeFromFavoritesTrack(@Param('id') id: string) {
    return this.favoritesService.removeFromFavoritesTrack(id);
  }

  @Post('album/:id')
  addToFavoritesAlbum(@Param('id') id: string) {
    return this.favoritesService.addToFavoritesAlbum(id);
  }

  @Delete('album/:id')
  removeFromFavoritesAlbum(@Param('id') id: string) {
    return this.favoritesService.removeFromFavoritesAlbum(id);
  }

  @Post('artist/:id')
  addToFavoritesArtist(@Param('id') id: string) {
    return this.favoritesService.addToFavoritesArtist(id);
  }

  @Delete('artist/:id')
  removeFromFavoritesArtist(@Param('id') id: string) {
    return this.favoritesService.removeFromFavoritesArtist(id);
  }
}
