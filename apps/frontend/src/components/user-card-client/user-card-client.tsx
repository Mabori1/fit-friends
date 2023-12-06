import { nanoid } from 'nanoid';
import { useEffect } from 'react';
import { UserRdo } from '../../types/user.rdo';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { getClientFriends } from '../../redux/userSlice/selectors';
import {
  fetchAddFriendAction,
  fetchClientFriendsAction,
  fetchRemoveFriendAction,
} from '../../redux/userSlice/apiUserActions';
import { FriendAction } from '../../types/friend-action';

type UserCardProps = {
  client: UserRdo | null;
};

function UserCardClient({ client }: UserCardProps): JSX.Element {
  const dispatch = useAppDispatch();

  const myFriends = useAppSelector(getClientFriends);

  useEffect(() => {
    dispatch(fetchClientFriendsAction());
  }, [dispatch]);

  const handleFriendRelations = async (type: FriendAction) => {
    if (client) {
      switch (type) {
        case FriendAction.Add:
          await dispatch(fetchAddFriendAction(client.userId));
          break;
        case FriendAction.Remove:
          await dispatch(fetchRemoveFriendAction(client.userId));
          break;
      }
      await dispatch(fetchClientFriendsAction());
    }
  };

  const handleAddFriendButtonClick = () => {
    handleFriendRelations(FriendAction.Add);
  };

  const handleRemoveFriendButtonClick = () => {
    handleFriendRelations(FriendAction.Remove);
  };

  return (
    <section className="user-card" data-testid="user-card-user">
      <h1 className="visually-hidden">Карточка пользователя</h1>
      <div className="user-card__wrapper">
        <div className="user-card__content">
          <div className="user-card__head">
            <h2 className="user-card__title">{client?.name}</h2>
            <div className="user-card__icon">
              <svg
                className="user-card__crown"
                width="12"
                height="12"
                aria-hidden="true"
              >
                <use xlinkHref="#icon-crown"></use>
              </svg>
            </div>
          </div>
          <div className="user-card__label">
            <svg
              className="user-card__icon-location"
              width="12"
              height="14"
              aria-hidden="true"
            >
              <use xlinkHref="#icon-location"></use>
            </svg>
            <span>{client?.location}</span>
          </div>
          {client?.client?.isReady ? (
            <div className="user-card__status">
              <span>Готов к тренировке</span>
            </div>
          ) : (
            <div className="user-card__status">
              <span>Не готов к тренировке</span>
            </div>
          )}
          <div className="user-card__text">
            <p>{client?.description}</p>
          </div>
          <ul className="user-card__hashtag-list">
            {client?.typesOfTraining.map((type) => (
              <li key={nanoid()} className="user-card__hashtag-item">
                <div className="hashtag">
                  <span>{`#${type}`}</span>
                </div>
              </li>
            ))}
            <li className="user-card__hashtag-item">
              <div className="hashtag">
                <span>{`#${client ? client.level : ''}`}</span>
              </div>
            </li>
          </ul>
          {myFriends.some((friend) => friend.userId === client?.userId) ? (
            <button
              onClick={handleRemoveFriendButtonClick}
              className="btn user-card__btn"
              type="button"
            >
              Удалить из друзей
            </button>
          ) : (
            <button
              onClick={handleAddFriendButtonClick}
              className="btn user-card__btn"
              type="button"
            >
              Добавить в друзья
            </button>
          )}
        </div>
        <div className="user-card__gallary">
          <ul className="user-card__gallary-list">
            <li className="user-card__gallary-item">
              <img
                src="img/content/user-card-photo1.jpg"
                srcSet="img/content/user-card-photo1@2x.jpg 2x"
                width="334"
                height="573"
                alt="photo1"
              />
            </li>
            <li className="user-card__gallary-item">
              <img
                src="img/content/user-card-photo2.jpg"
                srcSet="img/content/user-card-photo2@2x.jpg 2x"
                width="334"
                height="573"
                alt="photo2"
              />
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}

export default UserCardClient;
