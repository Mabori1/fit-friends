import { ITokenPayload } from './token-payload.interface';

export interface IRequestWithTokenPayload {
  user?: ITokenPayload;
}
