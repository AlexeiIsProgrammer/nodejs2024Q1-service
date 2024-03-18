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

@Injectable()
export class DbService {
  constructor(private readonly prismaService: PrismaService) {}
  private albums: Album[] = [];

  updateArtistReferencesInAlbums(
    artistId: string,
    newArtistId: string | null,
  ): void {
    this.albums = this.albums.map((album) =>
      album.artistId === artistId ? { ...album, artistId: newArtistId } : album,
    );
  }

  async updateArtistReferencesInTracks(
    artistId: string,
    newArtistId: string | null,
  ): void {
    this.tracks = this.tracks.map((track) =>
      track.artistId === artistId ? { ...track, artistId: newArtistId } : track,
    );
  }

  async getAllAlbums(): Promise<Album[]> {
    return await this.prismaService.albums.findMany();
  }

  getAlbumById(id: string): Album {
    const album = this.albums.find((album) => album.id === id);
    if (!validate(id)) {
      throw new BadRequestException('UUID is not valid');
    }
    if (!album) {
      throw new NotFoundException('Album not found');
    }
    return album;
  }

  createAlbum(createAlbumDto: CreateAlbumDto): Album {
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

  updateAlbum(id: string, updateAlbumDto: CreateAlbumDto): Album {
    if (
      typeof updateAlbumDto.name !== 'string' ||
      typeof updateAlbumDto.year !== 'number'
    ) {
      throw new BadRequestException('Types are not good');
    }
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

  deleteAlbum(id: string): void {
    const albumInd = this.albums.findIndex((album) => album.id === id);
    if (!validate(id)) {
      throw new BadRequestException('UUID is not valid');
    }
    if (albumInd === -1) {
      throw new NotFoundException('Album not found');
    }

    this.removeAlbumFromFavorites(id);

    this.updateArtistReferencesInTracks(id, null);

    this.updateAlbumReferencesInTracks(id, null);

    this.albums.splice(albumInd, 1);
  }

  private artists: Artist[] = [];

  getAllArtists(): Artist[] {
    return this.artists;
  }

  getArtistById(id: string): Artist {
    const artist = this.artists.find((artist) => artist.id === id);
    if (!validate(id)) {
      throw new BadRequestException('UUID is not valid');
    }
    if (!artist) {
      throw new NotFoundException('Artist not found');
    }
    return artist;
  }

  createArtist(createArtistDto: CreateArtistDto): Artist {
    if (!createArtistDto.name || createArtistDto.grammy === undefined) {
      throw new BadRequestException('Name and grammy are required');
    }
    const newArtist: Artist = {
      id: uuid(),
      ...createArtistDto,
    };
    this.artists.push(newArtist);
    return { ...newArtist };
  }

  updateArtist(id: string, updateArtistDto: CreateArtistDto): Artist {
    const artistInd = this.artists.findIndex((artist) => artist.id === id);
    if (
      typeof updateArtistDto.grammy !== 'boolean' ||
      typeof updateArtistDto.name !== 'string'
    ) {
      throw new BadRequestException('Types are not good');
    }
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

  deleteArtist(id: string): void {
    const artistInd = this.artists.findIndex((artist) => artist.id === id);
    if (!validate(id)) {
      throw new BadRequestException('UUID is not valid');
    }
    if (artistInd === -1) {
      throw new NotFoundException('Artist not found');
    }

    this.removeArtistFromFavorites(id);

    this.updateArtistReferencesInAlbums(id, null);

    this.updateArtistReferencesInTracks(id, null);

    this.artists.splice(artistInd, 1);
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

  getAllTracks(): Track[] {
    return this.tracks;
  }

  getTrackById(id: string): Track {
    const track = this.tracks.find((track) => track.id === id);
    if (!validate(id)) {
      throw new BadRequestException('UUID is not valid');
    }
    if (!track) {
      throw new NotFoundException('Track not found');
    }
    return track;
  }

  createTrack(createTrackDto: CreateTrackDto): Track {
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

  updateTrack(id: string, updateTrackDto: CreateTrackDto): Track {
    if (
      typeof updateTrackDto.duration !== 'number' ||
      typeof updateTrackDto.name !== 'string'
    ) {
      throw new BadRequestException('Types are not good');
    }
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

  deleteTrack(id: string): void {
    const index = this.tracks.findIndex((track) => track.id === id);
    if (!validate(id)) {
      throw new BadRequestException('UUID is not valid');
    }
    if (index === -1) {
      throw new NotFoundException('Track not found');
    }

    this.removeTrackFromFavorites(id);

    this.tracks.splice(index, 1);
  }

  private readonly users: User[] = [];

  getAllUsers(): User[] {
    return this.users;
  }

  getUserById(id: string): User {
    const user = this.users.find((user) => user.id === id);
    if (!validate(id)) {
      throw new BadRequestException('UUID is not valid');
    }
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  createUser(createUserDto: CreateUserDto): Omit<User, 'password'> {
    if (!createUserDto.login || !createUserDto.password) {
      throw new BadRequestException('Login and password are required');
    }
    const newUser: User = {
      id: uuid(),
      ...createUserDto,
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    this.users.push(newUser);
    return {
      id: newUser.id,
      createdAt: newUser.createdAt,
      updatedAt: newUser.updatedAt,
      version: newUser.version,
      login: newUser.login,
    };
  }

  updateUser(
    id: string,
    updatePasswordDto: UpdatePasswordDto,
  ): Omit<User, 'password'> {
    if (
      typeof updatePasswordDto.newPassword !== 'string' ||
      typeof updatePasswordDto.oldPassword !== 'string'
    ) {
      throw new BadRequestException('Types are not good');
    }

    const user = this.getUserById(id);
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
    user.updatedAt = Date.now();

    return {
      id: user.id,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      version: user.version,
      login: user.login,
    };
  }

  deleteUser(id: string): void {
    const index = this.users.findIndex((user) => user.id === id);
    if (!validate(id)) {
      throw new BadRequestException('UUID is not valid');
    }
    if (index === -1) {
      throw new NotFoundException('User not found');
    }
    this.users.splice(index, 1);
  }

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

  getAllFavorites() {
    return this.favorites;
  }

  addToFavoritesTrack(id: string) {
    const track = this.tracks.find((track) => track.id === id);
    if (!validate(id)) {
      throw new BadRequestException('UUID is not valid');
    }
    if (!track) {
      throw new HttpException(
        'Track does not exist',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
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
    const album = this.albums.find((album) => album.id === id);
    if (!validate(id)) {
      throw new BadRequestException('UUID is not valid');
    }
    if (!album) {
      throw new HttpException(
        'Album does not exist',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
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
    const artist = this.artists.find((artist) => artist.id === id);
    if (!validate(id)) {
      throw new BadRequestException('UUID is not valid');
    }
    if (!artist) {
      throw new HttpException(
        'Artist does not exist',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
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
