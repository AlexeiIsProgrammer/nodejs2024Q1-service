export interface Artist {
  id: string; // uuid v4
  name: string;
  grammy: boolean;
}

export interface CreateArtistDto {
  name: string;
  grammy: boolean;
}
