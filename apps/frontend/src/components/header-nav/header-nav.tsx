import { Link, useNavigate } from 'react-router-dom';
import { AppRoute } from '../../const';
import { UserRole } from '@fit-friends/types';
import { getUserRole } from '../../redux/authSlice/selectors';
import { useAppSelector } from '../../redux/store';

function HeaderNav(): JSX.Element {
  const userRole = useAppSelector(getUserRole);
  const navigate = useNavigate();

  return (
    <nav className="main-nav">
      <ul className="main-nav__list">
        <li className="main-nav__item">
          <button
            className="main-nav__link is-active"
            aria-label="На главную"
            onClick={() => {
              navigate(
                userRole === UserRole.Trainer
                  ? AppRoute.TrainerRoom
                  : AppRoute.Main,
              );
            }}
          >
            <svg id="icon-home" viewBox="0 0 18 18" width="18" height="18">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M11.0499 0.709047L16.2288 4.33646C17.2178 5.02953 18 6.5237 18 7.73884V13.8415C18 16.1368 16.1389 18 13.8462 18H4.15385C1.86114 18 0 16.1278 0 13.8325V7.62183C0 6.4877 0.71029 5.04754 1.60939 4.34546L6.11389 0.82606C7.47153 -0.227059 9.63836 -0.281065 11.0499 0.709047ZM9.00001 12.5992C9.99313 12.5992 10.7982 11.7932 10.7982 10.799C10.7982 9.8048 9.99313 8.99882 9.00001 8.99882C8.00689 8.99882 7.20181 9.8048 7.20181 10.799C7.20181 11.7932 8.00689 12.5992 9.00001 12.5992Z"
                fill="currentColor"
              ></path>
            </svg>
          </button>
        </li>
        <li className="main-nav__item">
          <button
            className="main-nav__link "
            aria-label="Личный кабинет"
            onClick={() => {
              navigate(
                userRole === UserRole.Trainer
                  ? `${AppRoute.TrainerRoom}/${AppRoute.Info}`
                  : `${AppRoute.ClientRoom}/${AppRoute.Info}`,
              );
            }}
          >
            <svg
              id="icon-user"
              width="16"
              height="18"
              viewBox="0 0 16 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8 8.78049C10.4303 8.78049 12.4004 6.81491 12.4004 4.39024C12.4004 1.96558 10.4303 0 8 0C5.5697 0 3.59956 1.96558 3.59956 4.39024C3.59956 6.81491 5.5697 8.78049 8 8.78049Z"
                fill="currentColor"
              />
              <path
                d="M8 10.9756C3.59076 10.9756 0 13.9259 0 17.561C0 17.8068 0.193619 18 0.440044 18H15.56C15.8064 18 16 17.8068 16 17.561C16 13.9259 12.4092 10.9756 8 10.9756Z"
                fill="currentColor"
              />
            </svg>
          </button>
        </li>
        <li className="main-nav__item">
          <Link className="main-nav__link" to="#" aria-label="Друзья">
            <svg
              id="icon-friends"
              width="22"
              height="16"
              viewBox="0 0 30 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M22.5 10.2951C24.7784 10.2951 26.6254 8.46058 26.6254 6.19756C26.6254 3.93454 24.7784 2.1 22.5 2.1C20.2216 2.1 18.3746 3.93454 18.3746 6.19756C18.3746 8.46058 20.2216 10.2951 22.5 10.2951Z"
                fill="currentColor"
              />
              <path
                d="M9.64286 10.2439C12.5722 10.2439 14.947 7.95073 14.947 5.12195C14.947 2.29318 12.5722 0 9.64286 0C6.71348 0 4.33876 2.29318 4.33876 5.12195C4.33876 7.95073 6.71348 10.2439 9.64286 10.2439Z"
                fill="currentColor"
              />
              <path
                d="M9.64286 12.8049C9.52291 12.8049 9.40347 12.8066 9.28457 12.8101C4.13499 12.9606 0 16.3425 0 20.4878C0 20.7746 0.23338 21 0.53041 21H18.7553C19.0523 21 19.2857 20.7746 19.2857 20.4878C19.2857 20.307 19.2778 20.1277 19.2624 19.95C19.2313 19.5927 19.1694 19.2422 19.0789 18.9C18.6759 17.3762 17.7048 16.0183 16.3515 14.973C14.6142 13.6312 12.247 12.8049 9.64286 12.8049Z"
                fill="currentColor"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M17.4923 13.9177C18.8214 12.9394 20.5777 12.3439 22.5 12.3439C26.6337 12.3439 30 15.0975 30 18.4902C30 18.7197 29.8185 18.9 29.5875 18.9H21.394C21.1529 16.8579 19.6704 15.0676 17.4923 13.9177ZM19.2624 19.95C19.2313 19.5927 19.1694 19.2422 19.0789 18.9C18.6759 17.3762 17.7048 16.0183 16.3515 14.973C14.6142 13.6312 12.247 12.8049 9.64286 12.8049C9.52291 12.8049 9.40347 12.8066 9.28457 12.8101C5.17731 13.6013 2.14286 16.2931 2.14286 19.489C2.14286 19.7472 2.37624 19.95 2.67327 19.95H19.2624Z"
                fill="currentColor"
              />
            </svg>
          </Link>
        </li>
        <li className="main-nav__item main-nav__item--notifications">
          <Link className="main-nav__link" to="#" aria-label="Уведомления">
            <svg
              id="icon-notification"
              width="14"
              height="18"
              viewBox="0 0 14 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13.6776 11.241L12.7676 9.747C12.5764 9.414 12.4035 8.784 12.4035 8.415V6.138C12.4035 4.023 11.1476 2.196 9.33664 1.341C8.86341 0.513 7.98975 0 6.98869 0C5.99673 0 5.10487 0.531 4.63164 1.368C2.85703 2.241 1.62845 4.05 1.62845 6.138V8.415C1.62845 8.784 1.45554 9.414 1.26443 9.738L0.345272 11.241C-0.0187507 11.844 -0.100656 12.51 0.126858 13.122C0.345272 13.725 0.864005 14.193 1.53745 14.418C3.30296 15.012 5.15947 15.3 7.01599 15.3C8.87251 15.3 10.729 15.012 12.4945 14.427C13.1316 14.22 13.623 13.743 13.8596 13.122C14.0962 12.501 14.0325 11.817 13.6776 11.241Z"
                fill="currentColor"
              />
              <path
                d="M9.57325 16.209C9.19103 17.253 8.18086 18 6.99779 18C6.27884 18 5.569 17.712 5.06847 17.199C4.77725 16.929 4.55884 16.569 4.43143 16.2C4.54974 16.218 4.66804 16.227 4.79545 16.245C5.00476 16.272 5.22318 16.299 5.44159 16.317C5.96032 16.362 6.48816 16.389 7.01599 16.389C7.53472 16.389 8.05346 16.362 8.56309 16.317C8.7542 16.299 8.94531 16.29 9.12732 16.263C9.27293 16.245 9.41854 16.227 9.57325 16.209Z"
                fill="currentColor"
              />
            </svg>
          </Link>
          <div className="main-nav__dropdown">
            <p className="main-nav__label">Оповещения</p>
            <ul className="main-nav__sublist">
              <li className="main-nav__subitem">
                <Link className="notification is-active" to="#">
                  <p className="notification__text">
                    Катерина пригласила вас на&nbsp;тренировку
                  </p>
                  <time
                    className="notification__time"
                    dateTime="2023-12-23 12:35"
                  >
                    23 декабря, 12:35
                  </time>
                </Link>
              </li>
              <li className="main-nav__subitem">
                <Link className="notification is-active" to="#">
                  <p className="notification__text">
                    Никита отклонил приглашение на&nbsp;совместную тренировку
                  </p>
                  <time
                    className="notification__time"
                    dateTime="2023-12-22 09:22"
                  >
                    22 декабря, 09:22
                  </time>
                </Link>
              </li>
              <li className="main-nav__subitem">
                <Link className="notification is-active" to="#">
                  <p className="notification__text">
                    Татьяна добавила вас в&nbsp;друзья
                  </p>
                  <time
                    className="notification__time"
                    dateTime="2023-12-18 18:50"
                  >
                    18 декабря, 18:50
                  </time>
                </Link>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </nav>
  );
}
export default HeaderNav;
