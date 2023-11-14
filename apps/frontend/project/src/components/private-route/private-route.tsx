import {Navigate} from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../common/const';

type PrivateRouteProps = {
  authorizationStatus: AuthorizationStatus;
  children: JSX.Element;
}

function PrivateRoute(props: PrivateRouteProps): JSX.Element {
  const {authorizationStatus, children} = props;

  return (
    authorizationStatus === AuthorizationStatus.Auth
      ? children
      : <Navigate to={AppRoute.SingIn}/>
  );
}

export default PrivateRoute;
