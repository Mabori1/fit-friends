import { HelmetProvider } from 'react-helmet-async';
import Header from '../../components/header/header';

function TrainerRoomPage() {
  return (
    <>
      <HelmetProvider>
        <title>Комната тренера</title>
      </HelmetProvider>
      <Header />
    </>
  );
}

export default TrainerRoomPage;
