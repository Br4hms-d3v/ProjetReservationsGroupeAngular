export interface ShowByIdModel {
  id: number | null;
  slug: string;
  title: string;
  posterUrl: string;
  duration: number;
  created_in: string;
  bookable: boolean;
  representations: Representation[];
  artists: Artists[];
  reviews: Reviews[];
}

export interface Representation {
  id: number;
  schedule: string;
}

export interface Artists {
  id: number
  lastname: string;
  firstname: string;

}

export interface Reviews {
  id: number;
  review: string;
}
