import { Injectable } from '@nestjs/common';
import { Album, CreateAlbumDto } from './interfaces';
import { DbService } from '../db/db.service';

@Injectable()
export class AlbumService {
  constructor(private readonly db: DbService) {}

  getAll(): Album[] {
    return this.db.getAllAlbums();
  }

  getById(id: string): Album {
    return this.db.getAlbumById(id);
  }

  create(createAlbumDto: CreateAlbumDto): Album {
    return this.db.createAlbum(createAlbumDto);
  }

  update(id: string, updateAlbumDto: CreateAlbumDto): Album {
    return this.db.updateAlbum(id, updateAlbumDto);
  }

  delete(id: string): void {
    return this.db.deleteAlbum(id);
  }
}
