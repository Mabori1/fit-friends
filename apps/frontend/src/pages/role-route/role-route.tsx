import TrainerRoomPage from '../trainer-room-page/trainer-room-page';
import ClientRoomPage from '../client-room-page/client-room-page';

type RoleRouteProps = {
  isTrainer: boolean;
};
export const RoleRoutePage = (isTrainer: RoleRouteProps) => {
  if (isTrainer) {
    return <TrainerRoomPage />;
  } else {
    return <ClientRoomPage />;
  }
};
