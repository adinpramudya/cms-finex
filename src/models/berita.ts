import { Attachment, IAttachment } from "./attachment";

// Define the interface
export interface IBerita {
  id?: number | null;
  title?: string | null;
  content?: string | null;
  status?: string | null;
  image?: string | null;
  createdAt?: string | null;
  authorId?: number | null;
  attachmentId?: number | null;
  attachment?: IAttachment | null;
  author?: any | null;
}

// Implement the interface in the class
export class Berita implements IBerita {
  constructor(
    id?: number | null,
    title?: string | null,
    content?: string | null,
    status?: string | null,
    image?: string | null,
    createdAt?: string | null,
    authorId?: number | null,
    attachmentId?: number | null,
    author?: any | null,
    attachment?: IAttachment | null
  ) {}
}
