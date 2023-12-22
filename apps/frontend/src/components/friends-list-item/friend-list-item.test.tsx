import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { AppRoute } from '../../constants';
import HistoryRouter from '../history-router/history-router';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { api } from '../../redux/store';
import { State } from '../../redux/store';
import { Action } from 'redux';
import FriendsListItem from './friend-list-item';
import { personalOrderMock } from '../../mocks/personal-order.mock';
import { userMock } from '../../mocks/user.mock';

describe('Component: FriendsListItem', () => {
  const history = createMemoryHistory();
  const middlewares = [thunk.withExtraArgument([api, api])];

  const mockStore = configureMockStore<
    State,
    Action,
    ThunkDispatch<State, typeof api, Action>
  >(middlewares);
  it('should render correctly', () => {
    history.push(AppRoute.Main);
    const store = mockStore({});
    const personalOrder = personalOrderMock;
    const friend = userMock;

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <FriendsListItem
            friend={friend}
            inPersonalOrder={personalOrder}
            outPersonalOrder={personalOrder}
            isTrainer={false}
          />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByTestId('friends-list-item')).toBeInTheDocument();
  });
});
