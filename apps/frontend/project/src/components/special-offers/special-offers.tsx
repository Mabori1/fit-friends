import SpecGym from '../spec-gym/spec-gym';
import SpecialOfferCard from '../special-offer-card/special-offer-card';

function SpecialOffers() {
  return (
    <section className="special-offers">
      <div className="container">
        <div className="special-offers__wrapper">
          <h2 className="visually-hidden">Специальные предложения</h2>
          <ul className="special-offers__list">
            <SpecialOfferCard />
          </ul>
          <SpecGym />
        </div>
      </div>
    </section>
  );
}

export default SpecialOffers;
