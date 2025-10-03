export interface Trailer {
  trailerId: string;
  type: string;
  year: number;
  make: string;
  vin: string;
  licensePlateNumber: string;
  ownership: string;
  suspension: string;
  company: string;
  fleetRequestedDistance: number;
  status: boolean;
}

export interface TrailerDocument {
  documentName: string;
  customName?: string;
  expirationDate: string;
  file: File;
}

export interface TrailerFormData extends Trailer {
  documents: TrailerDocument[];
}
