import '@testing-library/jest-dom';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import { it, describe } from 'vitest';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { AppRoute, NameSpace } from '../../constants';
import HistoryRouter from '../history-router/history-router';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { api } from '../../redux/store';
import { State } from '../../redux/store';
import { Action } from 'redux';
import LookForCompany from './look-for-company';
import { userMock } from '../../mocks/user.mock';

describe('Component: LookForCompany', () => {
  const history = createMemoryHistory();
  const middlewares = [thunk.withExtraArgument(api)];

  const mockStore = configureMockStore<
    State,
    Action,
    ThunkDispatch<State, typeof api, Action>
  >(middlewares);
  it('should render correctly', () => {
    history.push(AppRoute.Main);
    const store = mockStore({
      [NameSpace.UserSlice]: {
        users: [userMock],
      },
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <LookForCompany />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByTestId('look-for-company')).toBeInTheDocument();
  });
});
