import { useNavigate } from 'react-router-dom';
import { AppRoute } from '../../common/const';
import HeaderNav from '../header-nav/header-nav';
import HeaderSearch from '../header-search/header-search';
import { HeaderLogo } from '../svg/svg';

function Header(): JSX.Element {
  const navigate = useNavigate();
  return (
    <header className="header">
      <div className="container">
        <div className="header__logo" onClick={() => navigate(AppRoute.Intro)}>
          <HeaderLogo />
        </div>
        <HeaderNav />
        <HeaderSearch />
      </div>
    </header>
  );
}
export default Header;
