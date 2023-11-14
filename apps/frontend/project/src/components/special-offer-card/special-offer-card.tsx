import { LogoType } from '../svg/svg';

function SpecialOfferCard() {
  return (
    <li className="special-offers__item is-active">
      <aside className="promo-slider">
        <div className="promo-slider__overlay"></div>
        <div className="promo-slider__image">
          <img
            src="img/content/promo-2.png"
            srcSet="img/content/promo-2@2x.png 2x"
            width="1040"
            height="469"
            alt="promo-photo"
          />
        </div>
        <div className="promo-slider__header">
          <h3 className="promo-slider__title">Fleksbend</h3>
          <div className="promo-slider__logo">
            <svg width="74" height="74" aria-hidden="true">
              <LogoType />
            </svg>
          </div>
        </div>
        <span className="promo-slider__text">
          Горячие предложения на&nbsp;Тренировки с&nbsp;резинкой для фитнеса
        </span>
        <div className="promo-slider__bottom-container">
          <div className="promo-slider__slider-dots">
            <button
              className="promo-slider__slider-dot"
              aria-label="первый слайд"
            ></button>
            <button
              className="promo-slider__slider-dot--active promo-slider__slider-dot"
              aria-label="второй слайд"
            ></button>
            <button
              className="promo-slider__slider-dot"
              aria-label="третий слайд"
            ></button>
          </div>
          <div className="promo-slider__price-container">
            <p className="promo-slider__price">2400 ₽</p>
            <p className="promo-slider__sup">за занятие</p>
            <p className="promo-slider__old-price">2800 ₽</p>
          </div>
        </div>
      </aside>
    </li>
  );
}

export default SpecialOfferCard;
