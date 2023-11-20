import ForYouCard from '../for-you-card/for-you-card';
import { ArrowLeft, ArrowRight } from '../../helper/svg-const';

function ForYou() {
  return (
    <section className="special-for-you">
      <div className="container">
        <div className="special-for-you__wrapper">
          <div className="special-for-you__title-wrapper">
            <h2 className="special-for-you__title">
              Специально подобрано для вас
            </h2>
            <div className="special-for-you__controls">
              <button
                className="btn-icon special-for-you__control"
                type="button"
                aria-label="previous"
              >
                <svg width="16" height="14" aria-hidden="true">
                  <ArrowLeft />
                </svg>
              </button>
              <button
                className="btn-icon special-for-you__control"
                type="button"
                aria-label="next"
              >
                <svg width="16" height="14" aria-hidden="true">
                  <ArrowRight />
                </svg>
              </button>
            </div>
          </div>
          <ul className="special-for-you__list">
            <ForYouCard />
            <ForYouCard />
            <ForYouCard />
          </ul>
        </div>
      </div>
    </section>
  );
}

export default ForYou;
