import { useEffect, useState } from 'react';
import { TrainingRdo } from '../../types/training.rdo';
import { useAppDispatch } from '../../redux/store';
import { TypeOfOrder, TypeOfPayment } from '@fit-friends/types';
import {
  buyTrainingAction,
  fetchBalanceAction,
} from '../../redux/userSlice/apiUserActions';
import {
  DashLine,
  IconCross,
  IconMinus,
  IconPlus,
  IomoneyLogo,
  MirLogo,
  VisaLogo,
} from '../../helper/svg-const';
import { toast } from 'react-toastify';

type PopupBuyTrainingProps = {
  training: TrainingRdo;
  setModalOpened: (state: boolean) => void;
};

function PopupBuyTraining({
  training,
  setModalOpened,
}: PopupBuyTrainingProps): JSX.Element {
  const dispatch = useAppDispatch();

  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState<TypeOfPayment | null>(
    null,
  );

  const [paymentMethodError, setPaymentMethodError] = useState('');

  useEffect(() => {
    if (training.price) {
      setTotalPrice(quantity * training.price);
    }
  }, [quantity, training.price]);

  const handleMinusButtonClick = () => {
    setQuantity((prevState) => (prevState > 1 ? prevState - 1 : prevState));
  };

  const handlePlusButtonClick = () => {
    setQuantity((prevState) => prevState + 1);
  };

  const buyTraining = async () => {
    if (training.price && paymentMethod) {
      const response = await dispatch(
        buyTrainingAction({
          type: TypeOfOrder.Subscription,
          trainerId: training.trainerId,
          trainingId: training.id,
          price: training.price,
          quantity,
          sumPrice: training.price * quantity,
          typeOfPayment: paymentMethod,
        }),
      );

      if (response.meta.requestStatus === 'fulfilled') {
        toast.success(`Куплено тренировок: ${quantity} шт.`);
      }

      await dispatch(fetchBalanceAction());
      setModalOpened(false);
    }
  };

  const handleBuyButtonClick = () => {
    if (!paymentMethod) {
      setPaymentMethodError('Выберите способ оплаты');
      return;
    }
    buyTraining();
  };

  return (
    <main>
      <div className="popup-form popup-form--buy">
        <section className="popup">
          <div className="popup__wrapper">
            <div className="popup-head">
              <h2 className="popup-head__header">Купить тренировку</h2>
              <button
                onClick={() => setModalOpened(false)}
                className="btn-icon btn-icon--outlined btn-icon--big"
                type="button"
                aria-label="close"
              >
                <svg width="20" height="20" aria-hidden="true">
                  <IconCross />
                </svg>
              </button>
            </div>
            <div className="popup__content popup__content--purchases">
              <div className="popup__product">
                <div className="popup__product-image">
                  <picture>
                    <img
                      src={training.backgroundPicture}
                      width="98"
                      height="80"
                      alt=""
                    />
                  </picture>
                </div>
                <div className="popup__product-info">
                  <h3 className="popup__product-title">{training.title}</h3>
                  <p className="popup__product-price">
                    {`${training.price ?? ''} ₽`}
                  </p>
                </div>
                <div className="popup__product-quantity">
                  <p className="popup__quantity">Количество</p>
                  <div className="input-quantity">
                    <button
                      onClick={handleMinusButtonClick}
                      className="btn-icon btn-icon--quantity"
                      type="button"
                      aria-label="minus"
                    >
                      <svg width="12" height="12" aria-hidden="true">
                        <IconMinus />
                      </svg>
                    </button>
                    <div className="input-quantity__input">
                      <label>
                        <input
                          value={quantity}
                          size={2}
                          type="number"
                          readOnly
                        />
                      </label>
                    </div>
                    <button
                      onClick={handlePlusButtonClick}
                      className="btn-icon btn-icon--quantity"
                      type="button"
                      aria-label="plus"
                    >
                      <svg width="12" height="12" aria-hidden="true">
                        <IconPlus />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
              <section
                className={`
                    payment-method
                    ${
                      !paymentMethod && paymentMethodError
                        ? 'custom-input--error'
                        : ''
                    }
                  `}
              >
                <h4 className="payment-method__title">
                  Выберите способ оплаты
                </h4>
                <ul className="payment-method__list">
                  <li className="payment-method__item">
                    <div className="btn-radio-image">
                      <label>
                        <input
                          onChange={() => setPaymentMethod(TypeOfPayment.Visa)}
                          type="radio"
                          name="payment-purchases"
                          aria-label="Visa."
                        />
                        <span className="btn-radio-image__image">
                          <svg width="58" height="20" aria-hidden="true">
                            <VisaLogo />
                          </svg>
                        </span>
                      </label>
                    </div>
                  </li>
                  <li className="payment-method__item">
                    <div className="btn-radio-image">
                      <label>
                        <input
                          onChange={() => setPaymentMethod(TypeOfPayment.Mir)}
                          type="radio"
                          name="payment-purchases"
                          aria-label="Мир."
                        />
                        <span className="btn-radio-image__image">
                          <svg width="66" height="20" aria-hidden="true">
                            <MirLogo />
                          </svg>
                        </span>
                      </label>
                    </div>
                  </li>
                  <li className="payment-method__item">
                    <div className="btn-radio-image">
                      <label>
                        <input
                          onChange={() =>
                            setPaymentMethod(TypeOfPayment.Umoney)
                          }
                          type="radio"
                          name="payment-purchases"
                          aria-label="Iomoney."
                        />
                        <span className="btn-radio-image__image">
                          <svg width="106" height="24" aria-hidden="true">
                            <IomoneyLogo />
                          </svg>
                        </span>
                      </label>
                    </div>
                  </li>
                </ul>
                {!paymentMethod && paymentMethodError && (
                  <span className="custom-input__error">
                    {paymentMethodError}
                  </span>
                )}
              </section>
              <div className="popup__total">
                <p className="popup__total-text">Итого</p>
                <svg>
                  <DashLine />
                </svg>
                <p className="popup__total-price">
                  {`${totalPrice}`}
                  &nbsp;₽
                </p>
              </div>
              <div className="popup__button">
                <button
                  onClick={handleBuyButtonClick}
                  className="btn"
                  type="button"
                >
                  Купить
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

export default PopupBuyTraining;
