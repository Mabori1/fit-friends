import { Route, Routes } from 'react-router-dom';
import { AppRoute } from './const';
import IntroPage from './pages/intro-page/intro-page';
import LoginPage from './pages/login-page/login-page';
import RegisterPage from './pages/register-page/register-page';
import MainPage from './pages/main-page/main-page';
import TrainerRoomPage from './pages/trainer-room-page/trainer-room-page';
import FromRegisterTrainer from './components/form-register-trainer/form-register-trainer';
import FromRegisterClient from './components/form-register-client/form-register-client';

export function App() {
  return (
    <Routes>
      <Route path={AppRoute.Intro} element={<IntroPage />} />
      <Route path={AppRoute.Login} element={<LoginPage />} />
      <Route path={AppRoute.Register} element={<RegisterPage />} />

      <Route
        path={AppRoute.RegisterTrainer}
        element={<FromRegisterTrainer />}
      />

      <Route path={AppRoute.RegisterClient} element={<FromRegisterClient />} />

      <Route path={AppRoute.TrainerRoom} element={<TrainerRoomPage />} />

      <Route path={AppRoute.Main} element={<MainPage />} />
    </Routes>
  );
}

export default App;
