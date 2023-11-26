import ForYou from '../../components/for-you/for-you';
import Header from '../../components/header/header1';
import LookForCompany from '../../components/look-for-company/look-for-company';
import PopularTraining from '../../components/popular-training/popular-training';
import SpecialOffers from '../../components/special-offers/special-offers';

function MainPage() {
  return (
    <>
      <Header />
      <main>
        <h1 className="visually-hidden">
          FitFriends — Время находить тренировки, спортзалы и друзей спортсменов
        </h1>
        <ForYou />
        <SpecialOffers />
        <PopularTraining />
        <LookForCompany />
      </main>
    </>
  );
}

export default MainPage;
