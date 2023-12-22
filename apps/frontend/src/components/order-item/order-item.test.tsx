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
import { trainerOrderMock } from '../../mocks/trainer-order.mock';
import OrderItem from './order-item';

describe('Component: OrderItem', () => {
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
    const order = trainerOrderMock;

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <OrderItem order={order} />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByTestId('trainer-order-item')).toBeInTheDocument();
  });
});
