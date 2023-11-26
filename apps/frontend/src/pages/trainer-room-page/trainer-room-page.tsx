import { Link } from 'react-router-dom';
import Header from '../../components/header/header1';
import {
  ArrowCheck,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  IconAdd,
  IconBag,
  IconChange,
  IconEdit,
  IconFlash,
  IconFriend,
  IconImport,
  IconTrash,
} from '../../helper/svg-const';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
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
  AVATAR_FILE_TYPES,
  AVATAR_MAX_SIZE,
  AppRoute,
  BASE_SERVER_URL,
  CERTIFICATE_FILE_TYPES,
  MAX_CERTIFICATES_COUNT_PER_PAGE,
} from '../../const';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { getUser } from '../../redux/userSlice/selectors';
import {
  deleteCertificateAction,
  updateUserAction,
  uploadAvatarAction,
  uploadCertificateAction,
} from '../../redux/userSlice/apiUserActions';
import CertificateItem from '../../components/certificate-item/certificate-item';

function TrainerRoomPage() {
  const dispatch = useAppDispatch();
  const user = useAppSelector(getUser);
  const certificates = user?.trainer?.certificate ?? [''];

  const [isLocationSelectOpened, setIsLocationSelectOpened] = useState(false);
  const [isGenderSelectOpened, setIsGenderSelectOpened] = useState(false);
  const [isLevelSelectOpened, setIsLevelSelectOpened] = useState(false);

  const [isFormValid, setIsFormValid] = useState(false);

  const [certificatesPage, setCertificatesPage] = useState(1);
  const [isCertificatesEditable, setIsCertificatesEditable] = useState(false);
  const [editableCertificateItem, setEditableCertificateItem] = useState('');
  const [isContentEditable, setIsContentEditable] = useState(false);

  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [userName, setUserName] = useState(user?.name ?? '');
  const [description, setDescription] = useState(user?.description ?? '');
  const [gender, setGender] = useState(user?.gender ?? '');
  const [location, setLocation] = useState(user?.location ?? '');
  const [level, setLevel] = useState(user?.level ?? '');
  const [typesOfTraining, setTypesOfTraining] = useState(
    user?.typesOfTraining ?? [],
  );
  const [isPersonalTraining, setIsPersonalTraining] = useState(
    user?.trainer?.isPersonalTraining ?? false,
  );

  const [errors, setErrors] = useState<Record<string, string | undefined>>({
    name: '',
    avatar: '',
    description: '',
    certificate: '',
    typesOfTraining: '',
  });

  useEffect(() => {
    if (
      errors.trainingTypes ||
      errors.name ||
      errors.avatar ||
      errors.description ||
      errors.certificate
    ) {
      setIsFormValid(false);
    } else {
      setIsFormValid(true);
    }
  }, [errors]);

  function handleSubmitButtonClick(event: FormEvent<HTMLButtonElement>): void {
    event.preventDefault();
    setIsContentEditable(false);
  }
  function handleEditButtonClick(event: FormEvent<HTMLButtonElement>): void {
    event.preventDefault();
    setIsContentEditable(true);
  }

  function handleUserNameInputChange(event: FormEvent<HTMLInputElement>): void {
    const value = event.currentTarget.value;
    setUserName(value);
    if (
      value.length < UserNameLength.Min ||
      value.length > UserNameLength.Max
    ) {
      setErrors({
        name: `Длина имени должна быть от ${UserNameLength.Min} до ${UserNameLength.Max} символов`,
      });
      if (!value) {
        setErrors({
          name: 'Обязательное поле',
        });
      }
    } else {
      setErrors({
        name: '',
      });
    }
  }

  const handleAvatarFileInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const file = evt.currentTarget.files && evt.currentTarget.files[0];
    const fileName = file ? file.name.toLowerCase() : '';
    const matches = AVATAR_FILE_TYPES.some((fileType) =>
      fileName.endsWith(fileType),
    );

    if (matches && file) {
      setAvatarFile(file);

      setErrors({
        avatar: '',
      });
    } else if (!matches && file) {
      setErrors({
        avatar: 'Загрузите сюда файлы формата PDF, JPG или PNG',
      });
    } else {
      setErrors({
        avatar: 'Обязательное поле',
      });
    }

    if (file?.size && file?.size > AVATAR_MAX_SIZE) {
      setErrors({
        avatar: `Максимальный размер файла ${AVATAR_MAX_SIZE * 1e-6} Мбайт`,
      });
    }
  };

  const handleCertificateFileInputChange = (
    evt: ChangeEvent<HTMLInputElement>,
  ) => {
    const file = evt.currentTarget.files && evt.currentTarget.files[0];
    const fileName = file ? file.name.toLowerCase() : '';
    const matches = CERTIFICATE_FILE_TYPES.some((fileType) =>
      fileName.endsWith(fileType),
    );

    if (matches && file) {
      const formData = new FormData();
      formData.append('file', file);
      dispatch(uploadCertificateAction(formData));
    } else {
      setErrors({
        certificate: 'Загрузите сюда файлы формата PDF, JPG или PNG',
      });
    }
  };

  function handleLeftArrowButtonClick(): void {
    setCertificatesPage((prevState) =>
      prevState > 1 ? prevState - 1 : prevState,
    );
  }

  function handleRightArrowButtonClick(): void {
    const pagesCount = Math.ceil(
      user?.trainer?.certificate?.length ?? 1 / MAX_CERTIFICATES_COUNT_PER_PAGE,
    );
    setCertificatesPage((prevState) =>
      prevState < pagesCount ? prevState + 1 : prevState,
    );
  }

  const handleCertificateSaveButtonClick = (certificateItem: string) => {
    setEditableCertificateItem(certificateItem);
    setIsCertificatesEditable(false);
  };

  const handleCertificateEditButtonClick = (certificateItem: string) => {
    setEditableCertificateItem(certificateItem);
    setIsCertificatesEditable(true);
  };

  const handleCertificateDeleteButtonClick = (certificateItem: string) => {
    dispatch(deleteCertificateAction(certificateItem));
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
          trainer: {
            isPersonalTraining,
          },
        }),
      );

      if (avatarFile) {
        const formData = new FormData();
        formData.append('file', avatarFile);
        dispatch(uploadAvatarAction(formData));
      }
    }
  };

  function handleDescriptionInputChange(
    event: FormEvent<HTMLTextAreaElement>,
  ): void {
    const value = event.currentTarget.value;
    setDescription(value);
    if (
      value.length < UserDescriptionLength.Min ||
      value.length > UserDescriptionLength.Max
    ) {
      setErrors({
        description: `Длина описания от ${UserDescriptionLength.Min} до ${UserDescriptionLength.Max} символов`,
      });
      if (!value) {
        setErrors({
          description: 'Обязательное поле',
        });
      }
    } else {
      setErrors({ description: '' });
    }
  }

  const checkTrainingTypesNumber = (countSelected: number) => {
    if (countSelected < TrainingTypesCount.Min) {
      setErrors({
        typesOfTraining: 'Выберите хотя бы один тип тренировок',
      });
    }
    if (countSelected > TrainingTypesCount.Max) {
      setErrors({
        typesOfTraining: `Выберите не больше ${TrainingTypesCount.Max} типов тренировок`,
      });
    }
    if (
      countSelected >= TrainingTypesCount.Min &&
      countSelected <= TrainingTypesCount.Max
    ) {
      setErrors({ typesOfTraining: '' });
    }
  };

  function handleSpecializationInputChange(
    trainingType: UserTypesTraining,
  ): void {
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
  }

  function handleLocationInputClick(station: UserLocation): void {
    setLocation(station);
    setIsLocationSelectOpened((prevState) => !prevState);
  }

  function handleGenderInputClick(genderType: UserGender): void {
    setGender(genderType);
    setIsGenderSelectOpened((prevState) => !prevState);
  }

  function handleLevelInputClick(level: UserLevel): void {
    setLevel(level);
    setIsLevelSelectOpened((prevState) => !prevState);
  }

  return (
    <>
      <Header />
      <main>
        <section className="inner-page">
          <div className="container">
            <div className="inner-page__wrapper">
              <h1 className="visually-hidden">Личный кабинет</h1>
              <section className="user-info-edit">
                <div
                  className={`${
                    isContentEditable
                      ? 'user-info-edit__header'
                      : 'user-info__header'
                  }`}
                >
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
                          src={`${BASE_SERVER_URL}/${user?.avatar}`}
                          srcSet={`${BASE_SERVER_URL}/${user?.avatar} 2x`}
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
                    <h2 className="user-info-edit__title">Обо мне</h2>
                    <div
                      className={`
                        custom-input
                        ${
                          isContentEditable
                            ? 'user-info-edit__input'
                            : 'custom-input--readonly user-info__input'
                        }
                        ${errors.name ? 'custom-input--error' : ''}`}
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
                          {errors.name ?? ''}
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
                          errors.description ? 'custom-input--error' : ''
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
                          {errors.description ?? ''}
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
                          onChange={() =>
                            setIsPersonalTraining((prevState) => !prevState)
                          }
                          type="checkbox"
                          name="ready-for-training"
                          checked={isPersonalTraining}
                        />
                        <span className="custom-toggle__icon">
                          <svg width="9" height="6" aria-hidden="true">
                            <ArrowCheck />
                          </svg>
                        </span>
                        <span className="custom-toggle__label">
                          {isPersonalTraining
                            ? 'Готов тренировать'
                            : 'Не готов тренировать'}
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
                        ${errors.trainingTypes ? 'custom-input--error' : ''}
                      `}
                    >
                      {Object.values(UserTypesTraining).map((itemType) => (
                        <div key={itemType} className="btn-checkbox">
                          <label>
                            <input
                              onChange={() =>
                                handleSpecializationInputChange(itemType)
                              }
                              className="visually-hidden"
                              type="checkbox"
                              name="specialisation"
                              value={itemType.toLowerCase()}
                              checked={typesOfTraining.includes(itemType)}
                            />
                            <span className="btn-checkbox__btn">
                              {itemType[1]
                                .split('')
                                .map((item, index) =>
                                  index === 0 ? item.toUpperCase() : item,
                                )}
                            </span>
                          </label>
                        </div>
                      ))}
                      <span className="custom-input__error">
                        {errors.trainingTypes ?? ''}
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
                      ${isLocationSelectOpened ? 'is-open' : ''}
                    `}
                  >
                    <span className="custom-select__label">Локация</span>
                    <div className="custom-select__placeholder">
                      {`ст. м. ${location ?? ''}`}
                    </div>
                    <button
                      onClick={() =>
                        setIsLocationSelectOpened((prevState) => !prevState)
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
                          key={station}
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
                      ${isGenderSelectOpened ? 'is-open' : ''}
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
                        setIsGenderSelectOpened((prevState) => !prevState)
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
                      {Object.values(UserGender).map((genderType) => (
                        <li
                          onClick={() => handleGenderInputClick(genderType)}
                          key={genderType}
                          className="custom-select__item"
                        >
                          {genderType
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
                      ${isLevelSelectOpened ? 'is-open' : ''}
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
                        setIsLevelSelectOpened((prevState) => !prevState)
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
                          onClick={() => handleLevelInputClick(level)}
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
                <div className="personal-account-coach">
                  <div className="personal-account-coach__navigation">
                    <Link
                      className="thumbnail-link thumbnail-link--theme-light"
                      to={AppRoute.MyTrainings}
                    >
                      <div className="thumbnail-link__icon thumbnail-link__icon--theme-light">
                        <svg width="30" height="26" aria-hidden="true">
                          <IconFlash />
                        </svg>
                      </div>
                      <span className="thumbnail-link__text">
                        Мои тренировки
                      </span>
                    </Link>
                    <Link
                      className="thumbnail-link thumbnail-link--theme-light"
                      to={AppRoute.CreateTraining}
                    >
                      <div className="thumbnail-link__icon thumbnail-link__icon--theme-light">
                        <svg width="30" height="26" aria-hidden="true">
                          <IconAdd />
                        </svg>
                      </div>
                      <span className="thumbnail-link__text">
                        Создать тренировку
                      </span>
                    </Link>
                    <Link
                      className="thumbnail-link thumbnail-link--theme-light"
                      to={AppRoute.FriendsList}
                    >
                      <div className="thumbnail-link__icon thumbnail-link__icon--theme-light">
                        <svg width="30" height="26" aria-hidden="true">
                          <IconFriend />
                        </svg>
                      </div>
                      <span className="thumbnail-link__text">Мои друзья</span>
                    </Link>
                    <Link
                      className="thumbnail-link thumbnail-link--theme-light"
                      to={AppRoute.MyOrders}
                    >
                      <div className="thumbnail-link__icon thumbnail-link__icon--theme-light">
                        <svg width="30" height="26" aria-hidden="true">
                          <IconBag />
                        </svg>
                      </div>
                      <span className="thumbnail-link__text">Мои заказы</span>
                    </Link>
                    <div className="personal-account-coach__calendar"></div>
                  </div>
                  <div className="personal-account-coach__additional-info">
                    <div className="personal-account-coach__label-wrapper">
                      <h2 className="personal-account-coach__label">
                        Дипломы и сертификаты
                      </h2>
                      <label
                        className={`
                          btn-flat btn-flat--underlined
                          personal-account-coach__button
                          ${errors.certificate ? 'custom-input--error' : ''}
                        `}
                      >
                        <span>
                          <svg width="14" height="14" aria-hidden="true">
                            <IconImport />
                          </svg>{' '}
                          Загрузить
                        </span>
                        <input
                          onChange={handleCertificateFileInputChange}
                          className="visually-hidden"
                          type="file"
                          name="import"
                          tabIndex={-1}
                          accept=".pdf, .jpg, .png"
                        />
                        <span
                          style={{ marginTop: '0' }}
                          className="custom-input__error"
                        >
                          {errors.certificate ?? ''}
                        </span>
                      </label>
                      <div className="personal-account-coach__controls">
                        <button
                          onClick={handleLeftArrowButtonClick}
                          className="btn-icon personal-account-coach__control"
                          type="button"
                          aria-label="previous"
                        >
                          <svg width="16" height="14" aria-hidden="true">
                            <ArrowLeft />
                          </svg>
                        </button>
                        <button
                          onClick={handleRightArrowButtonClick}
                          className="btn-icon personal-account-coach__control"
                          type="button"
                          aria-label="next"
                        >
                          <svg width="16" height="14" aria-hidden="true">
                            <ArrowRight />
                          </svg>
                        </button>
                      </div>
                    </div>
                    <ul className="personal-account-coach__list">
                      {certificates
                        .slice(
                          (certificatesPage - 1) *
                            MAX_CERTIFICATES_COUNT_PER_PAGE,
                          (certificatesPage - 1) *
                            MAX_CERTIFICATES_COUNT_PER_PAGE +
                            MAX_CERTIFICATES_COUNT_PER_PAGE,
                        )
                        .map((certificateItem, i) => (
                          <li
                            key={certificateItem + i}
                            className="personal-account-coach__item"
                          >
                            <div
                              className={`
                                certificate-card
                                ${
                                  isCertificatesEditable
                                    ? 'certificate-card--edit'
                                    : ''
                                }
                              `}
                            >
                              <CertificateItem
                                certificateItem={certificateItem}
                              />
                              <div className="certificate-card__buttons">
                                {isCertificatesEditable &&
                                editableCertificateItem === certificateItem ? (
                                  <>
                                    <button
                                      onClick={() =>
                                        handleCertificateSaveButtonClick(
                                          certificateItem,
                                        )
                                      }
                                      className="btn-flat btn-flat--underlined certificate-card__button certificate-card__button--save"
                                      type="button"
                                    >
                                      <svg
                                        width="12"
                                        height="12"
                                        aria-hidden="true"
                                      >
                                        <IconEdit />
                                      </svg>
                                      <span>Сохранить</span>
                                    </button>
                                    <div className="certificate-card__controls">
                                      <button
                                        className="btn-icon certificate-card__control"
                                        type="button"
                                        aria-label="next"
                                      >
                                        <svg
                                          width="16"
                                          height="16"
                                          aria-hidden="true"
                                        >
                                          <IconChange />
                                        </svg>
                                      </button>
                                      <button
                                        onClick={() =>
                                          handleCertificateDeleteButtonClick(
                                            certificateItem,
                                          )
                                        }
                                        className="btn-icon certificate-card__control"
                                        type="button"
                                        aria-label="next"
                                      >
                                        <svg
                                          width="14"
                                          height="16"
                                          aria-hidden="true"
                                        >
                                          <IconFlash />
                                        </svg>
                                      </button>
                                    </div>
                                  </>
                                ) : (
                                  <button
                                    onClick={() =>
                                      handleCertificateEditButtonClick(
                                        certificateItem,
                                      )
                                    }
                                    className="btn-flat btn-flat--underlined certificate-card__button certificate-card__button--edit"
                                    type="button"
                                  >
                                    <svg
                                      width="12"
                                      height="12"
                                      aria-hidden="true"
                                    >
                                      <IconEdit />
                                    </svg>
                                    <span>Изменить</span>
                                  </button>
                                )}
                              </div>
                            </div>
                          </li>
                        ))}
                    </ul>
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

export default TrainerRoomPage;
