import TrainingThumbnail from '../training-thumbnail/training-thumbnail';
import { MAX_USER_CARD_TRAININGS_COUNT } from '../../constants';
import { useEffect, useState } from 'react';
import { UserRdo } from '../../types/user.rdo';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import {
  getSubscribeStatus,
  getClientFriends,
  getIsClientFriend,
  getOutPersonalOrders,
} from '../../redux/userSlice/selectors';
import { getTrainerTrainings } from '../../redux/trainingSlice/selectors';
import {
  buyPersonalTrainingAction,
  checkSubscribeAction,
  fetchAddFriendAction,
  fetchClientFriendsAction,
  fetchOutPersonalOrdersAction,
  fetchRemoveFriendAction,
  toggleSubscribeAction,
} from '../../redux/userSlice/apiUserActions';
import { fetchTrainerTrainingsAction } from '../../redux/trainingSlice/apiTrainingActions';
import PopupTrainerCertificates from '../popup-trainer-certificate/pupup-trainer-certificate';
import {
  ArrowCheck,
  ArrowLeft,
  ArrowRight,
  IconCup,
  IconLocation,
  IconTeacher,
} from '../../helper/svg-const';

type UserCardTrainerProps = {
  trainer: UserRdo;
};

function UserCardTrainer({ trainer }: UserCardTrainerProps): JSX.Element {
  const dispatch = useAppDispatch();

  const myFriends = useAppSelector(getClientFriends);
  const trainings = useAppSelector(getTrainerTrainings);
  const outOrders = useAppSelector(getOutPersonalOrders);
  const isSubscribers = useAppSelector(getSubscribeStatus);
  const isFriend = useAppSelector(getIsClientFriend(trainer?.userId));

  const [isCertificatesModalOpened, setIsCertificatesModalOpened] =
    useState(false);

  const [trainingsCurrentPage, setTrainingsCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(fetchClientFriendsAction());
    dispatch(fetchOutPersonalOrdersAction());
    dispatch(
      fetchTrainerTrainingsAction({
        trainerId: trainer.userId,
        query: {
          page: trainingsCurrentPage,
          limit: MAX_USER_CARD_TRAININGS_COUNT,
        },
      }),
    );
    dispatch(checkSubscribeAction(trainer.userId));
  }, [dispatch, trainingsCurrentPage, trainer.userId]);

  const handleFriendRelations = async () => {
    if (!isFriend) {
      await dispatch(fetchAddFriendAction(trainer.userId));
    } else {
      await dispatch(fetchRemoveFriendAction(trainer.userId));
    }

    await dispatch(fetchClientFriendsAction());
  };

  const handleBackArrowButtonClick = () => {
    setTrainingsCurrentPage((prevState) =>
      prevState > 1 ? prevState - 1 : prevState,
    );
  };

  const handleNextArrowButtonClick = () => {
    setTrainingsCurrentPage((prevState) =>
      trainings && trainings.length < MAX_USER_CARD_TRAININGS_COUNT
        ? prevState
        : prevState + 1,
    );
  };

  const handleShowCertificatesButtonClick = () => {
    setIsCertificatesModalOpened(true);
  };

  const handleInviteButtonClick = async () => {
    await dispatch(buyPersonalTrainingAction(trainer.userId));
    await dispatch(fetchOutPersonalOrdersAction());
  };

  const handleSubscribeInputChange = async () => {
    await dispatch(toggleSubscribeAction(trainer.userId));
  };

  return (
    <>
      <section className="user-card-coach" data-testid="user-card-coach">
        <h1 className="visually-hidden">Карточка пользователя роль тренер</h1>
        <div className="user-card-coach__wrapper">
          <div className="user-card-coach__card">
            <div className="user-card-coach__content">
              <div className="user-card-coach__head">
                <h2 className="user-card-coach__title">{trainer.name}</h2>
              </div>
              <div className="user-card-coach__label">
                <svg
                  className="user-card-coach__icon-location"
                  width="12"
                  height="14"
                  aria-hidden="true"
                >
                  <IconLocation />
                </svg>
                <span>{trainer.location}</span>
              </div>
              <div className="user-card-coach__status-container">
                <div className="user-card-coach__status user-card-coach__status--tag">
                  <svg
                    className="user-card-coach__icon-cup"
                    width="12"
                    height="13"
                    aria-hidden="true"
                  >
                    <IconCup />
                  </svg>
                  <span>Тренер</span>
                </div>
                {trainer.trainer?.isPersonalTraining ? (
                  <div className="user-card-coach__status user-card-coach__status--check">
                    <span>Готов тренировать</span>
                  </div>
                ) : (
                  <div className="user-card-coach-2__status user-card-coach-2__status--check">
                    <span>Не готов тренировать</span>
                  </div>
                )}
              </div>
              <div className="user-card-coach__text">
                <p>{trainer.description}</p>
              </div>
              <button
                onClick={handleShowCertificatesButtonClick}
                className="btn-flat user-card-coach__sertificate"
                type="button"
              >
                <svg width="12" height="13" aria-hidden="true">
                  <IconTeacher />
                </svg>
                <span>Посмотреть сертификаты</span>
              </button>
              <ul className="user-card-coach__hashtag-list">
                {trainer.typesOfTraining.map((trainingType) => (
                  <li
                    key={trainingType}
                    className="user-card-coach__hashtag-item"
                  >
                    <div className="hashtag">
                      <span>#{trainingType}</span>
                    </div>
                  </li>
                ))}
              </ul>
              {myFriends.some((friend) => friend.userId === trainer.userId) ? (
                <button
                  onClick={handleFriendRelations}
                  className="btn user-card-coach__btn"
                  type="button"
                >
                  Удалить из друзей
                </button>
              ) : (
                <button
                  onClick={handleFriendRelations}
                  className="btn user-card-coach__btn"
                  type="button"
                >
                  Добавить в друзья
                </button>
              )}
            </div>
            <div className="user-card-coach__gallary">
              <ul className="user-card-coach__gallary-list">
                <li className="user-card-coach__gallary-item">
                  <img
                    src="img/content/user-coach-photo1.jpg"
                    srcSet="img/content/user-coach-photo1@2x.jpg 2x"
                    width="334"
                    height="573"
                    alt="photo1"
                  />
                </li>
                <li className="user-card-coach__gallary-item">
                  <img
                    src="img/content/user-coach-photo2.jpg"
                    srcSet="img/content/user-coach-photo2@2x.jpg 2x"
                    width="334"
                    height="573"
                    alt="photo2"
                  />
                </li>
              </ul>
            </div>
          </div>
          <div className="user-card-coach__training">
            <div className="user-card-coach__training-head">
              <h2 className="user-card-coach__training-title">Тренировки</h2>
              <div className="user-card-coach__training-bts">
                <button
                  onClick={handleBackArrowButtonClick}
                  className="btn-icon user-card-coach__training-btn"
                  type="button"
                  aria-label="back"
                >
                  <svg width="14" height="10" aria-hidden="true">
                    <ArrowLeft />
                  </svg>
                </button>
                <button
                  onClick={handleNextArrowButtonClick}
                  className="btn-icon user-card-coach__training-btn"
                  type="button"
                  aria-label="next"
                >
                  <svg width="14" height="10" aria-hidden="true">
                    <ArrowRight />
                  </svg>
                </button>
              </div>
            </div>
            {trainings && (
              <ul className="user-card-coach__training-list">
                {trainings.map((training) => (
                  <li
                    key={training.id}
                    className="user-card-coach__training-item"
                  >
                    <TrainingThumbnail training={training} />
                  </li>
                ))}
              </ul>
            )}
            <form className="user-card-coach__training-form">
              {trainer.trainer?.isPersonalTraining &&
                myFriends.some(
                  (friend) => friend.userId === trainer.userId,
                ) && (
                  <button
                    onClick={handleInviteButtonClick}
                    className="btn user-card-coach__btn-training"
                    type="button"
                    disabled={outOrders?.some(
                      (request) => request.targetId === trainer.userId,
                    )}
                  >
                    Хочу персональную тренировку
                  </button>
                )}
              <div className="user-card-coach__training-check">
                <div className="custom-toggle custom-toggle--checkbox">
                  <label>
                    <input
                      onChange={handleSubscribeInputChange}
                      type="checkbox"
                      value="user-agreement-1"
                      name="user-agreement"
                      checked={isSubscribers}
                    />
                    <span className="custom-toggle__icon">
                      <svg width="9" height="6" aria-hidden="true">
                        <ArrowCheck />
                      </svg>
                    </span>
                    <span className="custom-toggle__label">
                      Получать уведомление на почту о новой тренировке
                    </span>
                  </label>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
      {isCertificatesModalOpened && (
        <PopupTrainerCertificates
          certificates={trainer?.trainer?.certificate || []}
          setPopupOpened={setIsCertificatesModalOpened}
        />
      )}
    </>
  );
}

export default UserCardTrainer;
