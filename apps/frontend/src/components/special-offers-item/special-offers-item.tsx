import { DISCOUNT_PERCENTAGE } from '../../constants';
import { TrainingRdo } from '../../types/training.rdo';

type SpecialOffersItemProps = {
  offer: TrainingRdo;
  activeSliderPosition: number;
  setActiveSliderPosition: (state: number) => void;
};

function SpecialOffersItem({
  offer,
  activeSliderPosition,
  setActiveSliderPosition,
}: SpecialOffersItemProps): JSX.Element {
  const newPrice = offer.price
    ? Math.floor((offer.price * (100 - DISCOUNT_PERCENTAGE)) / 100)
    : 0;

  return (
    <aside className="promo-slider" data-testid="special-offers-item">
      <div className="promo-slider__overlay"></div>
      <div className="promo-slider__image">
        <img
          src={offer.backgroundPicture}
          width="1040"
          height="469"
          alt="promo"
        />
      </div>
      <div className="promo-slider__header">
        <h3 className="promo-slider__title">{offer.title}</h3>
        <div className="promo-slider__logo">
          <svg width="74" height="74" aria-hidden="true">
            <use xlinkHref="#logotype"></use>
          </svg>
        </div>
      </div>
      <span className="promo-slider__text">
        {`Горячие предложения на тренировки в дисциплине: "${offer.typeOfTraining}"`}
      </span>
      <div className="promo-slider__bottom-container">
        <div className="promo-slider__slider-dots">
          <button
            onClick={() => setActiveSliderPosition(0)}
            className={`promo-slider__slider-dot ${
              activeSliderPosition === 0
                ? 'promo-slider__slider-dot--active'
                : ''
            }`}
            aria-label="первый слайд"
          ></button>
          <button
            onClick={() => setActiveSliderPosition(1)}
            className={`promo-slider__slider-dot ${
              activeSliderPosition === 1
                ? 'promo-slider__slider-dot--active'
                : ''
            }`}
            aria-label="второй слайд"
          ></button>
          <button
            onClick={() => setActiveSliderPosition(2)}
            className={`promo-slider__slider-dot ${
              activeSliderPosition === 2
                ? 'promo-slider__slider-dot--active'
                : ''
            }`}
            aria-label="третий слайд"
          ></button>
        </div>
        <div className="promo-slider__price-container">
          <p className="promo-slider__price">{`${newPrice} ₽`}</p>
          <p className="promo-slider__sup">за занятие</p>
          <p className="promo-slider__old-price">
            {offer.price ? `${offer.price} ₽` : ''}
          </p>
        </div>
      </div>
    </aside>
  );
}

export default SpecialOffersItem;
