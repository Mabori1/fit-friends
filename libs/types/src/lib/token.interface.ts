export interface IToken {
  id?: number;
  token: string;
  createdAt: Date;
  userId: number;
  exp: Date;
}
