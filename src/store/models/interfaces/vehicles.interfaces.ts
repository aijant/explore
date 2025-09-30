export interface VehicleWithDocRequest {
  vehicle: VehicleInfo;
  documents: VehicleDocument[];
}

export interface VehicleInfo {
  vehicleId: string;
  vin: string;
  year: number;
  make: string;
  model: string;
  color: string;
  fuelType: string;
  fleetRequestedDistance: number;
  licenseIssuingState: string;
  licensePlateNumber: string;
  company: string;
  companyOwned: boolean;
  status: boolean;
}

export interface VehicleDocument {
  documentName: string;
  customName?: string;
  expirationDate: string;
  file: File | null;
}
