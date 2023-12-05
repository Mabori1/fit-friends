import { Link } from 'react-router-dom';
import { UserRdo } from '../../types/user.rdo';
import { AppRoute } from '../../constants';
import { IconCrown, IconLocation } from '../../helper/svg-const';

type LookForCompanyItemProps = {
  user: UserRdo;
};

function LookForCompanyItem({ user }: LookForCompanyItemProps): JSX.Element {
  return (
    <li className="look-for-company__item" data-testid="look-for-company-item">
      <div className="thumbnail-user thumbnail-user--role-user thumbnail-user--dark">
        <div className="thumbnail-user__image">
          <picture>
            <img
              src={
                user && user.avatar
                  ? `${import.meta.env.VITE_SERVER_URL_FILES}${user.avatar}`
                  : ''
              }
              width="82"
              height="82"
              alt="avatar"
            />
          </picture>
        </div>
        <div className="thumbnail-user__top-status thumbnail-user__top-status--role-user">
          <svg width="12" height="12" aria-hidden="true">
            <IconCrown />
          </svg>
        </div>
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
          onClick={() => window.scrollTo(0, 0)}
          className="btn btn--outlined btn--dark-bg btn--medium thumbnail-user__button"
          to={`${AppRoute.UserCard}/${user.userId}`}
        >
          Подробнее
        </Link>
      </div>
    </li>
  );
}

export default LookForCompanyItem;
