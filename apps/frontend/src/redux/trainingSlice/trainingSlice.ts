import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../constants';
import { FeedbackRdo } from '../../types/feedback.rdo';
import { TrainingRdo } from '../../types/training.rdo';
import { UserRdo } from '../../types/user.rdo';
import { OrderRdo } from '../../types/order.rdo';
import { fetchTrainingsAction } from './apiTrainingActions';

type TrainingData = {
  training: TrainingRdo | null;
  trainings: TrainingRdo[];
  orders: OrderRdo[];
  allTrainings: TrainingRdo[];
  filteredTrainingCatalog: TrainingRdo[];
  trainingCatalog: TrainingRdo[];
  recommendedTrainings: TrainingRdo[];
  userTrainings: TrainingRdo[];
  userInfo: UserRdo | null;
  feedbacks: FeedbackRdo[];
};

const initialState: TrainingData = {
  training: null,
  trainings: [],
  orders: [],
  allTrainings: [],
  filteredTrainingCatalog: [],
  trainingCatalog: [],
  recommendedTrainings: [],
  userTrainings: [],
  userInfo: null,
  feedbacks: [],
};

export const trainingSlice = createSlice({
  name: NameSpace.TrainingSlice,
  initialState,
  reducers: {
    setTraining: (state, action) => {
      state.training = action.payload as TrainingRdo;
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchTrainingsAction.fulfilled, (state, action) => {
      state.trainings = action.payload;
    });
  },
});

export const { setTraining } = trainingSlice.actions;
