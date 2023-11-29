import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from './app';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { checkUserAction } from './redux/userSlice/apiUserActions';
import { getToken } from './services/tokens';

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
      <BrowserRouter>
        <App />
        <ToastContainer limit={3} />
      </BrowserRouter>
    </Provider>
  </StrictMode>,
);
