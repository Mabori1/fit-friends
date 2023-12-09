import Header from '../../components/header/header';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import {
  AppRoute,
  MAX_USERS_CATALOG_ITEMS_COUNT_PER_PAGE,
} from '../../constants';
import { getUserId, getUsers } from '../../redux/userSlice/selectors';
import { useAppSelector } from '../../redux/store';
import UsersCatalogFilter from '../../components/user-catalog-filter/user-catalog-filter';
import UsersCatalogItem from '../../components/user-catalog-item/user-catalog-item';

function UsersCatalog(): JSX.Element {
  const navigate = useNavigate();

  const usersCatalog = useAppSelector(getUsers);
  const myId = useAppSelector(getUserId);

  const [currentListPage, setCurrentListPage] = useState(1);
  const pagesCount = Math.ceil(
    usersCatalog.length / MAX_USERS_CATALOG_ITEMS_COUNT_PER_PAGE,
  );

  const handleShowMoreButtonClick = () => {
    setCurrentListPage((prevState) =>
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
              <h1 className="visually-hidden">Каталог пользователей</h1>
              <div className="user-catalog-form">
                <h2 className="visually-hidden">Каталог пользователя</h2>
                <div className="user-catalog-form__wrapper">
                  <button
                    onClick={() => navigate(AppRoute.Main)}
                    className="btn-flat btn-flat--underlined user-catalog-form__btnback"
                    type="button"
                  >
                    <svg width="14" height="10" aria-hidden="true">
                      <use xlinkHref="#arrow-left"></use>
                    </svg>
                    <span>Назад</span>
                  </button>
                  <h3 className="user-catalog-form__title">Фильтры</h3>
                  <UsersCatalogFilter />
                </div>
              </div>
              <div className="inner-page__content">
                <div className="users-catalog">
                  <ul className="users-catalog__list">
                    {usersCatalog
                      .filter((user) => user.userId !== myId)
                      .map((user) => (
                        <UsersCatalogItem key={user.userId} user={user} />
                      ))}
                  </ul>
                  <div className="show-more users-catalog__show-more">
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
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default UsersCatalog;
