import { Link } from 'react-router-dom';

function IntroPage(): JSX.Element {
  return (
    <div className="intro">
      <div className="intro__background">
        <picture>
          <source
            type="image/webp"
            srcSet="img/content/sitemap//background.webp, img/content/sitemap//background@2x.webp 2x"
          ></source>
          <img
            src="img/content/sitemap//background.jpg"
            srcSet="img/content/sitemap//background@2x.jpg 2x"
            width="1440"
            height="1024"
            alt="Фон с бегущей девушкой"
          ></img>
        </picture>
      </div>
      <div className="intro__wrapper">
        <svg className="intro__icon" width="60" height="60" aria-hidden="true">
          <svg
            width="60"
            height="60"
            viewBox="0 0 60 60"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 30C16.5667 30 30 43.4333 30 60V30H60C43.4333 30 30 16.5667 30 0C30 16.5667 16.5667 30 0 30Z"
              fill="#181818"
            />
            <path d="M30 60C30 43.4333 16.5667 30 0 30V60H30Z" fill="#C5EC2A" />
            <path
              d="M30 60C46.5667 60 60 46.5667 60 30H30V60Z"
              fill="#C5EC2A"
            />
            <path d="M30 0C30 16.5667 16.5667 30 0 30V0H30Z" fill="#C5EC2A" />
            <path d="M60 30C43.4333 30 30 16.5667 30 0H60V30Z" fill="#C5EC2A" />
          </svg>
        </svg>
        <div className="intro__title-logo">
          <picture>
            <source
              type="image/webp"
              srcSet="img/content/sitemap//title-logo.webp, img/content/sitemap//title-logo@2x.webp 2x"
            ></source>
            <img
              src="img/content/sitemap//title-logo.png"
              srcSet="img/content/sitemap//title-logo@2x.png 2x"
              width="934"
              height="455"
              alt="Логотип Fit Friends"
            ></img>
          </picture>
        </div>
        <div className="intro__buttons">
          <Link className="btn intro__button" type="button" to="/register">
            Регистрация
          </Link>
          <p className="intro__text">
            Есть аккаунт?
            <Link className="intro__link" to="/login">
              Вход
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
export default IntroPage;
