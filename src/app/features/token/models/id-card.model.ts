export interface IdCard {
  id: string;
  issuer: string;
  issueFor: string;
  issueForCode: string;
  issueDate: Date;
  fromDate: Date;
  toDate: Date;
  expiresIn: number;
  description: string;
}
