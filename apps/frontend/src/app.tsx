import { Navigate, Route, Routes } from 'react-router-dom';
import { AppRoute } from './constants';
import IntroPage from './pages/intro-page/intro-page';
import LoginPage from './pages/login-page/login-page';
import RegisterPage from './pages/register-page/register-page';
import MainPage from './pages/main-page/main-page';
import TrainerRoomPage from './pages/trainer-room-page/trainer-room-page';
import ClientRoomPage from './pages/client-room-page/client-room-page';
import ErrorPage from './pages/error-page/error-page';
import { useAppSelector } from './redux/store';
import {
  getIsAuth,
  getIsTrainer,
  getIsUserLoading,
} from './redux/userSlice/selectors';
import PrivateRoute from './components/private-route/private-route';
import FormRegisterTrainer from './components/form-register-trainer/form-register-trainer';
import FormRegisterClient from './components/form-register-client/form-register-client';
import CreateTrainingPage from './pages/create-training-page/create-training-page';
import TrainerTrainingsPage from './pages/trainer-trainings-page/trainer-trainings-page';
import FriendsListPage from './pages/friends-list-page/fiiends-list-page';
import TrainingCatalog from './pages/training-catalog/training-catalog';
import TrainingCard from './pages/training-card/training-card';
import UserCard from './pages/user-card/user-card';
import UsersCatalog from './pages/user-catalog/user-catalog';
import OrdersPage from './pages/orders-page/orders-page';

export function App() {
  const isLoading = useAppSelector(getIsUserLoading);
  const isAuth = useAppSelector(getIsAuth);
  const isTrainer = useAppSelector(getIsTrainer);

  if (isLoading) {
    // return <LoadingPage />;
  }

  return (
    <Routes>
      <Route
        path={AppRoute.Root}
        element={
          <PrivateRoute isAuth={isAuth}>
            {!isTrainer ? <MainPage /> : <TrainerRoomPage />}
          </PrivateRoute>
        }
      />

      <Route
        path={AppRoute.Intro}
        element={isAuth ? <Navigate to={AppRoute.Root} /> : <IntroPage />}
      />

      <Route path={AppRoute.Register} element={<RegisterPage />} />

      <Route
        path={AppRoute.RegisterTrainer}
        element={
          !isAuth ? <Navigate to={AppRoute.Intro} /> : <FormRegisterTrainer />
        }
      />

      <Route
        path={AppRoute.RegisterClient}
        element={
          !isAuth ? <Navigate to={AppRoute.Intro} /> : <FormRegisterClient />
        }
      />

      <Route
        path={AppRoute.Login}
        element={isAuth ? <Navigate to={AppRoute.Root} /> : <LoginPage />}
      />

      <Route
        path={AppRoute.Main}
        element={
          <PrivateRoute isAuth={isAuth}>
            {!isTrainer ? <MainPage /> : <Navigate to={AppRoute.Root} />}
          </PrivateRoute>
        }
      />

      <Route
        path={AppRoute.TrainerRoom}
        element={
          <PrivateRoute isAuth={isAuth}>
            {isTrainer ? <TrainerRoomPage /> : <Navigate to={AppRoute.Root} />}
          </PrivateRoute>
        }
      />

      <Route
        path={AppRoute.ClientRoom}
        element={
          <PrivateRoute isAuth={isAuth}>
            {!isTrainer ? <ClientRoomPage /> : <Navigate to={AppRoute.Root} />}
          </PrivateRoute>
        }
      />

      <Route
        path={AppRoute.CreateTraining}
        element={
          <PrivateRoute isAuth={isAuth}>
            {isTrainer ? (
              <CreateTrainingPage />
            ) : (
              <Navigate to={AppRoute.Root} />
            )}
          </PrivateRoute>
        }
      />

      <Route
        path={AppRoute.TrainerTrainings}
        element={
          <PrivateRoute isAuth={isAuth}>
            {isTrainer ? (
              <TrainerTrainingsPage />
            ) : (
              <Navigate to={AppRoute.Root} />
            )}
          </PrivateRoute>
        }
      />

      <Route
        path={AppRoute.TrainerOrders}
        element={
          <PrivateRoute isAuth={isAuth}>
            {isTrainer ? <OrdersPage /> : <Navigate to={AppRoute.Root} />}
          </PrivateRoute>
        }
      />

      <Route
        path={AppRoute.Friends}
        element={
          <PrivateRoute isAuth={isAuth}>
            <FriendsListPage />
          </PrivateRoute>
        }
      />
      <Route
        path={AppRoute.TrainingCard}
        element={
          <PrivateRoute isAuth={isAuth}>
            <TrainingCard isTrainer={isTrainer} />
          </PrivateRoute>
        }
      />
      <Route
        path={AppRoute.TrainingCatalog}
        element={
          <PrivateRoute isAuth={isAuth}>
            {!isTrainer ? <TrainingCatalog /> : <Navigate to={AppRoute.Root} />}
          </PrivateRoute>
        }
      />
      <Route
        path={AppRoute.UsersCatalog}
        element={
          <PrivateRoute isAuth={isAuth}>
            {!isTrainer ? <UsersCatalog /> : <Navigate to={AppRoute.Root} />}
          </PrivateRoute>
        }
      />
      <Route
        path={AppRoute.UserCardId}
        element={
          <PrivateRoute isAuth={isAuth}>
            <UserCard />
          </PrivateRoute>
        }
      />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}

export default App;
