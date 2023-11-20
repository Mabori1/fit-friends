import { Helmet } from 'react-helmet-async';
import Header from '../../components/header/header';

function TrainerRoomPage() {
  return (
    <>
      <Helmet>
        <title>Комната тренера</title>
      </Helmet>
      <Header />
      <h1>Комната тренера</h1>
    </>
  );
}

export default TrainerRoomPage;
