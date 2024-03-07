import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { v4 as uuidv4, validate } from 'uuid';
import { Album, CreateAlbumDto } from './interfaces';

@Injectable()
export class AlbumService {
  private albums: Album[] = [];

  findAll(): Album[] {
    return this.albums;
  }

  findOne(id: string): Album {
    const album = this.albums.find((album) => album.id === id);
    if (!validate(id)) {
      throw new BadRequestException('UUID is not valid');
    }
    if (!album) {
      throw new NotFoundException('Album not found');
    }
    return album;
  }

  create(createAlbumDto: CreateAlbumDto): Album {
    if (!createAlbumDto.name || !createAlbumDto.year) {
      throw new BadRequestException('Name and year are required');
    }
    const newAlbum: Album = {
      id: uuidv4(),
      ...createAlbumDto,
    };
    this.albums.push(newAlbum);
    return newAlbum;
  }

  update(id: string, updateAlbumDto: CreateAlbumDto): Album {
    const albumInd = this.albums.findIndex((album) => album.id === id);
    if (!validate(id)) {
      throw new BadRequestException('UUID is not valid');
    }
    if (albumInd === -1) {
      throw new NotFoundException('Album not found');
    }
    this.albums[albumInd] = { ...this.albums[albumInd], ...updateAlbumDto };
    return this.albums[albumInd];
  }

  remove(id: string): void {
    const albumInd = this.albums.findIndex((album) => album.id === id);
    if (!validate(id)) {
      throw new BadRequestException('UUID is not valid');
    }
    if (albumInd === -1) {
      throw new NotFoundException('Album not found');
    }
    this.albums.splice(albumInd, 1);
  }
}
