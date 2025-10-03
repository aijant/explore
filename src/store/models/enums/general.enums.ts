export enum Roles {
  ADMIN = 'admin',
  OPERATOR = 'operator',
  USER = 'user',
  SUPER_ADMIN = 'superAdmin'
}

export enum Status {
  FINISHED = 'Finished',
  IN_PROCESS = 'InProcess',
  FOR_INFO = 'ForInformation'
}

export enum DocumentType {
  ACCIDENT_PHOTO = "Accident Photo",
  BILL_OF_LADING = "Bill of Lading",
  SCALE_TICKET = "Scale Ticket",
  OTHER = "Other",
}

export enum FuelType {
  Diesel = "Diesel",
  Gasoline = "Gasoline",
  Propane = "Propane",
  Liquid_Natural_Gas = "Liquid_Natural_Gas",
  Compressed_Natural_Gas = "Compressed_Natural_Gas",
  Ethanol = "Ethanol",
  Methanol = "Methanol",
  E_85 = "E_85",
  M_85 = "M_85",
  A55 = "A55",
  Biodiesel = "Biodiesel",
  Other = "Other",
}

export enum DocumentName {
  PHYSICAL_DAMAGE = "PhysicalDamage",
  REGISTRATION = "Registration",
  ANNUAL_DOT = "AnnualDOT",
  CUSTOM_NAME = "CustomName",
}

export enum UsState {
  AL = "AL",
  AK = "AK",
  AZ = "AZ",
  AR = "AR",
  CA = "CA",
  CO = "CO",
  CT = "CT",
  DE = "DE",
  FL = "FL",
  GA = "GA",
  HI = "HI",
  ID = "ID",
  IL = "IL",
  IN = "IN",
  IA = "IA",
  KS = "KS",
  KY = "KY",
  LA = "LA",
  ME = "ME",
  MD = "MD",
  MA = "MA",
  MI = "MI",
  MN = "MN",
  MS = "MS",
  MO = "MO",
  MT = "MT",
  NE = "NE",
  NV = "NV",
  NH = "NH",
  NJ = "NJ",
  NM = "NM",
  NY = "NY",
  NC = "NC",
  ND = "ND",
  OH = "OH",
  OK = "OK",
  OR = "OR",
  PA = "PA",
  RI = "RI",
  SC = "SC",
  SD = "SD",
  TN = "TN",
  TX = "TX",
  UT = "UT",
  VT = "VT",
  VA = "VA",
  WA = "WA",
  WV = "WV",
  WI = "WI",
  WY = "WY",
  DC = "DC",
}

// trailer enums

export enum Ownership {
  Company = "Company",
  Contractors = "Contractors",
  Leased = "Leased",
}

export enum Suspension {
  AirRide = "Air_Ride",
  SpringRide = "Spring_Ride",
}

export enum TrailerDocumentName {
  AnnualDOT = "AnnualDOT",
  CustomName = "CustomName",
}

export enum TrailerType {
  Conestoga = "Conestoga",
  DryVan = "DryVan",
  Flatbed = "Flatbed",
  PO = "PO",
  Reefer = "Reefer",
}

