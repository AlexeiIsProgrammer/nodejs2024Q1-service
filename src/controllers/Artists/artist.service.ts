import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
  forwardRef,
} from '@nestjs/common';
import { Artist, CreateArtistDto } from './interfaces';
import { v4 as uuid, validate } from 'uuid';
import { AlbumService } from '../Albums/album.service';
import { TrackService } from '../Tracks/track.service';
import { FavoritesService } from '../Favorites/favorites.service';

@Injectable()
export class ArtistService {
  constructor(
    @Inject(forwardRef(() => AlbumService))
    private readonly albumService: AlbumService,
    @Inject(forwardRef(() => TrackService))
    private readonly trackService: TrackService,
    @Inject(forwardRef(() => FavoritesService))
    private readonly favoritesService: FavoritesService,
  ) {}

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
    if (!createArtistDto.name || createArtistDto.grammy === undefined) {
      throw new BadRequestException('Name and grammy are required');
    }
    const newArtist: Artist = {
      id: uuid(),
      ...createArtistDto,
    };
    this.artists.push(newArtist);
    return { ...newArtist, id: null };
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

  async remove(id: string): Promise<void> {
    const artistInd = this.artists.findIndex((artist) => artist.id === id);
    if (!validate(id)) {
      throw new BadRequestException('UUID is not valid');
    }
    if (artistInd === -1) {
      throw new NotFoundException('Artist not found');
    }

    await this.favoritesService.removeArtistFromFavorites(id);

    await this.albumService.updateArtistReferences(id, null);

    await this.trackService.updateArtistReferences(id, null);

    this.artists.splice(artistInd, 1);
  }
}
