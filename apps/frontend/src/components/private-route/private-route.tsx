import { Navigate } from 'react-router-dom';
import { AppRoute } from '../../const';

type PrivateRouteProps = {
  isAuth: boolean;
  children: JSX.Element;
};

function PrivateRoute(props: PrivateRouteProps): JSX.Element {
  const { isAuth, children } = props;

  return isAuth ? children : <Navigate to={AppRoute.Intro} />;
}

export default PrivateRoute;
