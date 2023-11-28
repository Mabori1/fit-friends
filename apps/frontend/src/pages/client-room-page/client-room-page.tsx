import { Link } from 'react-router-dom';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import Header from '../../components/header/header';
import {
  AVATAR_FILE_TYPES,
  AVATAR_MAX_SIZE,
  AppRoute,
  DAYS_IN_A_WEEK,
} from '../../const';
import { nanoid } from 'nanoid';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { getAvater, getIsAuth, getUser } from '../../redux/userSlice/selectors';
import {
  TrainingTypesCount,
  UserDescriptionLength,
  UserGender,
  UserLevel,
  UserLocation,
  UserNameLength,
  UserTypesTraining,
} from '@fit-friends/types';
import {
  updateUserAction,
  uploadAvatarAction,
  checkUserAction,
} from '../../redux/userSlice/apiUserActions';
import MyProgress from '../../components/my-progress/my-progress';
import {
  ArrowCheck,
  ArrowDown,
  IconBook,
  IconChange,
  IconEdit,
  IconFriends,
  IconRanking,
  IconShoppingCart,
  IconTrash,
  IconWeight,
} from '../../helper/svg-const';
import { isFulfilled } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

function ClientRoomPage(): JSX.Element {
  const serverUrl = 'http://localhost:4000';
  const dispatch = useAppDispatch();
  const user = useAppSelector(getUser);
  const storeAvatar = useAppSelector(getAvater);
  const isAuth = useAppSelector(getIsAuth);
  const navigate = useNavigate();

  const userDailyCaloriesCount = user?.client?.caloryLosingPlanDaily ?? 0;
  const planForWeekCaloriesCount = userDailyCaloriesCount * DAYS_IN_A_WEEK ?? 0;

  const [isContentEditable, setIsContentEditable] = useState(false);

  const [isLocationSelectOpen, setIsLocationSelectOpen] = useState(false);
  const [isGenderSelectOpen, setIsGenderSelectOpen] = useState(false);
  const [isLevelSelectOpen, setIsLevelSelectOpen] = useState(false);

  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [userName, setUserName] = useState(user?.name);
  const [description, setDescription] = useState(user?.description);
  const [typesOfTraining, setTypesOfTraining] = useState(
    user?.typesOfTraining ?? [],
  );
  const [location, setLocation] = useState(user?.location);
  const [gender, setGender] = useState(user?.gender);
  const [level, setLevel] = useState(user?.level);
  const [isReady, setIsReady] = useState(user?.client?.isReady);

  const [userNameError, setUserNameError] = useState('');
  const [trainingTypesError, setTrainingTypesError] = useState('');
  const [descriptionError, setDescriptionError] = useState('');
  const [avatarError, setAvatarError] = useState('');

  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    if (
      trainingTypesError ||
      userNameError ||
      descriptionError ||
      avatarError
    ) {
      setIsFormValid(false);
    } else {
      setIsFormValid(true);
    }
  }, [trainingTypesError, userNameError, descriptionError, avatarError]);

  const handleUserNameInputChange = (evt: FormEvent<HTMLInputElement>) => {
    const value = evt.currentTarget.value;
    setUserName(value);
    if (
      value.length < UserNameLength.Min ||
      value.length > UserNameLength.Max
    ) {
      setUserNameError(
        `Длина имени от ${UserNameLength.Min} до ${UserNameLength.Max} символов`,
      );
      if (!value) {
        setUserNameError('Обязательное поле');
      }
    } else {
      setUserNameError('');
    }
  };

  const handleDescriptionInputChange = (
    evt: FormEvent<HTMLTextAreaElement>,
  ) => {
    const value = evt.currentTarget.value;
    setDescription(value);
    if (
      value.length < UserDescriptionLength.Min ||
      value.length > UserDescriptionLength.Max
    ) {
      setDescriptionError(
        `Длина описания от ${UserDescriptionLength.Min} до ${UserDescriptionLength.Max} символов`,
      );
      if (!value) {
        setDescriptionError('Обязательное поле');
      }
    } else {
      setDescriptionError('');
    }
  };

  const checkTrainingTypesNumber = (typesNumber: number) => {
    if (typesNumber < TrainingTypesCount.Min) {
      setTrainingTypesError('Выберите минимум один тип тренировок');
    }
    if (typesNumber > TrainingTypesCount.Max) {
      setTrainingTypesError(
        `Выберите не больше ${TrainingTypesCount.Max} типов тренировок`,
      );
    }
    if (
      typesNumber >= TrainingTypesCount.Min &&
      typesNumber <= TrainingTypesCount.Max
    ) {
      setTrainingTypesError('');
    }
  };

  const handleSpecializationInputChange = (trainingType: UserTypesTraining) => {
    if (typesOfTraining.includes(trainingType)) {
      setTypesOfTraining((prevState) => {
        const updatedState = prevState.filter((type) => type !== trainingType);
        checkTrainingTypesNumber(updatedState.length);
        return updatedState;
      });
    } else {
      setTypesOfTraining((prevState) => {
        const updatedState = [...prevState, trainingType];
        checkTrainingTypesNumber(updatedState.length);
        return updatedState;
      });
    }
  };

  const handleLocationInputClick = (locationValue: UserLocation) => {
    setLocation(locationValue);
    setIsLocationSelectOpen((prevState) => !prevState);
  };

  const handleGenderInputClick = (gender: UserGender) => {
    setGender(gender);
    setIsGenderSelectOpen((prevState) => !prevState);
  };

  const handleTrainingLevelInputClick = (level: UserLevel) => {
    setLevel(level);
    setIsLevelSelectOpen((prevState) => !prevState);
  };

  const handleAvatarFileInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const file = evt.currentTarget.files && evt.currentTarget.files[0];
    const fileName = file ? file.name.toLowerCase() : '';
    const matches = AVATAR_FILE_TYPES.some((fileType) =>
      fileName.endsWith(fileType),
    );

    if (matches && file) {
      setAvatarFile(file);

      setAvatarError('');
    } else if (!matches && file) {
      setAvatarError('Загрузите сюда файлы формата PDF, JPG или PNG');
    } else {
      setAvatarError('Загрузка аватара обязательна');
    }

    if (file?.size && file?.size > AVATAR_MAX_SIZE) {
      setAvatarError(
        `Максимальный размер файла ${AVATAR_MAX_SIZE * 1e-6} Мбайт`,
      );
    }
  };

  const sendFormData = async () => {
    if (isFormValid && gender && location && level) {
      await dispatch(
        updateUserAction({
          name: userName,
          gender,
          location,
          level,
          typesOfTraining,
          description,
          client: {
            isReady,
          },
        }),
      )
        .then(isFulfilled)
        .then(() => {
          if (avatarFile) {
            const formData = new FormData();
            formData.append('file', avatarFile);
            dispatch(uploadAvatarAction(formData)).catch(() => {
              toast.error('Аватар не загружен');
            });
          }
        })
        .catch(() => {
          toast.error('Что-то пошло не так');
        });
    }
  };

  const handleEditButtonClick = (evt: FormEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    setIsContentEditable(true);
  };

  const handleSubmitButtonClick = (evt: FormEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    sendFormData();
    setIsContentEditable(false);
  };

  useEffect(() => {
    dispatch(updateUserAction({ avatar: storeAvatar }));
  }, [dispatch, storeAvatar]);

  useEffect(() => {
    if (user) {
      setUserName(user.name);
      setDescription(user.description);
      setTypesOfTraining(user.typesOfTraining ?? []);
      setLocation(user.location);
      setGender(user.gender);
      setLevel(user.level);
      setIsReady(user.client?.isReady ?? false);
    } else {
      dispatch(checkUserAction());
    }
  }, [dispatch, user]);

  useEffect(() => {
    if (!isAuth) {
      navigate(AppRoute.Intro);
    }
  }, [isAuth, navigate]);

  console.log(user?.avatar);
  console.log(isAuth);
  return (
    <>
      <Header />
      <main>
        <section className="inner-page">
          <div className="container">
            <div className="inner-page__wrapper">
              <h1 className="visually-hidden">Личный кабинет</h1>
              <section className="user-info">
                <div className="user-info__header">
                  <div className="input-load-avatar">
                    <label>
                      <input
                        onChange={handleAvatarFileInputChange}
                        className="visually-hidden"
                        type="file"
                        name="user-photo-1"
                        accept="image/png, image/jpeg"
                        disabled={!isContentEditable}
                      />
                      <span className="input-load-avatar__avatar">
                        <img
                          src={`${serverUrl}${user?.avatar}`}
                          srcSet={`${serverUrl}${user?.avatar} 2x`}
                          width="98"
                          height="98"
                          alt="user"
                        />
                      </span>
                    </label>
                  </div>
                  {isContentEditable && (
                    <div className="user-info-edit__controls">
                      <button
                        className="user-info-edit__control-btn"
                        aria-label="обновить"
                      >
                        <svg width="16" height="16" aria-hidden="true">
                          <IconChange />
                        </svg>
                      </button>
                      <button
                        className="user-info-edit__control-btn"
                        aria-label="удалить"
                      >
                        <svg width="14" height="16" aria-hidden="true">
                          <IconTrash />
                        </svg>
                      </button>
                    </div>
                  )}
                </div>
                <form
                  className={`${
                    isContentEditable
                      ? 'user-info-edit__form'
                      : 'user-info__form'
                  }`}
                  action="#"
                  method="post"
                >
                  {isContentEditable ? (
                    <button
                      onClick={handleSubmitButtonClick}
                      className="btn-flat btn-flat--underlined user-info-edit__save-button"
                      type="submit"
                      aria-label="Сохранить"
                    >
                      <svg width="12" height="12" aria-hidden="true">
                        <IconEdit />
                      </svg>
                      <span>Сохранить</span>
                    </button>
                  ) : (
                    <button
                      onClick={handleEditButtonClick}
                      className="btn-flat btn-flat--underlined user-info__edit-button"
                      type="button"
                      aria-label="Редактировать"
                    >
                      <svg width="12" height="12" aria-hidden="true">
                        <IconEdit />
                      </svg>
                      <span>Редактировать</span>
                    </button>
                  )}
                  <div
                    className={`${
                      isContentEditable
                        ? 'user-info-edit__section'
                        : 'user-info__section'
                    }`}
                  >
                    <h2 className="user-info__title">Обо мне</h2>
                    <div
                      className={`
                        custom-input
                        ${
                          isContentEditable
                            ? 'user-info-edit__input'
                            : 'custom-input--readonly user-info__input'
                        }
                        ${userNameError ? 'custom-input--error' : ''}`}
                    >
                      <label>
                        <span className="custom-input__label">Имя</span>
                        <span className="custom-input__wrapper">
                          <input
                            onChange={handleUserNameInputChange}
                            type="text"
                            name="name"
                            value={userName}
                            disabled={!isContentEditable}
                          />
                        </span>
                        <span className="custom-input__error">
                          {userNameError}
                        </span>
                      </label>
                    </div>
                    <div
                      className={`
                        custom-textarea
                        ${
                          isContentEditable
                            ? 'user-info-edit__textarea'
                            : 'custom-textarea--readonly user-info__textarea'
                        }
                      `}
                    >
                      <label
                        className={`${
                          descriptionError ? 'custom-input--error' : ''
                        }`}
                      >
                        <span className="custom-textarea__label">Описание</span>
                        <textarea
                          onChange={handleDescriptionInputChange}
                          name="description"
                          placeholder=" "
                          value={description}
                          disabled={!isContentEditable}
                        ></textarea>
                        <span className="custom-input__error">
                          {descriptionError}
                        </span>
                      </label>
                    </div>
                  </div>
                  <div
                    className={`
                      ${
                        isContentEditable
                          ? 'user-info-edit__section user-info-edit__section--status'
                          : 'user-info__section user-info__section--status'
                      }
                    `}
                  >
                    <h2
                      className={`
                        ${
                          isContentEditable
                            ? 'user-info-edit__title user-info-edit__title--status'
                            : 'user-info__title user-info__title--status'
                        }
                      `}
                    >
                      Статус
                    </h2>
                    <div
                      className={`
                        custom-toggle
                        custom-toggle--switch
                        ${
                          isContentEditable
                            ? 'user-info-edit__toggle'
                            : 'user-info__toggle'
                        }
                      `}
                    >
                      <label>
                        <input
                          onChange={() => setIsReady((prevState) => !prevState)}
                          type="checkbox"
                          name="ready-for-training"
                          disabled={!isContentEditable}
                          checked={isReady}
                        />
                        <span className="custom-toggle__icon">
                          <svg width="9" height="6" aria-hidden="true">
                            <ArrowCheck />
                          </svg>
                        </span>
                        <span className="custom-toggle__label">
                          <span className="custom-toggle__label">
                            {isReady
                              ? 'Готов к тренировке'
                              : 'Не готов к тренировке'}
                          </span>
                        </span>
                      </label>
                    </div>
                  </div>
                  <div
                    className={`
                      ${
                        isContentEditable
                          ? 'user-info-edit__section'
                          : 'user-info__section'
                      }
                    `}
                  >
                    <h2
                      className={`
                        ${
                          isContentEditable
                            ? 'user-info-edit__title user-info-edit__title--specialization'
                            : 'user-info__title user-info__title--specialization'
                        }
                      `}
                    >
                      Специализация
                    </h2>
                    <div
                      className={`
                        specialization-checkbox
                        ${
                          isContentEditable
                            ? 'user-info-edit__specialization'
                            : 'user-info__specialization'
                        }
                        ${trainingTypesError ? 'custom-input--error' : ''}
                      `}
                    >
                      {Object.values(UserTypesTraining).map((type) => (
                        <div key={type} className="btn-checkbox">
                          <label>
                            <input
                              onChange={() =>
                                handleSpecializationInputChange(type)
                              }
                              className="visually-hidden"
                              type="checkbox"
                              name="specialisation"
                              value={type}
                              checked={typesOfTraining.includes(type)}
                            />
                            <span className="btn-checkbox__btn">
                              {type
                                .split('')
                                .map((item, index) =>
                                  index === 0 ? item.toUpperCase() : item,
                                )}
                            </span>
                          </label>
                        </div>
                      ))}
                      <span className="custom-input__error">
                        {trainingTypesError}
                      </span>
                    </div>
                  </div>
                  <div
                    className={`
                      custom-select
                      ${
                        isContentEditable
                          ? 'user-info-edit__select'
                          : 'custom-select--readonly user-info__select'
                      }
                      ${isLocationSelectOpen ? 'is-open' : ''}
                    `}
                  >
                    <span className="custom-select__label">Локация</span>
                    <div className="custom-select__placeholder">
                      {`ст. м. ${location ?? ''}`}
                    </div>
                    <button
                      onClick={() =>
                        setIsLocationSelectOpen((prevState) => !prevState)
                      }
                      className="custom-select__button"
                      type="button"
                      aria-label="Выберите одну из опций"
                      disabled={!isContentEditable}
                    >
                      <span className="custom-select__text"></span>
                      <span className="custom-select__icon">
                        <svg width="15" height="6" aria-hidden="true">
                          <ArrowDown />
                        </svg>
                      </span>
                    </button>
                    <ul className="custom-select__list" role="listbox">
                      {Object.values(UserLocation).map((station) => (
                        <li
                          onClick={() => handleLocationInputClick(station)}
                          key={nanoid()}
                          className="custom-select__item"
                        >
                          {station}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div
                    className={`
                      custom-select
                      ${
                        isContentEditable
                          ? 'user-info-edit__select'
                          : 'custom-select--readonly user-info__select'
                      }
                      ${isGenderSelectOpen ? 'is-open' : ''}
                    `}
                  >
                    <span className="custom-select__label">Пол</span>
                    <div className="custom-select__placeholder">
                      {gender
                        ?.split('')
                        .map((item, index) =>
                          index === 0 ? item.toUpperCase() : item,
                        )}
                    </div>
                    <button
                      onClick={() =>
                        setIsGenderSelectOpen((prevState) => !prevState)
                      }
                      className="custom-select__button"
                      type="button"
                      aria-label="Выберите одну из опций"
                      disabled={!isContentEditable}
                    >
                      <span className="custom-select__text"></span>
                      <span className="custom-select__icon">
                        <svg width="15" height="6" aria-hidden="true">
                          <ArrowDown />
                        </svg>
                      </span>
                    </button>
                    <ul className="custom-select__list" role="listbox">
                      {Object.values(UserGender).map((gender) => (
                        <li
                          onClick={() => handleGenderInputClick(gender)}
                          key={gender}
                          className="custom-select__item"
                        >
                          {gender
                            .split('')
                            .map((item, index) =>
                              index === 0 ? item.toUpperCase() : item,
                            )}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div
                    className={`
                      custom-select
                      ${
                        isContentEditable
                          ? 'user-info-edit__select'
                          : 'custom-select--readonly user-info__select'
                      }
                      ${isLevelSelectOpen ? 'is-open' : ''}
                    `}
                  >
                    <span className="custom-select__label">Уровень</span>
                    <div className="custom-select__placeholder">
                      {level
                        ?.split('')
                        .map((item, index) =>
                          index === 0 ? item.toUpperCase() : item,
                        )}
                    </div>
                    <button
                      onClick={() =>
                        setIsLevelSelectOpen((prevState) => !prevState)
                      }
                      className="custom-select__button"
                      type="button"
                      aria-label="Выберите одну из опций"
                      disabled={!isContentEditable}
                    >
                      <span className="custom-select__text"></span>
                      <span className="custom-select__icon">
                        <svg width="15" height="6" aria-hidden="true">
                          <ArrowDown />
                        </svg>
                      </span>
                    </button>
                    <ul className="custom-select__list" role="listbox">
                      {Object.values(UserLevel).map((level) => (
                        <li
                          onClick={() => handleTrainingLevelInputClick(level)}
                          key={level}
                          className="custom-select__item"
                        >
                          {level
                            .split('')
                            .map((item, index) =>
                              index === 0 ? item.toUpperCase() : item,
                            )}
                        </li>
                      ))}
                    </ul>
                  </div>
                </form>
              </section>
              <div className="inner-page__content">
                <div className="personal-account-user">
                  <div className="personal-account-user__schedule">
                    <form action="#" method="get">
                      <div className="personal-account-user__form">
                        <div className="personal-account-user__input">
                          <label>
                            <span className="personal-account-user__label">
                              План на день, ккал
                            </span>
                            <input
                              type="text"
                              name="schedule-for-the-day"
                              defaultValue={userDailyCaloriesCount}
                            />
                          </label>
                        </div>
                        <div className="personal-account-user__input">
                          <label>
                            <span className="personal-account-user__label">
                              План на неделю, ккал
                            </span>
                            <input
                              type="text"
                              name="schedule-for-the-week"
                              defaultValue={planForWeekCaloriesCount}
                            />
                          </label>
                        </div>
                      </div>
                    </form>
                  </div>
                  <div className="personal-account-user__info">
                    <Link
                      className="thumbnail-link thumbnail-link--theme-dark"
                      to={AppRoute.ClientRoom}
                    >
                      <div className="thumbnail-link__icon thumbnail-link__icon--theme-dark">
                        <svg width="30" height="26" aria-hidden="true">
                          <IconRanking />
                        </svg>
                      </div>
                      <span className="thumbnail-link__text">
                        Дневник тренировок
                      </span>
                    </Link>
                    <Link
                      className="thumbnail-link thumbnail-link--theme-dark"
                      to={AppRoute.ClientRoom}
                    >
                      <div className="thumbnail-link__icon thumbnail-link__icon--theme-dark">
                        <svg width="30" height="26" aria-hidden="true">
                          <IconBook />
                        </svg>
                      </div>
                      <span className="thumbnail-link__text">
                        Дневник питания
                      </span>
                    </Link>
                    <MyProgress />
                    <div className="personal-account-user__diagram"></div>
                  </div>
                  <div className="personal-account-user__additional-info">
                    <Link
                      className="thumbnail-link thumbnail-link--theme-light"
                      to={AppRoute.FriendsList}
                    >
                      <div className="thumbnail-link__icon thumbnail-link__icon--theme-light">
                        <svg width="30" height="26" aria-hidden="true">
                          <IconFriends />
                        </svg>
                      </div>
                      <span className="thumbnail-link__text">Мои друзья</span>
                    </Link>
                    <Link
                      className="thumbnail-link thumbnail-link--theme-light"
                      to={AppRoute.ClientRoom}
                    >
                      <div className="thumbnail-link__icon thumbnail-link__icon--theme-light">
                        <svg width="30" height="26" aria-hidden="true">
                          <IconWeight />
                        </svg>
                      </div>
                      <span className="thumbnail-link__text">Мои залы</span>
                    </Link>
                    <Link
                      className="thumbnail-link thumbnail-link--theme-light personal-account-user__shop"
                      to={AppRoute.MyOrders}
                    >
                      <div className="thumbnail-link__icon thumbnail-link__icon--theme-light">
                        <svg width="30" height="26" aria-hidden="true">
                          <IconShoppingCart />
                        </svg>
                      </div>
                      <span className="thumbnail-link__text">Мои покупки</span>
                    </Link>
                    <div className="personal-account-user__calendar"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default ClientRoomPage;
