import { Controller, Get, Post, Delete, Param, HttpCode } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesResponse } from './interfaces';
import { StatusCodes } from 'http-status-codes';

@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  @HttpCode(StatusCodes.OK)
  getAll(): FavoritesResponse {
    return this.favoritesService.getAll();
  }

  @Post('track/:id')
  addToFavoritesTrack(@Param('id') id: string) {
    return this.favoritesService.addToFavoritesTrack(id);
  }

  @Delete('track/:id')
  @HttpCode(StatusCodes.NO_CONTENT)
  removeFromFavoritesTrack(@Param('id') id: string) {
    return this.favoritesService.removeFromFavoritesTrack(id);
  }

  @Post('album/:id')
  @HttpCode(StatusCodes.CREATED)
  addToFavoritesAlbum(@Param('id') id: string) {
    return this.favoritesService.addToFavoritesAlbum(id);
  }

  @Delete('album/:id')
  @HttpCode(StatusCodes.NO_CONTENT)
  removeFromFavoritesAlbum(@Param('id') id: string) {
    return this.favoritesService.removeFromFavoritesAlbum(id);
  }

  @Post('artist/:id')
  @HttpCode(StatusCodes.CREATED)
  addToFavoritesArtist(@Param('id') id: string) {
    return this.favoritesService.addToFavoritesArtist(id);
  }

  @Delete('artist/:id')
  @HttpCode(StatusCodes.NO_CONTENT)
  removeFromFavoritesArtist(@Param('id') id: string) {
    return this.favoritesService.removeFromFavoritesArtist(id);
  }
}
