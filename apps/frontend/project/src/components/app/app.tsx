import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../common/const';
import IntroPage from '../../pages/intro-page/intro-page';
import SignUpPage from '../../pages/signup-page/signup-page';
import SignInPage from '../../pages/signin-page/signin-page';
import PrivateRoute from '../private-route/private-route';
import MainPage from '../../pages/main-page/main-page';

function App(): JSX.Element {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route path={AppRoute.Intro} element={<IntroPage />} />
          <Route path={AppRoute.SingUp} element={<SignUpPage />} />
          <Route path={AppRoute.SingIn} element={<SignInPage />} />
          <Route
            path={AppRoute.Main}
            element={
              <PrivateRoute authorizationStatus={AuthorizationStatus.Auth}>
                <MainPage />
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}
export default App;
