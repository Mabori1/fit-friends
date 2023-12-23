import '@testing-library/jest-dom';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { it, describe, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { AppRoute } from '../../constants';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { api } from '../../redux/store';
import { State } from '../../redux/store';
import { Action } from 'redux';
import { Provider } from 'react-redux';
import HistoryRouter from '../history-router/history-router';
import UsersCatalogItem from './users-catalog-item';
import { userMock } from '../../mocks/user.mock';

describe('Component: UsersCatalogItem', () => {
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
          <UsersCatalogItem user={userMock} />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByTestId('users-catalog-item')).toBeInTheDocument();
  });
});
