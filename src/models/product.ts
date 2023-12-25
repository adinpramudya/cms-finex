// Define the interface
export interface IProduct {
  id?: number | null;
  name?: string | null;
  desc?: string | null;
  attachmentId?: number | null;
}

// Implement the interface in the class
export class Product implements IProduct {
  constructor(
    id?: number | null,
    name?: string | null,
    desc?: string | null,
    attachmentId?: number | null
  ) {}
}
