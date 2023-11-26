import { Link, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { AppRoute } from '../../const';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { getNotificationDate } from '../../helper/utils';
import { getNotify } from '../../redux/userSlice/selectors';
import {
  deleteNotifyAction,
  fetchNotifyAction,
} from '../../redux/userSlice/apiUserActions';
import HeaderSearch from '../header-search/header-search';
import {
  IconFriends,
  IconHome,
  IconNotification,
  IconUser,
  Logo,
} from '../../helper/svg-const';

function Header(): JSX.Element {
  const dispatch = useAppDispatch();

  const location = useLocation();
  const pathName = location.pathname;

  const notify = useAppSelector(getNotify);

  const handleNotificationClick = (notificationId: number) => {
    dispatch(deleteNotifyAction(notificationId));
    dispatch(fetchNotifyAction());
  };

  useEffect(() => {
    dispatch(fetchNotifyAction());
  }, [dispatch]);

  return (
    <header className="header" data-testid="header">
      <div className="container">
        <span className="header__logo">
          <svg width="187" height="70" aria-hidden="true">
            <Logo />
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
                  <IconHome />
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
                  <IconUser />
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
                  <IconFriends />
                </svg>
              </Link>
            </li>
            <li
              className={`main-nav__item main-nav__item--notifications ${
                notify?.length ? 'is-notifications' : ''
              } `}
            >
              <Link className="main-nav__link" to="#" aria-label="Уведомления">
                <svg width="14" height="18" aria-hidden="true">
                  <IconNotification />
                </svg>
              </Link>
              <div className="main-nav__dropdown">
                {notify?.length ? (
                  <p className="main-nav__label">Оповещений нет</p>
                ) : (
                  <p className="main-nav__label">Оповещения</p>
                )}
                <ul className="main-nav__sublist">
                  {notify?.map((notify) => (
                    <li key={notify.id} className="main-nav__subitem">
                      <Link
                        onClick={() => handleNotificationClick(notify.id)}
                        className="notification is-active"
                        to="#"
                      >
                        <p className="notification__text">{notify.text}</p>
                        <time
                          className="notification__time"
                          dateTime="2023-12-23 12:35"
                        >
                          {getNotificationDate(notify.createdAt.toString())}
                        </time>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          </ul>
        </nav>
        <HeaderSearch />
      </div>
    </header>
  );
}

export default Header;
