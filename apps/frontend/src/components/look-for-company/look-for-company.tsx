import LookForCompanyCard from '../look-for-company-card/look-for-company-card';
import { ArrowLeft, ArrowRight } from '../../helper/svg-const';

function LookForCompany() {
  return (
    <section className="look-for-company">
      <div className="container">
        <div className="look-for-company__wrapper">
          <div className="look-for-company__title-wrapper">
            <h2 className="look-for-company__title">
              Ищут компанию для тренировки
            </h2>
            <button
              className="btn-flat btn-flat--light look-for-company__button"
              type="button"
            >
              <span>Смотреть все</span>
              <svg width="14" height="10" aria-hidden="true">
                <use xlinkHref="#arrow-right"></use>
              </svg>
            </button>
            <div className="look-for-company__controls">
              <button
                className="btn-icon btn-icon--outlined look-for-company__control"
                type="button"
                aria-label="previous"
              >
                <svg width="16" height="14" aria-hidden="true">
                  <ArrowLeft />
                </svg>
              </button>
              <button
                className="btn-icon btn-icon--outlined look-for-company__control"
                type="button"
                aria-label="next"
              >
                <svg width="16" height="14" aria-hidden="true">
                  <ArrowRight />
                </svg>
              </button>
            </div>
          </div>
          <ul className="look-for-company__list">
            <LookForCompanyCard />
            <LookForCompanyCard />
            <LookForCompanyCard />
            <LookForCompanyCard />
          </ul>
        </div>
      </div>
    </section>
  );
}

export default LookForCompany;
