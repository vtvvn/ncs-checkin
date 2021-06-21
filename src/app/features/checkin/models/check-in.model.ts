export interface CheckIn {
  id: string;
  tokenId: string;
  partyId: string;
  message: string;
  status: string;
  healthDeclarationId: string;
  checkinTime: Date;
  responseTime: Date;
}
