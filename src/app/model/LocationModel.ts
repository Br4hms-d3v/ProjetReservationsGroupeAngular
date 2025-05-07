export interface Locality {
  id: number;
  postalCode: string;
  locality: string;
}

export interface Location {
  id: number;
  slug: string;
  designation: string;
  address: string;
  website: string;
  phone: string;
  locality: Locality;
}
