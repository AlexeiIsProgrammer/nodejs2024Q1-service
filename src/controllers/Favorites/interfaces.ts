import { Album } from '../Albums/interfaces';
import { Artist } from '../Artists/interfaces';
import { Track } from '../Tracks/interfaces';

export interface FavoritesResponse {
  artists: Artist[];
  albums: Album[];
  tracks: Track[];
}
