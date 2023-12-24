// Define the interface
export interface IGaleri {
  id?: number | null;
  cloudinaryId?: string | null;
  url?: string | null;
  caption?: string | null;
  createdAt?: string | null;
  updatedAt?: string | null;
}

// Implement the interface in the class
export class Galeri implements IGaleri {
  constructor(
    id?: number | null,
    cloudinaryId?: string | null,
    url?: string | null,
    caption?: string | null,
    createdAt?: string | null,
    updatedAt?: string | null
  ) {}
}
