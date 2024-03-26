import {
  BadRequestException,
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { v4 as uuidv4, validate } from 'uuid';
import { Album, CreateAlbumDto } from '../Albums/interfaces';
import { Artist, CreateArtistDto } from '../Artists/interfaces';
import { v4 as uuid } from 'uuid';
import { CreateTrackDto, Track } from '../Tracks/interfaces';
import { CreateUserDto, UpdatePasswordDto, User } from '../User/interfaces';
import { PrismaService } from 'src/prisma/prisma.service';
import { FavoritesResponse } from '../Favorites/interfaces';

@Injectable()
export class DbService {
  constructor(private readonly prismaService: PrismaService) {}
  private albums: Album[] = [];

  async getAllAlbums(): Promise<Album[]> {
    return await this.prismaService.albums.findMany();
  }

  async getAlbumById(id: string): Promise<Album> {
    const album = await this.prismaService.albums.findUnique({ where: { id } });
    if (!validate(id)) {
      throw new BadRequestException('UUID is not valid');
    }
    if (!album) {
      throw new NotFoundException('Album not found');
    }
    return album;
  }

  async createAlbum(createAlbumDto: CreateAlbumDto): Promise<Album> {
    if (!createAlbumDto.name || !createAlbumDto.year) {
      throw new BadRequestException('Name and year are required');
    }

    const newAlbum: Album = {
      id: uuidv4(),
      ...createAlbumDto,
    };

    return this.prismaService.albums.create({ data: newAlbum });
  }

  async updateAlbum(
    id: string,
    updateAlbumDto: CreateAlbumDto,
  ): Promise<Album> {
    if (
      typeof updateAlbumDto.name !== 'string' ||
      typeof updateAlbumDto.year !== 'number'
    ) {
      throw new BadRequestException('Types are not good');
    }
    const album = await this.prismaService.albums.findUnique({
      where: { id },
    });
    if (!validate(id)) {
      throw new BadRequestException('UUID is not valid');
    }
    if (!album) {
      throw new NotFoundException('Album not found');
    }

    return this.prismaService.albums.update({
      where: { id },
      data: updateAlbumDto,
    });
  }

  async deleteAlbum(id: string): Promise<Album> {
    const album = await this.prismaService.albums.findUnique({
      where: { id },
    });
    if (!validate(id)) {
      throw new BadRequestException('UUID is not valid');
    }
    if (!album) {
      throw new NotFoundException('Album not found');
    }

    return this.prismaService.albums.delete({ where: { id } });
  }

  private artists: Artist[] = [];

  async getAllArtists(): Promise<Artist[]> {
    return await this.prismaService.artists.findMany();
  }

  async getArtistById(id: string): Promise<Artist> {
    const artist = await this.prismaService.artists.findUnique({
      where: { id },
    });
    if (!validate(id)) {
      throw new BadRequestException('UUID is not valid');
    }
    if (!artist) {
      throw new NotFoundException('Artist not found');
    }
    return artist;
  }

  async createArtist(createArtistDto: CreateArtistDto): Promise<Artist> {
    if (!createArtistDto.name || createArtistDto.grammy === undefined) {
      throw new BadRequestException('Name and grammy are required');
    }

    const newArtist: Artist = {
      id: uuid(),
      ...createArtistDto,
    };

    return this.prismaService.artists.create({ data: newArtist });
  }

  async updateArtist(
    id: string,
    updateArtistDto: CreateArtistDto,
  ): Promise<Artist> {
    const artist = await this.prismaService.artists.findUnique({
      where: { id },
    });
    if (
      typeof updateArtistDto.grammy !== 'boolean' ||
      typeof updateArtistDto.name !== 'string'
    ) {
      throw new BadRequestException('Types are not good');
    }
    if (!validate(id)) {
      throw new BadRequestException('UUID is not valid');
    }
    if (!artist) {
      throw new NotFoundException('Artist not found');
    }

    return this.prismaService.artists.update({
      where: { id },
      data: updateArtistDto,
    });
  }

  async deleteArtist(id: string): Promise<Artist> {
    const artist = await this.prismaService.artists.findUnique({
      where: { id },
    });
    if (!validate(id)) {
      throw new BadRequestException('UUID is not valid');
    }
    if (!artist) {
      throw new NotFoundException('Artist not found');
    }

    return this.prismaService.artists.delete({ where: { id } });
  }

  private tracks: Track[] = [];

  updateAlbumReferencesInTracks(
    albumId: string,
    newAlbumId: string | null,
  ): void {
    this.tracks = this.tracks.map((track) =>
      track.albumId === albumId ? { ...track, albumId: newAlbumId } : track,
    );
  }

  async getAllTracks(): Promise<Track[]> {
    return await this.prismaService.tracks.findMany();
  }

  async getTrackById(id: string): Promise<Track> {
    const track = await this.prismaService.tracks.findUnique({
      where: { id },
    });
    if (!validate(id)) {
      throw new BadRequestException('UUID is not valid');
    }
    if (!track) {
      throw new NotFoundException('Track not found');
    }
    return track;
  }

  async createTrack(createTrackDto: CreateTrackDto): Promise<Track> {
    if (!createTrackDto.name || createTrackDto.duration === undefined) {
      throw new BadRequestException('Name and duration are required');
    }

    const newTrack: Track = {
      id: uuid(),
      ...createTrackDto,
    };

    return this.prismaService.tracks.create({ data: newTrack });
  }

  async updateTrack(
    id: string,
    updateTrackDto: CreateTrackDto,
  ): Promise<Track> {
    if (
      typeof updateTrackDto.duration !== 'number' ||
      typeof updateTrackDto.name !== 'string'
    ) {
      throw new BadRequestException('Types are not good');
    }

    const track = await this.prismaService.tracks.findUnique({
      where: { id },
    });

    if (!validate(id)) {
      throw new BadRequestException('UUID is not valid');
    }

    if (!track) {
      throw new NotFoundException('Track not found');
    }

    return this.prismaService.tracks.update({
      where: { id },
      data: updateTrackDto,
    });
  }

  async deleteTrack(id: string): Promise<Track> {
    const track = await this.prismaService.tracks.findUnique({
      where: { id },
    });
    if (!validate(id)) {
      throw new BadRequestException('UUID is not valid');
    }
    if (!track) {
      throw new NotFoundException('Track not found');
    }
    return this.prismaService.tracks.delete({ where: { id } });
  }

  private readonly users: User[] = [];

  async getAllUsers(): Promise<User[]> {
    return await this.prismaService.users.findMany();
  }

  async getUserById(id: string): Promise<User> {
    const user = await this.prismaService.users.findUnique({
      where: { id },
    });

    if (!validate(id)) {
      throw new BadRequestException('UUID is not valid');
    }
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async createUser(
    createUserDto: CreateUserDto,
  ): Promise<Omit<User, 'password'>> {
    if (!createUserDto.login || !createUserDto.password) {
      throw new BadRequestException('Login and password are required');
    }
    const newUser: User = {
      id: uuid(),
      ...createUserDto,
      version: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const user = await this.prismaService.users.create({
      data: newUser,
    });

    return {
      id: user.id,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      login: user.login,
      version: user.version,
    };
  }

  async updateUser(
    id: string,
    updatePasswordDto: UpdatePasswordDto,
  ): Promise<Omit<User, 'password'>> {
    if (
      typeof updatePasswordDto.newPassword !== 'string' ||
      typeof updatePasswordDto.oldPassword !== 'string'
    ) {
      throw new BadRequestException('Types are not good');
    }

    const user = await this.prismaService.users.findUnique({
      where: { id },
    });

    if (!validate(id)) {
      throw new BadRequestException('UUID is not valid');
    }
    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (user.password !== updatePasswordDto.oldPassword) {
      throw new ForbiddenException('Old password is incorrect');
    }
    user.password = updatePasswordDto.newPassword;
    user.version++;
    user.updatedAt = new Date();

    const updatedUser = {
      id: user.id,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      version: user.version,
      login: user.login,
    };

    const userWithoutPassword = await this.prismaService.users.update({
      where: { id },
      data: updatedUser,
    });

    return {
      id: userWithoutPassword.id,
      createdAt: new Date(),
      updatedAt: new Date(),
      login: userWithoutPassword.login,
      version: userWithoutPassword.version,
    };
  }

  async deleteUser(id: string): Promise<Omit<User, 'password'>> {
    const user = await this.prismaService.users.findUnique({
      where: { id },
    });

    if (!validate(id)) {
      throw new BadRequestException('UUID is not valid');
    }

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return this.prismaService.users.delete({ where: { id } });
  }

  private favoriteId = 1;

  private favorites: { artists: Artist[]; albums: Album[]; tracks: Track[] } = {
    artists: [],
    albums: [],
    tracks: [],
  };

  removeArtistFromFavorites(artistId: string): void {
    this.favorites.artists = this.favorites.artists.filter(
      (artist) => artist.id !== artistId,
    );
  }

  removeAlbumFromFavorites(albumId: string): void {
    this.favorites.albums = this.favorites.albums.filter(
      (album) => album.id !== albumId,
    );
  }

  removeTrackFromFavorites(trackId: string): void {
    this.favorites.tracks = this.favorites.tracks.filter(
      (track) => track.id !== trackId,
    );
  }

  async getAllFavorites(): Promise<FavoritesResponse> {
    const favorites = await this.prismaService.favorites.findUnique({
      where: { id: '1' },
      select: { artists: true, albums: true, tracks: true },
    });

    if (!favorites) {
      return { artists: [], albums: [], tracks: [] };
    }

    return favorites;
  }

  async addToFavoritesTrack(id: string): Promise<Track> {
    if (!validate(id)) {
      throw new BadRequestException('UUID is not valid');
    }

    const track = await this.prismaService.tracks.findUnique({ where: { id } });

    if (!track) {
      throw new HttpException(
        'Track does not exist',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    return await this.prismaService.tracks.update({
      where: { id },
      data: {
        favorites: {
          connectOrCreate: {
            where: { id: this.favoriteId.toString() },
            create: { id: this.favoriteId.toString() },
          },
        },
      },
    });
  }

  async removeFromFavoritesTrack(id: string): Promise<Track> {
    if (!validate(id)) {
      throw new BadRequestException('UUID is not valid');
    }

    const track = await this.prismaService.tracks.findUnique({ where: { id } });

    if (!track) {
      throw new NotFoundException('Track does not exist');
    }

    return await this.prismaService.tracks.update({
      where: { id },
      data: {
        favorites: {
          disconnect: { id: this.favoriteId.toString() },
        },
      },
    });
  }

  async addToFavoritesAlbum(id: string): Promise<Album> {
    if (!validate(id)) {
      throw new BadRequestException('UUID is not valid');
    }

    const album = await this.prismaService.albums.findUnique({ where: { id } });

    if (!album) {
      throw new HttpException(
        'Album does not exist',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    return await this.prismaService.albums.update({
      where: { id },
      data: {
        favorites: {
          connectOrCreate: {
            where: { id: this.favoriteId.toString() },
            create: { id: this.favoriteId.toString() },
          },
        },
      },
    });
  }

  async removeFromFavoritesAlbum(id: string): Promise<Album> {
    if (!validate(id)) {
      throw new BadRequestException('UUID is not valid');
    }

    const album = await this.prismaService.albums.findUnique({ where: { id } });

    if (!album) {
      throw new NotFoundException('Album does not exist');
    }

    return await this.prismaService.albums.update({
      where: { id },
      data: {
        favorites: {
          disconnect: { id: this.favoriteId.toString() },
        },
      },
    });
  }

  async addToFavoritesArtist(id: string): Promise<Artist> {
    if (!validate(id)) {
      throw new BadRequestException('UUID is not valid');
    }

    const artist = await this.prismaService.artists.findUnique({
      where: { id },
    });

    if (!artist) {
      throw new HttpException(
        'Artist does not exist',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    return await this.prismaService.artists.update({
      where: { id },
      data: {
        favorites: {
          connectOrCreate: {
            where: { id: this.favoriteId.toString() },
            create: { id: this.favoriteId.toString() },
          },
        },
      },
    });
  }

  async removeFromFavoritesArtist(id: string): Promise<Artist> {
    if (!validate(id)) {
      throw new BadRequestException('UUID is not valid');
    }

    const artist = await this.prismaService.artists.findUnique({
      where: { id },
    });

    if (!artist) {
      throw new NotFoundException('Artist does not exist');
    }

    return await this.prismaService.artists.update({
      where: { id },
      data: {
        favorites: {
          disconnect: { id: this.favoriteId.toString() },
        },
      },
    });
  }
}
