import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
  forwardRef,
} from '@nestjs/common';
import { v4 as uuidv4, validate } from 'uuid';
import { Album, CreateAlbumDto } from './interfaces';
import { TrackService } from '../Tracks/track.service';
import { FavoritesService } from '../Favorites/favorites.service';

@Injectable()
export class AlbumService {
  constructor(
    @Inject(forwardRef(() => TrackService))
    private readonly trackService: TrackService,
    @Inject(forwardRef(() => FavoritesService))
    private readonly favoritesService: FavoritesService,
  ) {}

  private albums: Album[] = [];

  async updateArtistReferences(
    artistId: string,
    newArtistId: string | null,
  ): Promise<void> {
    this.albums = this.albums.map((album) =>
      album.artistId === artistId ? { ...album, artistId: newArtistId } : album,
    );
  }

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

  async remove(id: string): Promise<void> {
    const albumInd = this.albums.findIndex((album) => album.id === id);
    if (!validate(id)) {
      throw new BadRequestException('UUID is not valid');
    }
    if (albumInd === -1) {
      throw new NotFoundException('Album not found');
    }

    await this.favoritesService.removeAlbumFromFavorites(id);

    await this.trackService.updateAlbumReferences(id, null);

    this.albums.splice(albumInd, 1);
  }
}
