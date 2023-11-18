import { Route, Routes } from 'react-router-dom';
import IntroPage from './pages/intro.page';
import LoginPage from './pages/login.page';
import { AppRoute } from './const';

export function App() {
  return (
    <Routes>
      <Route path={AppRoute.Main} element={<IntroPage />} />
      <Route path={AppRoute.Login} element={<LoginPage />} />

      <Route path="*" element={<IntroPage />} />
    </Routes>
  );
}

export default App;
