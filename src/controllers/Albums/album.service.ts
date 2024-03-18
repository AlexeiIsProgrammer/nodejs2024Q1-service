import { Injectable } from '@nestjs/common';
import { Album, CreateAlbumDto } from './interfaces';
import { DbService } from '../db/db.service';

@Injectable()
export class AlbumService {
  constructor(private readonly db: DbService) {}

  async getAll(): Promise<Album[]> {
    return this.db.getAllAlbums();
  }

  async getById(id: string): Promise<Album> {
    return this.db.getAlbumById(id);
  }

  async create(createAlbumDto: CreateAlbumDto): Promise<Album> {
    return this.db.createAlbum(createAlbumDto);
  }

  async update(id: string, updateAlbumDto: CreateAlbumDto): Promise<Album> {
    return this.db.updateAlbum(id, updateAlbumDto);
  }

  async delete(id: string): Promise<Album> {
    return this.db.deleteAlbum(id);
  }
}
