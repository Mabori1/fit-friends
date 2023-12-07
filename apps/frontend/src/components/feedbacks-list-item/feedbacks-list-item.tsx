import { IconStar } from '../../helper/svg-const';
import { FeedbackRdo } from '../../types/feedback.rdo';

type FeedbackListItemProps = {
  feedback: FeedbackRdo;
};

function FeedbacksListItem({ feedback }: FeedbackListItemProps): JSX.Element {
  return (
    <li className="reviews-side-bar__item" data-testid="reviews-list-item">
      <div className="review">
        <div className="review__user-info">
          <div className="review__user-photo">
            <picture>
              <img
                src={`${import.meta.env.VITE_SERVER_URL_FILES}${
                  feedback.userAvatar
                }`}
                width="64"
                height="64"
                alt="Изображение пользователя"
              />
            </picture>
          </div>
          <span className="review__user-name">{feedback.userName}</span>
          <div className="review__rating">
            <svg width="16" height="16" aria-hidden="true">
              <IconStar />
            </svg>
            <span>{feedback.rating}</span>
          </div>
        </div>
        <p className="review__comment">{feedback.text}</p>
      </div>
    </li>
  );
}

export default FeedbacksListItem;
