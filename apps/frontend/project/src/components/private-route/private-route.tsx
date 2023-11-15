import { Navigate } from 'react-router-dom';
import { AppRoute, AuthStatus } from '../../common/const';

type PrivateRouteProps = {
  authStatus: AuthStatus;
  children: JSX.Element;
};

function PrivateRoute(props: PrivateRouteProps): JSX.Element {
  const { authStatus, children } = props;

  return authStatus === AuthStatus.Auth ? (
    children
  ) : (
    <Navigate to={AppRoute.SingIn} />
  );
}

export default PrivateRoute;
