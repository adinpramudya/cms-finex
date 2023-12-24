// Define the interface
export interface IBerita {
  id?: number | null;
  title?: string | null;
  content?: string | null;
  status?: string | null;
  image?: string | null;
  createdAt?: string | null;
}

// Implement the interface in the class
export class Berita implements IBerita {
  constructor(
    id?: number | null,
    title?: string | null,
    content?: string | null,
    status?: string | null,
    image?: string | null,
    createdAt?: string | null
  ) {}
}
