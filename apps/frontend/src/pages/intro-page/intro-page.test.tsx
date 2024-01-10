import '@testing-library/jest-dom';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { it, describe, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { api } from '../../redux/store';
import { State } from '../../redux/store';
import { Action } from 'redux';
import { Provider } from 'react-redux';
import HistoryRouter from '../../components/history-router/history-router';
import IntroPage from './intro-page';
import { AppRoute } from '../../constants';

describe('Component: IntroPage', () => {
  const history = createMemoryHistory();
  const middlewares = [thunk.withExtraArgument(api)];

  const mockStore = configureMockStore<
    State,
    Action,
    ThunkDispatch<State, typeof api, Action>
  >(middlewares);
  it('should render correctly', () => {
    history.push(AppRoute.Intro);
    const store = mockStore({});

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <IntroPage />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText('Регистрация')).toBeInTheDocument();
  });
});
