import { PersonalOrderStatus } from '../types/personal-order-status.enum';

export const personalOrderMock = {
  id: 1,
  userId: 2,
  targetId: 1,
  orderStatus: PersonalOrderStatus.Accepted,
  createdAt: new Date('2023-07-15T13:54:05.747Z'),
  updateAt: new Date('2023-07-17T13:54:05.747Z'),
};
