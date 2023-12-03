import { Link } from 'react-router-dom';
import { TrainingRdo } from '../../types/training.rdo';
import { useAppDispatch } from '../../redux/store';
import { saveTrainingId } from '../../helper/utils';
import { setTraining } from '../../redux/trainingSlice/trainingSlice';
import { fetchUserInfoAction } from '../../redux/trainingSlice/apiTrainingActions';
import { AppRoute } from '../../constants';

type SpecialForYouItemProps = {
  training: TrainingRdo;
};

function SpecialForYouItem({ training }: SpecialForYouItemProps): JSX.Element {
  const dispatch = useAppDispatch();

  const handleToTrainingCardPageLinkClick = () => {
    dispatch(setTraining(training));
    saveTrainingId(training.id.toString());
    dispatch(fetchUserInfoAction(training.trainerId));
    window.scrollTo(0, 0);
  };

  return (
    <li className="special-for-you__item">
      <div className="thumbnail-preview">
        <div className="thumbnail-preview__image">
          <picture>
            {training && (
              <img
                src={training.backgroundPicture}
                height="191"
                alt="training"
              />
            )}
          </picture>
        </div>
        <div className="thumbnail-preview__inner">
          <h3 className="thumbnail-preview__title">{training.title}</h3>
          <div className="thumbnail-preview__button-wrapper">
            <Link
              onClick={handleToTrainingCardPageLinkClick}
              className="btn btn--small thumbnail-preview__button"
              to={AppRoute.TrainingCard}
            >
              Подробнее
            </Link>
          </div>
        </div>
      </div>
    </li>
  );
}

export default SpecialForYouItem;
