import {
  Injectable,
  NotFoundException,
  BadRequestException,
  forwardRef,
  Inject,
} from '@nestjs/common';
import { Track, CreateTrackDto } from './interfaces';
import { v4 as uuid, validate } from 'uuid';
import { FavoritesService } from '../Favorites/favorites.service';

@Injectable()
export class TrackService {
  constructor(
    @Inject(forwardRef(() => FavoritesService))
    private readonly favoritesService: FavoritesService,
  ) {}

  private tracks: Track[] = [];

  async updateArtistReferences(
    artistId: string,
    newArtistId: string | null,
  ): Promise<void> {
    this.tracks = this.tracks.map((track) =>
      track.artistId === artistId ? { ...track, artistId: newArtistId } : track,
    );
  }

  async updateAlbumReferences(
    albumId: string,
    newAlbumId: string | null,
  ): Promise<void> {
    this.tracks = this.tracks.map((track) =>
      track.albumId === albumId ? { ...track, albumId: newAlbumId } : track,
    );
  }

  findAll(): Track[] {
    return this.tracks;
  }

  findOne(id: string): Track {
    const track = this.tracks.find((track) => track.id === id);
    if (!validate(id)) {
      throw new BadRequestException('UUID is not valid');
    }
    if (!track) {
      throw new NotFoundException('Track not found');
    }
    return track;
  }

  create(createTrackDto: CreateTrackDto): Track {
    if (!createTrackDto.name || createTrackDto.duration === undefined) {
      throw new BadRequestException('Name and duration are required');
    }
    const newTrack: Track = {
      id: uuid(),
      ...createTrackDto,
    };
    this.tracks.push(newTrack);
    return newTrack;
  }

  update(id: string, updateTrackDto: CreateTrackDto): Track {
    const index = this.tracks.findIndex((track) => track.id === id);
    if (!validate(id)) {
      throw new BadRequestException('UUID is not valid');
    }
    if (index === -1) {
      throw new NotFoundException('Track not found');
    }
    this.tracks[index] = { ...this.tracks[index], ...updateTrackDto };
    return this.tracks[index];
  }

  async remove(id: string): Promise<void> {
    const index = this.tracks.findIndex((track) => track.id === id);
    if (!validate(id)) {
      throw new BadRequestException('UUID is not valid');
    }
    if (index === -1) {
      throw new NotFoundException('Track not found');
    }

    await this.favoritesService.removeTrackFromFavorites(id);

    this.tracks.splice(index, 1);
  }
}
