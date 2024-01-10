import { useNavigate } from 'react-router-dom';
import {
  AppRoute,
  MAX_SLIDER_USERS_COUNT,
  MAX_SLIDER_USERS_COUNT_PER_PAGE,
} from '../../constants';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { fetchUsersCatalogAction } from '../../redux/userSlice/apiUserActions';
import { getUser, getUsers } from '../../redux/userSlice/selectors';
import { ArrowLeft, ArrowRight } from '../../helper/svg-const';
import LookForCompanyItem from '../look-for-company-item/look-for-company-item';

function LookForCompany(): JSX.Element {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const user = useAppSelector(getUser);
  const readyForTrainingUsers = useAppSelector(getUsers);

  const [trainingsCurrentPage, setTrainingsCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(
      fetchUsersCatalogAction({
        typesOfTraining: user?.typesOfTraining.join(','),
        isReady: true,
        limit: MAX_SLIDER_USERS_COUNT,
      }),
    );
  }, [dispatch, trainingsCurrentPage, user?.typesOfTraining]);

  const handleBackArrowButtonClick = () => {
    setTrainingsCurrentPage((prevState) =>
      prevState > 1 ? prevState - 1 : prevState,
    );
  };

  const handleNextArrowButtonClick = () => {
    setTrainingsCurrentPage((prevState) =>
      trainingsCurrentPage <
      MAX_SLIDER_USERS_COUNT / MAX_SLIDER_USERS_COUNT_PER_PAGE
        ? prevState + 1
        : prevState,
    );
  };

  return (
    <section className="look-for-company" data-testid="look-for-company">
      <div className="container">
        <div className="look-for-company__wrapper">
          <div className="look-for-company__title-wrapper">
            <h2 className="look-for-company__title">
              Ищут компанию для тренировки
            </h2>
            <button
              onClick={() => navigate(AppRoute.UsersCatalog)}
              className="btn-flat btn-flat--light look-for-company__button"
              type="button"
            >
              <span>Смотреть все</span>
              <svg width="14" height="10" aria-hidden="true">
                <ArrowRight />
              </svg>
            </button>
            <div className="look-for-company__controls">
              <button
                onClick={handleBackArrowButtonClick}
                className="btn-icon btn-icon--outlined look-for-company__control"
                type="button"
                aria-label="previous"
              >
                <svg width="16" height="14" aria-hidden="true">
                  <ArrowLeft />
                </svg>
              </button>
              <button
                onClick={handleNextArrowButtonClick}
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
            {readyForTrainingUsers
              ?.filter((item) => user?.userId !== item?.userId)
              .slice(
                (trainingsCurrentPage - 1) * MAX_SLIDER_USERS_COUNT_PER_PAGE,
                trainingsCurrentPage * MAX_SLIDER_USERS_COUNT_PER_PAGE,
              )
              .map((user) => (
                <LookForCompanyItem key={user.userId} user={user} />
              ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export default LookForCompany;
