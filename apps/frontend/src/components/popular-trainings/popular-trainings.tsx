import { useNavigate } from 'react-router-dom';
import {
  AppRoute,
  MAX_SLIDER_POPULAR_TRAININGS_PER_PAGE,
  SortDirection,
} from '../../constants';
import { useEffect, useState } from 'react';
import TrainingThumbnail from '../training-thumbnail/training-thumbnail';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { getTrainingCatalog } from '../../redux/trainingSlice/selectors';
import { fetchTrainingsCatalogAction } from '../../redux/trainingSlice/apiTrainingActions';
import { ArrowLeft, ArrowRight } from '../../helper/svg-const';

function PopularTrainings(): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const popularTrainings = useAppSelector(getTrainingCatalog);

  const [trainingsCurrentPage, setTrainingsCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(
      fetchTrainingsCatalogAction({
        ratingSort: SortDirection.Desc,
      }),
    );
  }, [dispatch]);

  const handleBackArrowButtonClick = () => {
    setTrainingsCurrentPage((prevState) =>
      prevState > 1 ? prevState - 1 : prevState,
    );
  };

  const handleNextArrowButtonClick = () => {
    const currentSliderLength = popularTrainings.slice(
      (trainingsCurrentPage - 1) * MAX_SLIDER_POPULAR_TRAININGS_PER_PAGE,
      trainingsCurrentPage * MAX_SLIDER_POPULAR_TRAININGS_PER_PAGE,
    ).length;
    setTrainingsCurrentPage((prevState) =>
      currentSliderLength < MAX_SLIDER_POPULAR_TRAININGS_PER_PAGE ||
      currentSliderLength === popularTrainings.length
        ? prevState
        : prevState + 1,
    );
  };

  return (
    <section className="popular-trainings">
      <div className="container">
        <div className="popular-trainings__wrapper">
          <div className="popular-trainings__title-wrapper">
            <h2 className="popular-trainings__title">Популярные тренировки</h2>
            <button
              onClick={() => navigate(AppRoute.TrainingCatalog)}
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
                onClick={handleBackArrowButtonClick}
                className="btn-icon popular-trainings__control"
                type="button"
                aria-label="previous"
              >
                <svg width="16" height="14" aria-hidden="true">
                  <ArrowLeft />
                </svg>
              </button>
              <button
                onClick={handleNextArrowButtonClick}
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
            {popularTrainings
              .slice(
                (trainingsCurrentPage - 1) *
                  MAX_SLIDER_POPULAR_TRAININGS_PER_PAGE,
                trainingsCurrentPage * MAX_SLIDER_POPULAR_TRAININGS_PER_PAGE,
              )
              .map((training) => (
                <li key={training.id} className="popular-trainings__item">
                  <TrainingThumbnail training={training} />
                </li>
              ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export default PopularTrainings;
