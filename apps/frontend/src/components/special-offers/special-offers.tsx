import { useState } from 'react';
import { getTrainingCatalog } from '../../redux/trainingSlice/selectors';
import { useAppSelector } from '../../redux/store';
import SpecialOffersItem from '../special-offers-item/special-offers-item';
import { IconLocation } from '../../helper/svg-const';
import { Link } from 'react-router-dom';

function SpecialOffers(): JSX.Element {
  const specialOffers = useAppSelector(getTrainingCatalog).filter(
    (training) => training.isPromo,
  );

  const [activeSliderPosition, setActiveSliderPosition] = useState(0);

  return (
    <section className="special-offers">
      <div className="container">
        <div className="special-offers__wrapper">
          <h2 className="visually-hidden">Специальные предложения</h2>
          <ul className="special-offers__list">
            {specialOffers.map((training, index) => (
              <li
                key={training.id}
                className={`special-offers__item ${
                  index === activeSliderPosition ? 'is-active' : ''
                }`}
              >
                <SpecialOffersItem
                  offer={training}
                  activeSliderPosition={activeSliderPosition}
                  setActiveSliderPosition={setActiveSliderPosition}
                />
              </li>
            ))}
          </ul>

          <div className="thumbnail-spec-gym">
            <div className="thumbnail-spec-gym__image">
              <picture>
                <source
                  type="image/webp"
                  srcSet="img/content/thumbnails/nearest-gym-01.webp, img/content/thumbnails/nearest-gym-01@2x.webp 2x"
                />
                <img
                  src="img/content/thumbnails/nearest-gym-01.jpg"
                  srcSet="img/content/thumbnails/nearest-gym-01@2x.jpg 2x"
                  width="330"
                  height="190"
                  alt=""
                />
              </picture>
            </div>
            <p className="thumbnail-spec-gym__type">Ближайший зал</p>
            <div className="thumbnail-spec-gym__header">
              <h3 className="thumbnail-spec-gym__title">атлетика</h3>
              <div className="thumbnail-spec-gym__location">
                <svg width="14" height="16" aria-hidden="true">
                  <IconLocation />
                </svg>
                <address className="thumbnail-spec-gym__location-address">
                  м. Московская
                </address>
              </div>
            </div>
            <div className="thumbnail-spec-gym__button-wrapper">
              <Link
                className="btn btn--small thumbnail-spec-gym__button"
                to="#"
              >
                Подробнее
              </Link>
              <Link
                className="btn btn--small btn--outlined thumbnail-spec-gym__button"
                to="#"
              >
                Все залы
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SpecialOffers;
