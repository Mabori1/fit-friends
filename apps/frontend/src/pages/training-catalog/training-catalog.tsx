import { useNavigate } from 'react-router-dom';
import Header from '../../components/header/header';
import { AppRoute, MAX_TRAININGS_COUNT_PER_PAGE } from '../../constants';
import { useState } from 'react';
import TrainingThumbnail from '../../components/training-thumbnail/training-thumbnail';
import { useAppSelector } from '../../redux/store';
import { getTrainingCatalog } from '../../redux/trainingSlice/selectors';
import TrainingsFilter from '../../components/trainings-filter/trainings-filter';

function TrainingCatalog(): JSX.Element {
  const navigate = useNavigate();

  const trainingCatalog = useAppSelector(getTrainingCatalog);

  const [trainingsPage, setTrainingsPage] = useState(1);
  const pagesCount = Math.ceil(
    trainingCatalog.length / MAX_TRAININGS_COUNT_PER_PAGE,
  );

  const handleShowMoreButtonClick = () => {
    setTrainingsPage((prevState) =>
      prevState < pagesCount ? prevState + 1 : prevState,
    );
  };

  const handleReturnToTopButtonClick = () => {
    window.scrollTo(0, 0);
  };

  return (
    <>
      <Header />
      <main>
        <section className="inner-page">
          <div className="container">
            <div className="inner-page__wrapper">
              <h1 className="visually-hidden">Каталог тренировок</h1>
              <div className="gym-catalog-form">
                <h2 className="visually-hidden">Мои тренировки Фильтр</h2>
                <div className="gym-catalog-form__wrapper">
                  <button
                    onClick={() => navigate(AppRoute.Main)}
                    className="btn-flat btn-flat--underlined gym-catalog-form__btnback"
                    type="button"
                  >
                    <svg width="14" height="10" aria-hidden="true">
                      <use xlinkHref="#arrow-left"></use>
                    </svg>
                    <span>Назад</span>
                  </button>
                  <h3 className="gym-catalog-form__title">Фильтры</h3>
                  <TrainingsFilter />
                </div>
              </div>
              <div className="training-catalog">
                <ul className="training-catalog__list">
                  {trainingCatalog
                    .slice(0, trainingsPage * MAX_TRAININGS_COUNT_PER_PAGE)
                    .map((training) => (
                      <li key={training.id} className="training-catalog__item">
                        <TrainingThumbnail training={training} />
                      </li>
                    ))}
                </ul>
                <div className="show-more training-catalog__show-more">
                  {trainingsPage >= pagesCount ? (
                    <button
                      onClick={handleReturnToTopButtonClick}
                      className={`btn show-more__button ${
                        pagesCount <= 1 ? 'visually-hidden' : ''
                      }`}
                      type="button"
                    >
                      Вернуться в начало
                    </button>
                  ) : (
                    <button
                      onClick={handleShowMoreButtonClick}
                      className="btn show-more__button show-more__button--more"
                      type="button"
                    >
                      Показать еще
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default TrainingCatalog;
