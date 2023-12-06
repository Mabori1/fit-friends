import { UserRequestRdo } from '../../types/user-request.rdo';
import { useAppDispatch } from '../../redux/store';
import { UserRequestType } from '../../types/user-request-type.enum';
import { OrderStatus } from '@fit-friends/types';
import { MAX_DIFF_IN_MILLISECONDS } from '../../constants';
import {
  changePersonalOrderStatusAction,
  fetchInPersonalOrderAction,
  fetchOutPersonalOrderAction,
  sendTrainingRequestAction,
} from '../../redux/userSlice/apiUserActions';
import { UserRdo } from '../../types/user.rdo';
import { IconLocation } from '../../helper/svg-const';
import { IconInvite } from '../../helper/svg-const';

type FriendsListItemProps = {
  friend: UserRdo;
  request: UserRequestRdo | undefined;
  isTrainer: boolean;
};

function FriendsListItem({
  friend,
  request,
  isTrainer,
}: FriendsListItemProps): JSX.Element {
  const dispatch = useAppDispatch();

  const timeNow = Number(new Date());
  const lastTimeUpdated = Number(new Date(friend.updatedAt ?? timeNow));
  const timeDiff = Math.abs(timeNow - lastTimeUpdated);

  const isUserOnline = timeDiff < MAX_DIFF_IN_MILLISECONDS;
  const isReadyForTraining = !isTrainer
    ? friend.client?.isReady
    : friend.trainer?.isPersonalTraining;

  const createUserRequest = async () => {
    await dispatch(
      sendTrainingRequestAction({
        type: UserRequestType.Training,
        userId: friend.userId,
      }),
    );
    dispatch(fetchInPersonalOrderAction());
    if (!isTrainer) {
      dispatch(fetchOutPersonalOrderAction());
    }
  };

  const handleInviteButtonClick = () => {
    createUserRequest();
  };

  const dispatchAcceptRequest = async () => {
    if (request) {
      await dispatch(
        changePersonalOrderStatusAction({
          trainingRequestStatus: OrderStatus.Accepted,
          requestId: request.id,
        }),
      );
      dispatch(fetchInPersonalOrderAction());
      if (!isTrainer) {
        dispatch(fetchInPersonalOrderAction());
      }
    }
  };

  const dispatchRejectRequest = async () => {
    if (request) {
      await dispatch(
        changePersonalOrderStatusAction({
          trainingRequestStatus: OrderStatus.Declined,
          requestId: request.id,
        }),
      );
      dispatch(fetchInPersonalOrderAction());
      if (!isTrainer) {
        dispatch(fetchInPersonalOrderAction());
      }
    }
  };

  const handleAcceptTrainingRequestButtonClick = () => {
    dispatchAcceptRequest();
  };

  const handleRejectTrainingRequestButtonClick = () => {
    dispatchRejectRequest();
  };

  return (
    <li className="friends-list__item" data-testid="friends-list-item">
      <div className="thumbnail-friend">
        <div
          className={`
            thumbnail-friend__info
            ${
              !isTrainer
                ? 'thumbnail-friend__info--theme-light'
                : 'thumbnail-friend__info--theme-dark'
            }
          `}
        >
          <div className="thumbnail-friend__image-status">
            <div className="thumbnail-friend__image">
              <picture>
                <img
                  src={`${import.meta.env.VITE_SERVER_URL_FILES}/${
                    friend.avatar
                  }`}
                  width="78"
                  height="78"
                  alt=""
                />
              </picture>
              {isUserOnline ? (
                <div className="thumbnail-friend__online-status thumbnail-friend__online-status--is-online"></div>
              ) : (
                <div className="thumbnail-friend__online-status thumbnail-friend__online-status--is-offline"></div>
              )}
            </div>
          </div>
          <div className="thumbnail-friend__header">
            <h2 className="thumbnail-friend__name">{friend.name}</h2>
            <div className="thumbnail-friend__location">
              <svg width="14" height="16" aria-hidden="true">
                <IconLocation />
              </svg>
              <address className="thumbnail-friend__location-address">
                {friend.location}
              </address>
            </div>
          </div>
          <ul className="thumbnail-friend__training-types-list">
            {friend.typesOfTraining?.map((type) => (
              <li key={type}>
                <div className="hashtag thumbnail-friend__hashtag">
                  <span>{`#${type}`}</span>
                </div>
              </li>
            ))}
          </ul>
          {isReadyForTraining ? (
            <div className="thumbnail-friend__activity-bar">
              <div className="thumbnail-friend__ready-status thumbnail-friend__ready-status--is-ready">
                <span>Готов к&nbsp;тренировке</span>
              </div>
              {!isTrainer && (
                <button
                  onClick={handleInviteButtonClick}
                  className="thumbnail-friend__invite-button"
                  type="button"
                  disabled={!!request}
                >
                  <svg>
                    <IconInvite />
                  </svg>
                  <span className="visually-hidden">
                    Пригласить друга на совместную тренировку
                  </span>
                </button>
              )}
            </div>
          ) : (
            <div className="thumbnail-friend__activity-bar">
              <div className="thumbnail-friend__ready-status thumbnail-friend__ready-status--is-not-ready">
                <span>Не&nbsp;готов к&nbsp;тренировке</span>
              </div>
            </div>
          )}
        </div>
        {request?.status === OrderStatus.Pending &&
          friend.userId === request.initiatorId && (
            <div className="thumbnail-friend__request-status thumbnail-friend__request-status--role-user">
              <p className="thumbnail-friend__request-text">
                Запрос на&nbsp;персональную тренировку
              </p>
              <div className="thumbnail-friend__button-wrapper">
                <button
                  onClick={handleAcceptTrainingRequestButtonClick}
                  className="btn btn--medium btn--dark-bg thumbnail-friend__button"
                  type="button"
                >
                  Принять
                </button>
                <button
                  onClick={handleRejectTrainingRequestButtonClick}
                  className="btn btn--medium btn--outlined btn--dark-bg thumbnail-friend__button"
                  type="button"
                >
                  Отклонить
                </button>
              </div>
            </div>
          )}
        {request?.status === OrderStatus.Accepted &&
          friend.userId === request.userId && (
            <div className="thumbnail-friend__request-status thumbnail-friend__request-status--role-user">
              {isTrainer && (
                <p className="thumbnail-friend__request-text">
                  Запрос на&nbsp;персональную тренировку принят
                </p>
              )}
              {!isTrainer && (
                <p className="thumbnail-friend__request-text">
                  Запрос на&nbsp;совместную тренировку принят
                </p>
              )}
            </div>
          )}
        {request?.status === OrderStatus.Declined &&
          friend.userId === request.userId && (
            <div className="thumbnail-friend__request-status thumbnail-friend__request-status--role-coach">
              {isTrainer && (
                <p className="thumbnail-friend__request-text">
                  Запрос на&nbsp;персональную тренировку отклонён
                </p>
              )}
              {!isTrainer && (
                <p className="thumbnail-friend__request-text">
                  Запрос на&nbsp;совместную тренировку отклонён
                </p>
              )}
            </div>
          )}
      </div>
    </li>
  );
}

export default FriendsListItem;
