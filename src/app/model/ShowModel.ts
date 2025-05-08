import { Location } from './LocationModel';

export interface Show {
  id: number | null;
  slug: string;
  title: string;
  posterUrl: string;
  duration: number;
  created_in: string;
  bookable: boolean;
  location: Location;
}
