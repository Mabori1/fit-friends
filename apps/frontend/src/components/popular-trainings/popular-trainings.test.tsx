import '@testing-library/jest-dom';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { it, describe } from 'vitest';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { AppRoute, NameSpace } from '../../constants';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { api } from '../../redux/store';
import { State } from '../../redux/store';
import { Action } from 'redux';
import { Provider } from 'react-redux';
import HistoryRouter from '../history-router/history-router';
import PopularTrainings from './popular-trainings';
import { trainingMock } from '../../mocks/training.mock';

describe('Component: PopularTrainings', () => {
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
      [NameSpace.TrainingSlice]: {
        trainingsCatalog: [trainingMock],
      },
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <PopularTrainings />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByTestId('popular-trainings')).toBeInTheDocument();
  });
});
