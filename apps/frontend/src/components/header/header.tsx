import { Link, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import {
  deleteNotificationAction,
  fetchNotificationsAction,
} from '../../store/api-actions';
import { getNotifications } from '../../store/user-data/selectors';
import { nanoid } from 'nanoid';
import { AppRoute } from '../../const';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { getNotificationDate } from '../../helper/utils';

function Header(): JSX.Element {
  const dispatch = useAppDispatch();

  const location = useLocation();
  const pathName = location.pathname;

  const notifications = useAppSelector(getNotifications);

  const dispatchDeleteNotification = async (notificationId: string) => {
    await dispatch(deleteNotificationAction(notificationId));
    dispatch(fetchNotificationsAction());
  };

  const handleNotificationClick = (notificationId: string) => {
    dispatchDeleteNotification(notificationId);
  };

  useEffect(() => {
    dispatch(fetchNotificationsAction());
  }, [dispatch]);

  return (
    <header className="header" data-testid="header">
      <div className="container">
        <span className="header__logo">
          <svg width="187" height="70" aria-hidden="true">
            <use xlinkHref="#logo"></use>
          </svg>
        </span>
        <nav className="main-nav">
          <ul className="main-nav__list">
            <li className="main-nav__item">
              <Link
                className={`
                  main-nav__link
                  ${pathName === AppRoute.Main ? 'is-active' : ''}
                `}
                to={AppRoute.Main}
                aria-label="На главную"
              >
                <svg width="18" height="18" aria-hidden="true">
                  <use xlinkHref="#icon-home"></use>
                </svg>
              </Link>
            </li>
            <li className="main-nav__item">
              <Link
                className={`
                main-nav__link
                ${
                  pathName === AppRoute.TrainerRoom ||
                  pathName === AppRoute.ClientRoom
                    ? 'is-active'
                    : ''
                }
              `}
                to={AppRoute.Intro}
                aria-label="Личный кабинет"
              >
                <svg width="16" height="18" aria-hidden="true">
                  <use xlinkHref="#icon-user"></use>
                </svg>
              </Link>
            </li>
            <li className="main-nav__item">
              <Link
                className={`
                main-nav__link
                ${pathName === AppRoute.FriendsList ? 'is-active' : ''}
              `}
                to={AppRoute.FriendsList}
                aria-label="Друзья"
              >
                <svg width="22" height="16" aria-hidden="true">
                  <use xlinkHref="#icon-friends"></use>
                </svg>
              </Link>
            </li>
            <li className="main-nav__item main-nav__item--notifications">
              <Link className="main-nav__link" to="#" aria-label="Уведомления">
                <svg width="14" height="18" aria-hidden="true">
                  <use xlinkHref="#icon-notification"></use>
                </svg>
              </Link>
              <div className="main-nav__dropdown">
                {notifications.length !== 0 ? (
                  <p className="main-nav__label">Оповещения</p>
                ) : (
                  <p className="main-nav__label">Оповещений нет</p>
                )}
                <ul className="main-nav__sublist">
                  {notifications.map((notification) => (
                    <li key={nanoid()} className="main-nav__subitem">
                      <Link
                        onClick={() => handleNotificationClick(notification.id)}
                        className="notification is-active"
                        to="#"
                      >
                        <p className="notification__text">
                          {notification.text}
                        </p>
                        <time
                          className="notification__time"
                          dateTime="2023-12-23 12:35"
                        >
                          {getNotificationDate(notification.createdAt)}
                        </time>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          </ul>
        </nav>
        <div className="search">
          <form action="#" method="get">
            <label>
              <span className="search__label">Поиск</span>
              <input type="search" name="search" />
              <svg
                className="search__icon"
                width="20"
                height="20"
                aria-hidden="true"
              >
                <use xlinkHref="#icon-search"></use>
              </svg>
            </label>
            <ul className="search__list">
              <li className="search__item">
                <Link className="search__link" to="#">
                  Бокс
                </Link>
              </li>
              <li className="search__item">
                <Link className="search__link is-active" to="#">
                  Бег
                </Link>
              </li>
              <li className="search__item">
                <Link className="search__link" to="#">
                  Аэробика
                </Link>
              </li>
              <li className="search__item">
                <Link className="search__link" to="#">
                  Text
                </Link>
              </li>
              <li className="search__item">
                <Link className="search__link" to="#">
                  Text
                </Link>
              </li>
              <li className="search__item">
                <Link className="search__link" to="#">
                  Text
                </Link>
              </li>
              <li className="search__item">
                <Link className="search__link" to="#">
                  Text
                </Link>
              </li>
              <li className="search__item">
                <Link className="search__link" to="#">
                  Text
                </Link>
              </li>
              <li className="search__item">
                <Link className="search__link" to="#">
                  Text
                </Link>
              </li>
              <li className="search__item">
                <Link className="search__link" to="#">
                  Text
                </Link>
              </li>
              <li className="search__item">
                <Link className="search__link" to="#">
                  Text
                </Link>
              </li>
              <li className="search__item">
                <Link className="search__link" to="#">
                  Text
                </Link>
              </li>
              <li className="search__item">
                <Link className="search__link" to="#">
                  Text
                </Link>
              </li>
            </ul>
          </form>
        </div>
      </div>
    </header>
  );
}

export default Header;
