import { useState } from 'react';
import { MAX_POPUP_CERTIFICATES_COUNT_PER_PAGE } from '../../constants';
import CertificateItem from '../certificate-item/certificate-item';
import {
  ArrowLeft,
  ArrowRight,
  IconCross,
  IconCrown,
} from '../../helper/svg-const';

type PopupTrainerCertificatesProps = {
  certificates: string[];
  setPopupOpened: (prevState: boolean) => void;
};

function PopupTrainerCertificates({
  certificates,
  setPopupOpened,
}: PopupTrainerCertificatesProps): JSX.Element {
  const [certificatesPage, setCertificatesPage] = useState(1);

  const handleLeftArrowButtonClick = () => {
    setCertificatesPage((prevState) =>
      prevState > 1 ? prevState - 1 : prevState,
    );
  };

  const handleRightArrowButtonClick = () => {
    const pagesCount = Math.ceil(
      certificates.length / MAX_POPUP_CERTIFICATES_COUNT_PER_PAGE,
    );
    setCertificatesPage((prevState) =>
      prevState < pagesCount ? prevState + 1 : prevState,
    );
  };

  return (
    <main>
      <div className="popup-form">
        <section className="popup">
          <h2 className="visually-hidden">Слайдер с сертификатами.</h2>
          <div className="popup__wrapper">
            <div className="popup-head">
              <h2 className="popup-head__header">Сертификаты</h2>
              <button
                onClick={() => setPopupOpened(false)}
                className="btn-icon btn-icon--outlined btn-icon--big"
                type="button"
                aria-label="close"
              >
                <svg width="20" height="20" aria-hidden="true">
                  <IconCross />
                </svg>
              </button>
            </div>
            <div className="popup__content popup__content--certificates">
              <div className="popup__slider-buttons">
                <button
                  onClick={handleLeftArrowButtonClick}
                  className="btn-icon popup__slider-btn popup__slider-btn--prev"
                  type="button"
                  aria-label="prev"
                >
                  <svg width="16" height="14" aria-hidden="true">
                    <ArrowLeft />
                  </svg>
                </button>
                <button
                  onClick={handleRightArrowButtonClick}
                  className="btn-icon popup__slider-btn popup__slider-btn--next"
                  type="button"
                  aria-label="next"
                >
                  <svg width="16" height="14" aria-hidden="true">
                    <ArrowRight />
                  </svg>
                </button>
              </div>
              <ul className="popup__slider-list">
                {certificates
                  .slice(
                    (certificatesPage - 1) *
                      MAX_POPUP_CERTIFICATES_COUNT_PER_PAGE,
                    (certificatesPage - 1) *
                      MAX_POPUP_CERTIFICATES_COUNT_PER_PAGE +
                      MAX_POPUP_CERTIFICATES_COUNT_PER_PAGE,
                  )
                  .map((certificateItem) => (
                    <li
                      key={certificateItem}
                      className="popup__slide popup__slide--current"
                    >
                      <div className="popup__slide-img">
                        <CertificateItem certificateItem={certificateItem} />
                      </div>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

export default PopupTrainerCertificates;
