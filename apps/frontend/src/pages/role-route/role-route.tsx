import TrainerRoomPage from '../trainer-room-page/trainer-room-page';
import MainPage from '../main-page/main-page';

type RoleRouteProps = {
  isTrainer: boolean;
};
export const RoleRoutePage = (isTrainer: RoleRouteProps) => {
  return isTrainer ? <TrainerRoomPage /> : <MainPage />;
};
