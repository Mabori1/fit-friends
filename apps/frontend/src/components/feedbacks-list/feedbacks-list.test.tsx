import '@testing-library/jest-dom';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { AppRoute, NameSpace } from '../../constants';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { api } from '../../redux/store';
import { State } from '../../redux/store';
import { Action } from 'redux';
import { Provider } from 'react-redux';
import HistoryRouter from '../history-router/history-router';
import { trainingMock } from '../../mocks/training.mock';
import FeedbacksList from './feedbacks-list';
import { userMock } from '../../mocks/user.mock';

describe('Component: FeedbacksList', () => {
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
        user: userMock,
      },
      [NameSpace.TrainingSlice]: {
        training: trainingMock,
      },
    });
    const training = trainingMock;

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <FeedbacksList training={training} />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByTestId('feedbacks-list')).toBeInTheDocument();
  });
});
