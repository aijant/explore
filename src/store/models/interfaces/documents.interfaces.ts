export interface IDocumentFilter {
  fromDate?: string;
  toDate?: string;
  type?: string;
  vehicle?: string;
}

export interface IDocuments {
  id: string;
  userUuid: string;
  type: string;
  date: string;
  reference: string;
  notes: string;
  fileUrl: any;
}

