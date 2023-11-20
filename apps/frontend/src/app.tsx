import { Route, Routes } from 'react-router-dom';
import { AppRoute } from './const';
import IntroPage from './pages/intro-page/intro-page';
import LoginPage from './pages/login-page/login-page';
import { HelmetProvider } from 'react-helmet-async';

export function App() {
  return (
    <HelmetProvider>
      <Routes>
        <Route path={AppRoute.Main} element={<IntroPage />} />
        <Route path={AppRoute.Login} element={<LoginPage />} />

        <Route path="*" element={<IntroPage />} />
      </Routes>
    </HelmetProvider>
  );
}

export default App;
