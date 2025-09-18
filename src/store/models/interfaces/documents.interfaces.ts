export interface IDocumentFilter {
  fromDate?: string;
  toDate?: string;
  type?: string;
  vehicle?: string;
}

export interface IDocumentsResponse {
  id: string;
  userUuid: string;
  type: string;
  date: string;
  reference: string;
  notes: string;
  fileUrl: string;
}
