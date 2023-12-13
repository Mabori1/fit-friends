import * as ReactDOM from 'react-dom/client';
import { StrictMode } from 'react';
import App from './app';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { checkUserAction } from './redux/userSlice/apiUserActions';
import { getToken } from './services/tokens';
import HistoryRouter from './components/history-route/history-route';
import browserHistory from './browser-history';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

const token = getToken();
if (token) {
  store.dispatch(checkUserAction());
}

root.render(
  <StrictMode>
    <Provider store={store}>
      <HistoryRouter history={browserHistory}>
        <App />
        <ToastContainer limit={3} />
      </HistoryRouter>
    </Provider>
  </StrictMode>,
);
