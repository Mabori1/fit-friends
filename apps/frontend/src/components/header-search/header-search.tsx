import { Link } from 'react-router-dom';

function HeaderSearch(): JSX.Element {
  return (
    <div className="search" data-testid="header-search">
      <form action="#" method="get">
        <label>
          <span className="search__label">Поиск</span>
          <input type="search" name="search"></input>
          <svg
            className="search__icon"
            width="20"
            height="20"
            aria-hidden="true"
          >
            <svg
              id="icon-search"
              width="187"
              height="70"
              viewBox="0 0 187 70"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19 19L17.2 17.2M18.1 9.55C18.1 14.272 14.272 18.1 9.55 18.1C4.82797 18.1 1 14.272 1 9.55C1 4.82797 4.82797 1 9.55 1C14.272 1 18.1 4.82797 18.1 9.55Z"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </svg>
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
              Фитнес
            </Link>
          </li>
          <li className="search__item">
            <Link className="search__link" to="#">
              Стрейчинг
            </Link>
          </li>
          <li className="search__item">
            <Link className="search__link" to="#">
              Йога
            </Link>
          </li>
        </ul>
      </form>
    </div>
  );
}
export default HeaderSearch;
