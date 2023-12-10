import { Link } from 'react-router-dom';
import { OrderRdo } from '../../types/order.rdo';
import { useAppSelector } from '../../redux/store';
import { getTrainingById } from '../../redux/trainingSlice/selectors';
import {
  IconChart,
  IconInfo,
  IconStar,
  IconWallet,
} from '../../helper/svg-const';

type OrdersItemProps = {
  order: OrderRdo;
};

function OrdersItem({ order }: OrdersItemProps): JSX.Element {
  const training = useAppSelector(getTrainingById(order.trainingId));
  const features = [`#${order.type}`, `#${training?.caloriesQtt}ккал`];

  return (
    <li className="my-orders__item" data-testid="my-orders-item">
      <div className="thumbnail-training">
        <div className="thumbnail-training__inner">
          <div className="thumbnail-training__image">
            <picture>
              <img
                src={training?.backgroundPicture}
                width="330"
                height="190"
                alt="training thumbnail"
              />
            </picture>
          </div>
          <p className="thumbnail-training__price">
            <span className="thumbnail-training__price-value">
              {order.price}
            </span>
            <span>₽</span>
          </p>
          <h2 className="thumbnail-training__title">{training?.title}</h2>
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
                <IconStar />
              </svg>
              <span className="thumbnail-training__rate-value">
                {training?.rating}
              </span>
            </div>
          </div>
          <div className="thumbnail-training__text-wrapper">
            <p className="thumbnail-training__text">{training?.description}</p>
          </div>
          <Link
            className="btn-flat btn-flat--underlined thumbnail-training__button-orders"
            to="#"
          >
            <svg width="18" height="18" aria-hidden="true">
              <IconInfo />
            </svg>
            <span>Подробнее</span>
          </Link>
        </div>
        <div className="thumbnail-training__total-info">
          <div className="thumbnail-training__total-info-card">
            <svg width="32" height="32" aria-hidden="true">
              <IconChart />
            </svg>
            <p className="thumbnail-training__total-info-value">
              {order.price * order.quantity}
            </p>
            <p className="thumbnail-training__total-info-text">
              Куплено тренировок
            </p>
          </div>
          <div className="thumbnail-training__total-info-card">
            <svg width="31" height="28" aria-hidden="true">
              <IconWallet />
            </svg>
            <p className="thumbnail-training__total-info-value">
              {order.totalPrice * order.quantity}
              <span>₽</span>
            </p>
            <p className="thumbnail-training__total-info-text">Общая сумма</p>
          </div>
        </div>
      </div>
    </li>
  );
}

export default OrdersItem;
