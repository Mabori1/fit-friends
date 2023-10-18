import { ITokenPayload } from './token-payload.interface';

export interface RequestWithTokenPayload {
  user?: ITokenPayload;
}
