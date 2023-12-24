// Define the interface
export interface IAttachment {
  id?: number | null;
  cloudinaryId?: string | null;
  url?: string | null;
}

// Implement the interface in the class
export class Attachment implements IAttachment {
  constructor(
    id?: number | null,
    cloudinaryId?: string | null,
    url?: string | null
  ) {}
}
