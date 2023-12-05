import { Link } from 'react-router-dom';
import { TrainingRdo } from '../../types/training.rdo';
import { useAppDispatch } from '../../redux/store';
import { setTraining } from '../../redux/trainingSlice/trainingSlice';
import { saveTrainingId } from '../../helper/utils';
import { fetchUserInfoAction } from '../../redux/trainingSlice/apiTrainingActions';
import { AppRoute } from '../../constants';

type TrainingThumbnailProps = {
  training: TrainingRdo;
};

function TrainingThumbnail({ training }: TrainingThumbnailProps): JSX.Element {
  const dispatch = useAppDispatch();

  const features = [
    `#${training ? training.typeOfTraining : ''}`,
    `#${training ? training.caloriesQtt : ''}ккал`,
  ];

  const handleToTrainingCardPageLinkClick = () => {
    dispatch(setTraining(training));
    saveTrainingId(training.id.toString());
    dispatch(fetchUserInfoAction(training.trainerId));
    window.scrollTo(0, 0);
  };

  return (
    <div className="thumbnail-training" data-testid="training-thumbnail">
      <div className="thumbnail-training__inner">
        <div className="thumbnail-training__image">
          <picture>
            <img
              src={`../${training.backgroundPicture}`}
              width="330"
              height="190"
              alt="training thumbnail"
            />
          </picture>
        </div>
        <p className="thumbnail-training__price">
          {training.price !== 0 ? (
            <>
              <span className="thumbnail-training__price-value">
                {training.price}
              </span>
              <span>₽</span>
            </>
          ) : (
            <span>Бесплатно</span>
          )}
        </p>
        <h3 className="thumbnail-training__title">{training.title}</h3>
        <div className="thumbnail-training__info">
          <ul className="thumbnail-training__hashtags-list">
            {features.map((tag) => (
              <li key={tag} className="thumbnail-training__hashtags-item">
                <div className="hashtag thumbnail-training__hashtag">
                  <span>{tag}</span>
                </div>
              </li>
            ))}
          </ul>
          <div className="thumbnail-training__rate">
            <svg width="16" height="16" aria-hidden="true">
              <use xlinkHref="#icon-star"></use>
            </svg>
            <span className="thumbnail-training__rate-value">
              {training.rating}
            </span>
          </div>
        </div>
        <div className="thumbnail-training__text-wrapper">
          <p className="thumbnail-training__text">{training.description}</p>
        </div>
        <div className="thumbnail-training__button-wrapper">
          <Link
            onClick={handleToTrainingCardPageLinkClick}
            className="btn btn--small thumbnail-training__button-catalog"
            to={AppRoute.TrainingCard}
          >
            Подробнее
          </Link>
          <Link
            className="btn btn--small btn--outlined thumbnail-training__button-catalog"
            to="#"
          >
            Отзывы
          </Link>
        </div>
      </div>
    </div>
  );
}

export default TrainingThumbnail;
