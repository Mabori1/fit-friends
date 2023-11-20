import { useNavigate } from 'react-router-dom';
import HeaderNav from '../header-nav/header-nav';
import HeaderSearch from '../header-search/header-search';
import { Logo } from '../../helper/svg-const';
import { AppRoute } from '../../const';

function Header(): JSX.Element {
  const navigate = useNavigate();
  return (
    <header className="header">
      <div className="container">
        <div className="header__logo" onClick={() => navigate(AppRoute.Intro)}>
          <Logo />
        </div>
        <HeaderNav />
        <HeaderSearch />
      </div>
    </header>
  );
}
export default Header;
