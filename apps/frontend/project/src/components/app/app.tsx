import { HelmetProvider } from 'react-helmet-async';
import { Route, Routes } from 'react-router-dom';
import { AppRoute, AuthStatus } from '../../common/const';
import IntroPage from '../../pages/intro-page/intro-page';
import SignUpPage from '../../pages/signup-page/signup-page';
import SignInPage from '../../pages/signin-page/signin-page';
import PrivateRoute from '../private-route/private-route';
import MainPage from '../../pages/main-page/main-page';
import TrainerRoomPage from '../../pages/trainer-room-page/trainer-room-page';
import LoadingPage from '../../pages/loading-page/loading-page';
import { useAppSelector } from '../../hooks';
import HistoryRouter from '../history-route/history-route';
import browserHistory from '../../utils/browser-history';

function App(): JSX.Element {
  return (
    <HelmetProvider>
      <HistoryRouter history={browserHistory}>
        <Routes>
          <Route path={AppRoute.Intro} element={<IntroPage />} />
          <Route path={AppRoute.SingUp} element={<SignUpPage />} />
          <Route path={AppRoute.SingIn} element={<SignInPage />} />
          <Route
            path={AppRoute.Main}
            element={
              <PrivateRoute authStatus={AuthStatus.Auth}>
                <MainPage />
              </PrivateRoute>
            }
          />
        </Routes>
      </HistoryRouter>
    </HelmetProvider>
  );
}
export default App;
