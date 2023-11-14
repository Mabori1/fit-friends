import { IconCrown, IconLocation } from '../svg/svg';

function LookForCompanyCard() {
  return (
    <li className="look-for-company__item">
      <div className="thumbnail-user thumbnail-user--role-user thumbnail-user--dark">
        <div className="thumbnail-user__image">
          <picture>
            <source
              type="image/webp"
              srcSet="img/content/thumbnails/user-07.webp, img/content/thumbnails/user-07@2x.webp 2x"
            />
            <img
              src="img/content/thumbnails/user-07.jpg"
              srcSet="img/content/thumbnails/user-07@2x.jpg 2x"
              width="82"
              height="82"
              alt=""
            />
          </picture>
        </div>
        <div className="thumbnail-user__top-status thumbnail-user__top-status--role-user">
          <svg width="12" height="12" aria-hidden="true">
            <IconCrown />
          </svg>
        </div>
        <div className="thumbnail-user__header">
          <h3 className="thumbnail-user__name">Яна</h3>
          <div className="thumbnail-user__location">
            <svg width="14" height="16" aria-hidden="true">
              <IconLocation />
            </svg>
            <address className="thumbnail-user__location-address">
              Крестовский остров
            </address>
          </div>
        </div>
        <ul className="thumbnail-user__hashtags-list">
          <li className="thumbnail-user__hashtags-item">
            <div className="hashtag thumbnail-user__hashtag">
              <span>#пилатес</span>
            </div>
          </li>
        </ul>
        <a
          className="btn btn--outlined btn--dark-bg btn--medium thumbnail-user__button"
          href="#"
        >
          Подробнее
        </a>
      </div>
    </li>
  );
}

export default LookForCompanyCard;
