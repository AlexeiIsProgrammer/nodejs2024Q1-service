import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Artist, CreateArtistDto } from './interfaces';
import { v4 as uuid, validate } from 'uuid';

@Injectable()
export class ArtistService {
  private artists: Artist[] = [];

  findAll(): Artist[] {
    return this.artists;
  }

  findOne(id: string): Artist {
    const artist = this.artists.find((artist) => artist.id === id);
    if (!validate(id)) {
      throw new BadRequestException('UUID is not valid');
    }
    if (!artist) {
      throw new NotFoundException('Artist not found');
    }
    return artist;
  }

  create(createArtistDto: CreateArtistDto): Artist {
    if (!createArtistDto.name || !createArtistDto.grammy) {
      throw new BadRequestException('Name and grammy are required');
    }
    const newArtist: Artist = {
      id: uuid(),
      ...createArtistDto,
    };
    this.artists.push(newArtist);
    return newArtist;
  }

  update(id: string, updateArtistDto: CreateArtistDto): Artist {
    const artistInd = this.artists.findIndex((artist) => artist.id === id);
    if (!validate(id)) {
      throw new BadRequestException('UUID is not valid');
    }
    if (artistInd === -1) {
      throw new NotFoundException('Artist not found');
    }
    this.artists[artistInd] = {
      ...this.artists[artistInd],
      ...updateArtistDto,
    };
    return this.artists[artistInd];
  }

  remove(id: string): void {
    const artistInd = this.artists.findIndex((artist) => artist.id === id);
    if (!validate(id)) {
      throw new BadRequestException('UUID is not valid');
    }
    if (artistInd === -1) {
      throw new NotFoundException('Artist not found');
    }
    this.artists.splice(artistInd, 1);
  }
}
