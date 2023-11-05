import { ITokenPayload } from './token-payload.interface';

export interface IUnsubscribe extends ITokenPayload {
  trainerId?: number;
}
