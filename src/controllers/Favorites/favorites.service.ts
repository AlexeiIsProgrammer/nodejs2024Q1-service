import { Injectable } from '@nestjs/common';
import { DbService } from '../db/db.service';

@Injectable()
export class FavoritesService {
  constructor(private readonly db: DbService) {}

  getAll() {
    return this.db.getAllFavorites();
  }

  addToFavoritesTrack(id: string) {
    this.db.addToFavoritesTrack(id);
  }

  removeFromFavoritesTrack(id: string) {
    this.db.removeFromFavoritesTrack(id);
  }

  addToFavoritesAlbum(id: string) {
    this.db.addToFavoritesAlbum(id);
  }

  removeFromFavoritesAlbum(id: string) {
    this.db.removeFromFavoritesAlbum(id);
  }

  addToFavoritesArtist(id: string) {
    this.db.addToFavoritesArtist(id);
  }

  removeFromFavoritesArtist(id: string) {
    this.db.removeFromFavoritesArtist(id);
  }
}
