import { useAppDispatch, useAppSelector } from '../../redux/store';
import { OrderStatus, UserRole } from '@fit-friends/types';
import { MAX_DIFF_IN_MILLISECONDS } from '../../constants';
import { UserRdo } from '../../types/user.rdo';
import { IconLocation } from '../../helper/svg-const';
import { IconInvite } from '../../helper/svg-const';
import { PersonalOrderRdo } from '../../types/personal-order.rdo';
import {
  addPersonalOrderAction,
  changePersonalOrderStatusAction,
  fetchPersonalOrdersAction,
} from '../../redux/userSlice/apiUserActions';
import { getUserId } from '../../redux/userSlice/selectors';

type FriendsListItemProps = {
  friend: UserRdo;
  personalOrder: PersonalOrderRdo;
  isTrainer: boolean;
};

function FriendsListItem({
  friend,
  personalOrder,
  isTrainer,
}: FriendsListItemProps): JSX.Element {
  const dispatch = useAppDispatch();
  const isFriendTrainer = friend.role === UserRole.Trainer;
  const userId = useAppSelector(getUserId);

  const timeNow = Number(new Date());
  const lastTimeUpdated = Number(new Date(friend.updatedAt ?? timeNow));
  const timeDiff = Math.abs(timeNow - lastTimeUpdated);

  const isUserOnline = timeDiff < MAX_DIFF_IN_MILLISECONDS;
  const isReadyForTraining = !isFriendTrainer
    ? friend.client?.isReady
    : friend.trainer?.isPersonalTraining;

  const handleInviteButtonClick = async () => {
    await dispatch(addPersonalOrderAction(friend.userId));
    if (userId) {
      dispatch(fetchPersonalOrdersAction(userId));
    }
  };

  const handleAcceptTrainingRequestButtonClick = async () => {
    if (personalOrder) {
      await dispatch(
        changePersonalOrderStatusAction({
          orderId: personalOrder.id,
          newStatus: OrderStatus.Accepted,
        }),
      );
      if (userId) {
        dispatch(fetchPersonalOrdersAction(userId));
      }
    }
  };

  const handleRejectTrainingRequestButtonClick = async () => {
    if (personalOrder) {
      await dispatch(
        changePersonalOrderStatusAction({
          orderId: personalOrder.id,
          newStatus: OrderStatus.Declined,
        }),
      );
      if (userId) {
        dispatch(fetchPersonalOrdersAction(userId));
      }
    }
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
                  src={`${import.meta.env.VITE_SERVER_URL_FILES}${
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
                  disabled={!!personalOrder}
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
        {personalOrder?.orderStatus === OrderStatus.Pending &&
          friend.userId === personalOrder.targetId && (
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
        {personalOrder?.orderStatus === OrderStatus.Accepted &&
          friend.userId === personalOrder.userId && (
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
        {personalOrder?.orderStatus === OrderStatus.Declined &&
          friend.userId === personalOrder.userId && (
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
