// Define the interface
export interface IContact {
  id?: number | null;
  address?: string | null;
  email?: string | null;
  telephone?: string | null;
  whatsApp?: string | null;
  fax?: string | null;
  gmapUrl?: string | null;
  disclaimer?: string | null;
}

// Implement the interface in the class
export class Contact implements IContact {
  constructor(
    id?: number | null,
    address?: string | null,
    email?: string | null,
    telephone?: string | null,
    whatsApp?: string | null,
    fax?: string | null,
    gmapUrl?: string | null,
    disclaimer?: string | null
  ) {}
}
