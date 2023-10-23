export interface IToken {
  id?: number;
  tokenId: string;
  createdAt: Date;
  userId: number;
  exp: Date;
}
