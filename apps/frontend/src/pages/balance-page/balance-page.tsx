import Header from '../../components/header/header';
import { ChangeEvent, useEffect, useState } from 'react';
import TrainingThumbnail from '../../components/training-thumbnail/training-thumbnail';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { getTrainingsBalance } from '../../redux/userSlice/selectors';
import { TypeOfOrder } from '@fit-friends/types';
import { AppRoute, MAX_PURCHASES_ITEMS_COUNT_PER_PAGE } from '../../constants';
import {
  fetchBalanceAction,
  fetchTrainingsBalanceAction,
} from '../../redux/userSlice/apiUserActions';
import { ArrowCheck, ArrowLeft } from '../../helper/svg-const';

function BalancePage(): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const trainings = useAppSelector(getTrainingsBalance);

  const [purchaseType, setPurchaseType] = useState<TypeOfOrder>(
    TypeOfOrder.Subscription,
  );

  const [currentListPage, setCurrentListPage] = useState(1);
  const pagesCount = Math.ceil(
    trainings
      ? trainings.length / MAX_PURCHASES_ITEMS_COUNT_PER_PAGE
      : 1 / MAX_PURCHASES_ITEMS_COUNT_PER_PAGE,
  );

  const handleShowMoreButtonClick = () => {
    setCurrentListPage((prevState) =>
      prevState < pagesCount ? prevState + 1 : prevState,
    );
  };

  const handleReturnToTopButtonClick = () => {
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    dispatch(fetchBalanceAction());
    dispatch(fetchTrainingsBalanceAction());
  }, [dispatch]);

  const handleSortInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const inputName = evt.currentTarget.name;
    switch (inputName) {
      case 'sort-gyms':
        setPurchaseType(TypeOfOrder.Subscription);
        break;
      case 'sort-trainings':
        setPurchaseType(TypeOfOrder.Training);
        break;
    }
  };

  return (
    <>
      <Header />
      <main>
        <section className="my-purchases">
          <div className="container">
            <div className="my-purchases__wrapper">
              <button
                onClick={() => navigate(AppRoute.Intro)}
                className="btn-flat my-purchases__back"
                type="button"
              >
                <svg width="14" height="10" aria-hidden="true">
                  <ArrowLeft />
                </svg>
                <span>Назад</span>
              </button>
              <div className="my-purchases__title-wrapper">
                <h1 className="my-purchases__title">Мои покупки</h1>
                <div className="my-purchases__controls">
                  <div
                    className="custom-toggle custom-toggle--switch custom-toggle--switch-right my-purchases__switch"
                    data-validate-type="checkbox"
                  >
                    <label>
                      <input
                        type="checkbox"
                        value="user-agreement-1"
                        name="user-agreement"
                      />
                      <span className="custom-toggle__icon">
                        <svg width="9" height="6" aria-hidden="true">
                          <ArrowCheck />
                        </svg>
                      </span>
                      <span className="custom-toggle__label">
                        Только активные
                      </span>
                    </label>
                  </div>
                  <div className="btn-radio-sort">
                    <label>
                      <input
                        onChange={handleSortInputChange}
                        type="radio"
                        name="sort-gyms"
                        checked={purchaseType === TypeOfOrder.Subscription}
                      />
                      <span className="btn-radio-sort__label">Абонементы</span>
                    </label>
                    <label>
                      <input
                        onChange={handleSortInputChange}
                        type="radio"
                        name="sort-trainings"
                        checked={purchaseType === TypeOfOrder.Training}
                      />
                      <span className="btn-radio-sort__label">Тренировки</span>
                    </label>
                  </div>
                </div>
              </div>
              <ul className="my-purchases__list">
                {trainings
                  .slice(
                    0,
                    currentListPage * MAX_PURCHASES_ITEMS_COUNT_PER_PAGE,
                  )
                  .map((item) => (
                    <li key={item.id} className="my-purchases__item">
                      <TrainingThumbnail training={item} />
                    </li>
                  ))}
              </ul>
              <div className="show-more my-purchases__show-more">
                {currentListPage >= pagesCount ? (
                  <button
                    onClick={handleReturnToTopButtonClick}
                    className={`btn show-more__button ${
                      pagesCount <= 1 ? 'show-more__button--to-top' : ''
                    }`}
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
        </section>
      </main>
    </>
  );
}

export default BalancePage;
