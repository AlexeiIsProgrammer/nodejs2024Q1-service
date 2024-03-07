// favorites.service.ts
import {
  Injectable,
  NotFoundException,
  BadRequestException,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { Artist } from '../Artists/interfaces';
import { Album } from '../Albums/interfaces';
import { Track } from '../Tracks/interfaces';
import { validate } from 'uuid';

@Injectable()
export class FavoritesService {
  private favorites: { artists: Artist[]; albums: Album[]; tracks: Track[] } = {
    artists: [],
    albums: [],
    tracks: [],
  };

  findAll() {
    return this.favorites;
  }

  addToFavoritesTrack(id: string) {
    const track = this.favorites.tracks.find((track) => track.id === id);
    if (!validate(id)) {
      throw new BadRequestException('UUID is not valid');
    }
    if (!track) {
      throw new NotFoundException('Track not found');
    }
    if (this.favorites.tracks.find((favTrack) => favTrack.id === id)) {
      throw new HttpException(
        'Track is already in favorites',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    this.favorites.tracks.push(track);
  }

  removeFromFavoritesTrack(id: string) {
    const trackId = this.favorites.tracks.findIndex((track) => track.id === id);
    if (!validate(id)) {
      throw new BadRequestException('UUID is not valid');
    }
    if (trackId === -1) {
      throw new NotFoundException('Track not found in favorites');
    }
    this.favorites.tracks.splice(trackId, 1);
  }

  addToFavoritesAlbum(id: string) {
    const album = this.favorites.albums.find((album) => album.id === id);
    if (!validate(id)) {
      throw new BadRequestException('UUID is not valid');
    }
    if (!album) {
      throw new NotFoundException('Album not found');
    }
    if (this.favorites.albums.find((favAlbum) => favAlbum.id === id)) {
      throw new HttpException(
        'Album is already in favorites',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    this.favorites.albums.push(album);
  }

  removeFromFavoritesAlbum(id: string) {
    const albumId = this.favorites.albums.findIndex((album) => album.id === id);
    if (!validate(id)) {
      throw new BadRequestException('UUID is not valid');
    }
    if (albumId === -1) {
      throw new NotFoundException('Album not found in favorites');
    }
    this.favorites.albums.splice(albumId, 1);
  }

  addToFavoritesArtist(id: string) {
    const artist = this.favorites.artists.find((artist) => artist.id === id);
    if (!validate(id)) {
      throw new BadRequestException('UUID is not valid');
    }
    if (!artist) {
      throw new NotFoundException('Artist not found');
    }
    if (this.favorites.artists.find((favArtist) => favArtist.id === id)) {
      throw new HttpException(
        'Artist is already in favorites',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    this.favorites.artists.push(artist);
  }

  removeFromFavoritesArtist(id: string) {
    const artistId = this.favorites.artists.findIndex(
      (artist) => artist.id === id,
    );
    if (!validate(id)) {
      throw new BadRequestException('UUID is not valid');
    }
    if (artistId === -1) {
      throw new NotFoundException('Artist not found in favorites');
    }
    this.favorites.artists.splice(artistId, 1);
  }
}
