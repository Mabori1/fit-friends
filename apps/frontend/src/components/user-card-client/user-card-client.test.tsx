import '@testing-library/jest-dom';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { AppRoute } from '../../constants';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { api } from '../../redux/store';
import { State } from '../../redux/store';
import { Action } from 'redux';
import { Provider } from 'react-redux';
import HistoryRouter from '../history-router/history-router';
import { userMock } from '../../mocks/user.mock';
import { NameSpace } from '../../constants';
import UserCardClient from './user-card-client';

describe('Component: UserCardClient', () => {
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
        clientFriends: [],
      },
    });
    const user = userMock;

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <UserCardClient client={user} />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByTestId('user-card-client')).toBeInTheDocument();
  });
});
