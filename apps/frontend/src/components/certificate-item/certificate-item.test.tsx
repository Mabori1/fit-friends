import '@testing-library/jest-dom';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import {it, describe, expect} from 'vitest';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import CertificateItem from './certificate-item';
import { State, api } from '../../redux/store';
import { AppRoute } from '../../constants';
import HistoryRouter from '../history-router/history-router';

describe('Component: CertificateItem', () => {
  const history = createMemoryHistory();
  const middlewares = [thunk.withExtraArgument(api)];

  const mockStore = configureMockStore<
    State,
    Action,
    ThunkDispatch<State, typeof api, Action>
  >(middlewares);
  it('should render correctly', () => {
    history.push(AppRoute.Main);
    const store = mockStore({});

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <CertificateItem certificateItem={''} />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByTestId('certificate-item')).toBeInTheDocument();
  });
});
