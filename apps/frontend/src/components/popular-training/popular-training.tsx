import { ArrowLeft, ArrowRight } from '../../helper/svg-const';
import PopularTrainingCard from '../popular-training-card/popular-training-card';

function PopularTraining() {
  return (
    <section className="popular-trainings">
      <div className="container">
        <div className="popular-trainings__wrapper">
          <div className="popular-trainings__title-wrapper">
            <h2 className="popular-trainings__title">Популярные тренировки</h2>
            <button
              className="btn-flat popular-trainings__button"
              type="button"
            >
              <span>Смотреть все</span>
              <svg width="14" height="10" aria-hidden="true">
                <ArrowRight />
              </svg>
            </button>
            <div className="popular-trainings__controls">
              <button
                className="btn-icon popular-trainings__control"
                type="button"
                aria-label="previous"
              >
                <svg width="16" height="14" aria-hidden="true">
                  <ArrowLeft />
                </svg>
              </button>
              <button
                className="btn-icon popular-trainings__control"
                type="button"
                aria-label="next"
              >
                <svg width="16" height="14" aria-hidden="true">
                  <ArrowRight />
                </svg>
              </button>
            </div>
          </div>
          <ul className="popular-trainings__list">
            <PopularTrainingCard />
            <PopularTrainingCard />
            <PopularTrainingCard />
            <PopularTrainingCard />
          </ul>
        </div>
      </div>
    </section>
  );
}

export default PopularTraining;
