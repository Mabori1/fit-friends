import { ChangeEvent, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { getAvatar, getUserName } from '../../redux/userSlice/selectors';
import { FeedbackTextLength } from '@fit-friends/types';
import {
  createFeedbackAction,
  fetchFeedbacksAction,
  fetchTrainingAction,
} from '../../redux/trainingSlice/apiTrainingActions';
import { getTrainingId } from '../../helper/utils';
import { RATING_VALUES } from '../../constants';
import { IconCross } from '../../helper/svg-const';

type PopupFeedbackProps = {
  trainingId: number | undefined;
  setPopupOpened: (state: boolean) => void;
};

function PopupFeedback({
  trainingId,
  setPopupOpened,
}: PopupFeedbackProps): JSX.Element {
  const dispatch = useAppDispatch();

  const userAvatar = useAppSelector(getAvatar) || '';
  const userName = useAppSelector(getUserName) || '';

  const [rating, setRating] = useState(1);
  const [feedbackText, setFeedbackText] = useState('');

  const [feedbackTextInputUsed, setFeedbackTextInputUsed] = useState(false);
  const [feedbackTextError, setFeedbackTextError] =
    useState('Обязательное поле');

  const [formValid, setFormValid] = useState(true);

  useEffect(() => {
    if (feedbackTextError) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  }, [feedbackTextError]);

  const handleRaitingInputChange = (value: number) => {
    setRating(value);
    setFeedbackTextInputUsed(true);
  };

  const handleFeedBackTextInputChange = (
    evt: ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const value = evt.currentTarget.value;
    setFeedbackTextInputUsed(true);
    setFeedbackText(value);
    if (
      value.length < FeedbackTextLength.Min ||
      value.length > FeedbackTextLength.Max
    ) {
      setFeedbackTextError(
        `Длина комментария от ${FeedbackTextLength.Min} до ${FeedbackTextLength.Max} символов`,
      );
      if (!value) {
        setFeedbackTextError('Обязательное поле');
      }
    } else {
      setFeedbackTextError('');
    }
  };

  const createFeedback = async () => {
    if (formValid && trainingId) {
      await dispatch(
        createFeedbackAction({
          trainingId,
          text: feedbackText,
          userAvatar,
          userName,
          rating,
        }),
      );

      await dispatch(fetchFeedbacksAction(trainingId));
      await dispatch(fetchTrainingAction(+getTrainingId()));
    }
  };

  const handleGoNextButtonClick = () => {
    createFeedback();
    setPopupOpened(false);
  };

  return (
    <main>
      <div
        className="popup-form popup-form--feedback"
        data-testid="popup-feedback"
      >
        <section className="popup">
          <div className="popup__wrapper">
            <div className="popup-head">
              <h2 className="popup-head__header">Оставить отзыв</h2>
              <button
                onClick={() => setPopupOpened(false)}
                className="btn-icon btn-icon--outlined btn-icon--big"
                type="button"
                aria-label="close"
              >
                <svg width="20" height="20" aria-hidden="true">
                  <IconCross />
                </svg>
              </button>
            </div>
            <div className="popup__content popup__content--feedback">
              <h3 className="popup__feedback-title">Оцените тренировку</h3>
              <ul className="popup__rate-list">
                {RATING_VALUES.map((value) => (
                  <li key={value} className="popup__rate-item">
                    <div className="popup__rate-item-wrap">
                      <label>
                        <input
                          onChange={() => handleRaitingInputChange(value)}
                          type="radio"
                          name="оценка тренировки"
                          aria-label={`оценка ${value}.`}
                          value={value}
                          checked={rating === value}
                        />
                        <span className="popup__rate-number">{value}</span>
                      </label>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="popup__feedback">
                <h3 className="popup__feedback-title popup__feedback-title--text">
                  Поделитесь своими впечатлениями о тренировке
                </h3>
                <div className="popup__feedback-textarea">
                  <div className="custom-textarea">
                    <label
                      className={`${
                        feedbackTextInputUsed && feedbackTextError
                          ? 'custom-input--error'
                          : ''
                      }`}
                    >
                      <textarea
                        className={`${
                          feedbackTextInputUsed && feedbackTextError
                            ? 'custom-textarea__error'
                            : ''
                        }`}
                        onChange={handleFeedBackTextInputChange}
                        name="description"
                        placeholder=" "
                        value={feedbackText}
                      ></textarea>
                      <span className="custom-input__error">
                        {feedbackTextInputUsed && feedbackTextError}
                      </span>
                    </label>
                  </div>
                </div>
              </div>
              <div className="popup__button">
                <button
                  onClick={handleGoNextButtonClick}
                  className="btn"
                  type="button"
                >
                  Продолжить
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

export default PopupFeedback;
