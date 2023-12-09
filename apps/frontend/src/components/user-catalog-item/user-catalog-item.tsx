import { Link } from 'react-router-dom';
import { UserRdo } from '../../types/user.rdo';
import { IconCrown, IconLocation } from '../../helper/svg-const';
import { AppRoute } from '../../constants';
import { UserRole } from '@fit-friends/types';

type UsersCatalogItemProps = {
  user: UserRdo;
};

function UsersCatalogItem({ user }: UsersCatalogItemProps): JSX.Element {
  const isTrainer = user.role === UserRole.Trainer;
  const isUserVip = isTrainer
    ? user.trainer?.isPersonalTraining
    : user.client?.isReady;

  return (
    <li className="users-catalog__item" data-testid="users-catalog-item">
      <div
        className={`
          thumbnail-user
          ${
            isTrainer
              ? 'thumbnail-user--role-coach'
              : 'thumbnail-user--role-user'
          }
        `}
      >
        <div className="thumbnail-user__image">
          <picture>
            {user.avatar && (
              <img
                src={`${import.meta.env.VITE_SERVER_URL_FILES}${user.avatar}`}
                width="82"
                height="82"
                alt="user avatar"
              />
            )}
          </picture>
        </div>
        {isUserVip && (
          <div
            className={`
                  thumbnail-user__top-status
                  ${
                    isTrainer
                      ? 'thumbnail-user__top-status--role-coach'
                      : 'thumbnail-user__top-status--role-user'
                  }
                `}
          >
            <svg width="12" height="12" aria-hidden="true">
              <IconCrown />
            </svg>
          </div>
        )}
        <div className="thumbnail-user__header">
          <h3 className="thumbnail-user__name">{user.name}</h3>
          <div className="thumbnail-user__location">
            <svg width="14" height="16" aria-hidden="true">
              <IconLocation />
            </svg>
            <address className="thumbnail-user__location-address">
              {user.location}
            </address>
          </div>
        </div>
        <ul className="thumbnail-user__hashtags-list">
          {user.typesOfTraining.map((type) => (
            <li key={type} className="thumbnail-user__hashtags-item">
              <div className="hashtag thumbnail-user__hashtag">
                <span>{`#${type}`}</span>
              </div>
            </li>
          ))}
        </ul>
        <Link
          className={`
            btn btn--medium thumbnail-user__button
            ${isTrainer ? 'btn--dark-bg' : ''}
          `}
          to={`${AppRoute.UserCard}/${user.userId}`}
        >
          Подробнее
        </Link>
      </div>
    </li>
  );
}

export default UsersCatalogItem;
