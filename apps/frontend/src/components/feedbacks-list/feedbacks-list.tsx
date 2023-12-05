import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { getFeedbacks } from '../../redux/trainingSlice/selectors';
import { getBalance, getIsTrainer } from '../../redux/userSlice/selectors';
import { TrainingRdo } from '../../types/training.rdo';
import { fetchFeedbacksAction } from '../../redux/trainingSlice/apiTrainingActions';
import { fetchBalanceAction } from '../../redux/userSlice/apiUserActions';
import FeedbacksListItem from '../feedbacks-list-item/feedbacks-list-item';
import PopupFeedback from '../popup-feedback/popup-feedback';

type FeedbasListProps = {
  training: TrainingRdo | null;
};

function FeedbacksList({ training }: FeedbasListProps): JSX.Element {
  const dispatch = useAppDispatch();

  const isTrainer = useAppSelector(getIsTrainer);
  const feedbacks = useAppSelector(getFeedbacks);
  const balance = useAppSelector(getBalance);

  const [isPopupOpened, setPopupOpened] = useState(false);

  const isTrainingAlreadyInBalance = training
    ? balance?.find((purchase) => purchase.trainingId === training.id)
    : false;

  const isLeaveFeedbackButtonDisabled =
    isTrainer || !isTrainingAlreadyInBalance;

  useEffect(() => {
    if (training) {
      dispatch(fetchFeedbacksAction(training.id));
    }
    dispatch(fetchBalanceAction());
  }, [dispatch, training]);

  return (
    <>
      <aside className="reviews-side-bar">
        <button
          onClick={() => window.history.back()}
          className="btn-flat btn-flat--underlined reviews-side-bar__back"
          type="button"
        >
          <svg width="14" height="10" aria-hidden="true">
            <use xlinkHref="#arrow-left"></use>
          </svg>
          <span>Назад</span>
        </button>
        <h2 className="reviews-side-bar__title">Отзывы</h2>
        <ul className="reviews-side-bar__list">
          {feedbacks &&
            feedbacks.map((feedback) => (
              <FeedbacksListItem key={feedback.id} feedback={feedback} />
            ))}
        </ul>
        <button
          onClick={() => setPopupOpened(true)}
          className="btn btn--medium reviews-side-bar__button"
          type="button"
          disabled={isLeaveFeedbackButtonDisabled}
        >
          Оставить отзыв
        </button>
      </aside>
      {isPopupOpened && (
        <PopupFeedback
          trainingId={training?.id}
          setPopupOpened={setPopupOpened}
        />
      )}
    </>
  );
}

export default FeedbacksList;
