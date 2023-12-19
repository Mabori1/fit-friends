import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import Header from '../../components/header/header';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../redux/store';
import {
  CaloriesOfDay,
  GenderOfTraining,
  TrainingDescriptionLength,
  TrainingDuration,
  TrainingPrice,
  TrainingTitleLength,
  UserLevel,
  UserTypesTraining,
} from '@fit-friends/types';
import {
  AppRoute,
  TrainingTypeImageMap,
  VIDEO_FILE_TYPES,
} from '../../constants';
import {
  createTrainingAction,
  updateTrainingAction,
} from '../../redux/trainingSlice/apiTrainingActions';
import { uploadVideoAction } from '../../redux/trainingSlice/apiTrainingActions';
import { toast } from 'react-toastify';

function CreateTrainingPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [isTrainingTypeSelectOpened, setIsTrainingTypeSelectOpened] =
    useState(false);
  const [isTrainingLevelSelectOpened, setIsTrainingLevelSelectOpened] =
    useState(false);
  const [isDurationSelectOpened, setIsDurationSelectOpened] = useState(false);

  const [title, setTitle] = useState('');
  const [level, setLevel] = useState<UserLevel | null>(null);
  const [trainingType, setTrainingType] = useState<UserTypesTraining | null>(
    null,
  );
  const [duration, setDuration] = useState<TrainingDuration | null>(null);
  const [price, setPrice] = useState<number>(0);
  const [caloriesCount, setCaloriesCount] = useState<number>(0);
  const [description, setDescription] = useState('');
  const [gender, setGender] = useState<GenderOfTraining | null>(null);
  const [videoFile, setVideoFile] = useState<File | null>(null);

  const [titleInputUsed, setTitleInputUsed] = useState(false);
  const [levelInputUsed, setLevelInputUsed] = useState(false);
  const [trainingTypeInputUsed, setTrainingTypeInputUsed] = useState(false);
  const [durationInputUsed, setDurationInputUsed] = useState(false);
  const [caloriesCountInputUsed, setCaloriesCountInputUsed] = useState(false);
  const [priceInputUsed, setPriceInputUsed] = useState(false);
  const [genderInputUsed, setGenderInputUsed] = useState(false);
  const [descriptionInputUsed, setDescriptionInputUsed] = useState(false);
  const [videoFileInputUsed, setVideoFileInputUsed] = useState(false);

  const [titleError, setTitleTypeError] = useState(
    'Укажите название тренировки',
  );
  const [trainingLevelError, setTrainingLevelError] = useState(
    'Выберите уровень подготовки',
  );
  const [trainingTypeError, setTrainingTypeError] = useState(
    'Выберите тип тренировки',
  );
  const [durationError, setDurationError] = useState(
    'Выберите продолжительность тренировки',
  );
  const [caloriesCountError, setCaloriesCountError] = useState(
    'Укажите количество калорий',
  );
  const [priceError, setPriceError] = useState('Укажите цену');
  const [genderError, setGenderError] = useState('Выберите пол');
  const [descriptionError, setDescriptionError] = useState('Обязательное поле');
  const [videoFileError, setVideoFileError] = useState('Загрузите видео');

  const [formValid, setFormValid] = useState(true);

  useEffect(() => {
    if (
      [
        trainingTypeError,
        titleError,
        durationError,
        caloriesCountError,
        priceError,
        genderError,
        trainingLevelError,
        descriptionError,
        videoFileError,
      ].some((item) => !!item)
    ) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  }, [
    trainingTypeError,
    titleError,
    durationError,
    caloriesCountError,
    priceError,
    genderError,
    trainingLevelError,
    descriptionError,
    videoFileError,
  ]);

  const handleTitleInputChange = (evt: FormEvent<HTMLInputElement>) => {
    const value = evt.currentTarget.value;
    setTitle(value);
    if (
      value.length < TrainingTitleLength.Min ||
      value.length > TrainingTitleLength.Max ||
      !value
    ) {
      setTitleTypeError(
        `Длина названия от ${TrainingTitleLength.Min} до ${TrainingTitleLength.Max} символов`,
      );
    } else {
      setTitleTypeError('');
    }
  };

  const handleInputFocus = (evt: FormEvent<HTMLInputElement>) => {
    switch (evt.currentTarget.name) {
      case 'training-name':
        setTitleInputUsed(true);
        break;
      case 'calories':
        setCaloriesCountInputUsed(true);
        break;
      case 'price':
        setPriceInputUsed(true);
        break;
    }
  };

  const handleTrainingLevelInputFocus = () => {
    setLevelInputUsed(true);
  };

  const handleTrainingTypeInputFocus = () => {
    setTrainingTypeInputUsed(true);
  };

  const handleDurationInputFocus = () => {
    setDurationInputUsed(true);
  };

  const handleDescriptionInputFocus = () => {
    setDescriptionInputUsed(true);
  };

  const handleTrainingLevelInputClick = (level: UserLevel) => {
    setLevel(level);
    setIsTrainingLevelSelectOpened((prevState) => !prevState);
    if (!level) {
      setTrainingLevelError('Выберите уровень подготовки');
    } else {
      setTrainingLevelError('');
    }
  };

  const handleTrainingTypeInputClick = (type: UserTypesTraining) => {
    setTrainingType(type);
    setIsTrainingTypeSelectOpened((prevState) => !prevState);
    if (!type) {
      setTrainingTypeError('Выберите тип тренировки');
    } else {
      setTrainingTypeError('');
    }
  };

  const handleDurationInputClick = (durationValue: TrainingDuration) => {
    setDuration(durationValue);
    setIsDurationSelectOpened((prevState) => !prevState);
    if (!durationValue) {
      setDurationError('Выберите продолжительность тренировки');
    } else {
      setDurationError('');
    }
  };

  const handleCaloriesCountInputChange = (evt: FormEvent<HTMLInputElement>) => {
    const value = Number(evt.currentTarget.value);
    setCaloriesCount(value);
    if (value < CaloriesOfDay.Min || value > CaloriesOfDay.Max) {
      setCaloriesCountError(
        `Количество калорий от ${CaloriesOfDay.Min} до ${CaloriesOfDay.Max}`,
      );
      if (!value) {
        setCaloriesCountError('Укажите количество калорий');
      }
    } else {
      setCaloriesCountError('');
    }
  };

  const handlePriceInputChange = (evt: FormEvent<HTMLInputElement>) => {
    const value = Number(evt.currentTarget.value);
    setPrice(value);
    if (value < TrainingPrice.Min || value > TrainingPrice.Max) {
      setPriceError(`Цена от ${TrainingPrice.Min} до ${TrainingPrice.Min}`);
      if (!value) {
        setPriceError('Укажите цену');
      }
    } else {
      setPriceError('');
    }
  };

  const handleGenderInputChange = (genderInputValue: GenderOfTraining) => {
    setGender(genderInputValue);
    if (!genderInputValue) {
      setGenderError('Выберите пол');
    } else {
      setGenderError('');
    }
  };

  const handleDescriptionInputChange = (
    evt: FormEvent<HTMLTextAreaElement>,
  ) => {
    const value = evt.currentTarget.value;
    setDescription(value);
    if (
      description.length < TrainingDescriptionLength.Min ||
      description.length > TrainingDescriptionLength.Max ||
      !description
    ) {
      setDescriptionError(
        `Длина описания от ${TrainingDescriptionLength.Min} до ${TrainingDescriptionLength.Max} символов`,
      );
    } else {
      setDescriptionError('');
    }
  };

  const handleVideoFileInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const file = evt.currentTarget.files && evt.currentTarget.files[0];
    const fileName = file ? file.name.toLowerCase() : '';
    const matches = VIDEO_FILE_TYPES.some((fileType) =>
      fileName.endsWith(fileType),
    );

    if (matches && file) {
      setVideoFile(file);

      setVideoFileError('');
    } else if (!matches && file) {
      setVideoFileError('Загрузите сюда файлы формата PDF, JPG или PNG');
    } else {
      setVideoFileError('Добавьте подтверждающий документ');
    }
  };

  const dispatchFormData = async () => {
    if (formValid && level && trainingType && duration && gender && videoFile) {
      const trainingDto = {
        title,
        levelOfUser: level,
        typeOfTraining: trainingType,
        duration,
        price,
        caloriesQtt: caloriesCount,
        description,
        gender,
        backgroundPicture: TrainingTypeImageMap[trainingType],
        video: 'movie.mp4',
        isPromo: false,
      };

      const dataCreateTraining = await dispatch(
        createTrainingAction(trainingDto),
      );

      if (createTrainingAction.fulfilled.match(dataCreateTraining)) {
        toast.success('Тренировка успешно создана');

        if (videoFile) {
          const formData = new FormData();
          formData.append('file', videoFile);
          const dataVideo = await dispatch(uploadVideoAction(formData));
          if (uploadVideoAction.fulfilled.match(dataVideo)) {
            const path = dataVideo.payload.path;
            const id = dataCreateTraining.payload.id;
            const dataUpdatedTraining = await dispatch(
              updateTrainingAction({ id, video: path }),
            );
            if (updateTrainingAction.fulfilled.match(dataUpdatedTraining)) {
              navigate(AppRoute.TrainerTrainings);
            }
          }
        }
      }
    }
  };

  const handleSubmitButtonClick = (evt: FormEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    dispatchFormData();
    setTrainingTypeInputUsed(true);
    setTitleInputUsed(true);
    setDurationInputUsed(true);
    setCaloriesCountInputUsed(true);
    setPriceInputUsed(true);
    setGenderInputUsed(true);
    setLevelInputUsed(true);
    setDescriptionInputUsed(true);
    setVideoFileInputUsed(true);
  };

  return (
    <>
      <Header />
      <main>
        <div className="popup-form popup-form--create-training">
          <div className="popup-form__wrapper">
            <div className="popup-form__content">
              <div className="popup-form__title-wrapper">
                <h1 className="popup-form__title">Создание тренировки</h1>
              </div>
              <div className="popup-form__form">
                <form method="get">
                  <div className="create-training">
                    <div className="create-training__wrapper">
                      <div className="create-training__block">
                        <h2 className="create-training__legend">
                          Название тренировки
                        </h2>
                        <div
                          className={`
                            custom-input create-training__input
                            ${
                              titleInputUsed && titleError
                                ? 'custom-input--error'
                                : ''
                            }
                          `}
                        >
                          <label>
                            <span className="custom-input__wrapper">
                              <input
                                onFocus={handleInputFocus}
                                onChange={handleTitleInputChange}
                                type="text"
                                name="training-name"
                                value={title}
                              />
                            </span>
                            <span className="custom-input__error">
                              {titleInputUsed && titleError}
                            </span>
                          </label>
                        </div>
                        <div
                          className={`
                              custom-select
                              ${isTrainingLevelSelectOpened ? 'is-open' : ''}
                              ${
                                level
                                  ? 'not-empty'
                                  : 'custom-select--not-selected'
                              }
                              ${
                                levelInputUsed && trainingLevelError
                                  ? 'is-invalid'
                                  : ''
                              }
                            `}
                        >
                          <span className="custom-select__label">
                            Выберите уровень подготовки
                          </span>
                          <button
                            onFocus={handleTrainingLevelInputFocus}
                            onClick={() =>
                              setIsTrainingLevelSelectOpened(
                                (prevState) => !prevState,
                              )
                            }
                            className="custom-select__button"
                            type="button"
                            aria-label="Выберите одну из опций"
                          >
                            <span className="custom-select__text">
                              {level
                                ?.split('')
                                .map((item, index) =>
                                  index === 0 ? item.toUpperCase() : item,
                                )}
                            </span>
                            <span className="custom-select__icon">
                              <svg width="15" height="6" aria-hidden="true">
                                <use xlinkHref="#arrow-down"></use>
                              </svg>
                            </span>
                          </button>
                          <ul className="custom-select__list" role="listbox">
                            {Object.values(UserLevel).map((option) => (
                              <li
                                onClick={() =>
                                  handleTrainingLevelInputClick(option)
                                }
                                key={option}
                                className="custom-select__item"
                              >
                                {option
                                  .split('')
                                  .map((item, index) =>
                                    index === 0 ? item.toUpperCase() : item,
                                  )}
                              </li>
                            ))}
                          </ul>
                          <span className="custom-select__error">
                            {levelInputUsed && trainingLevelError}
                          </span>
                        </div>
                      </div>
                      <div className="create-training__block">
                        <h2 className="create-training__legend">
                          Характеристики тренировки
                        </h2>
                        <div className="create-training__info">
                          <div
                            className={`
                              custom-select
                              ${isTrainingTypeSelectOpened ? 'is-open' : ''}
                              ${
                                trainingType
                                  ? 'not-empty'
                                  : 'custom-select--not-selected'
                              }
                              ${
                                trainingTypeInputUsed && trainingTypeError
                                  ? 'is-invalid'
                                  : ''
                              }
                            `}
                          >
                            <span className="custom-select__label">
                              Выберите тип тренировки
                            </span>
                            <button
                              onFocus={handleTrainingTypeInputFocus}
                              onClick={() =>
                                setIsTrainingTypeSelectOpened(
                                  (prevState) => !prevState,
                                )
                              }
                              className="custom-select__button"
                              type="button"
                              aria-label="Выберите одну из опций"
                            >
                              <span className="custom-select__text">
                                {trainingType
                                  ?.split('')
                                  .map((item, index) =>
                                    index === 0 ? item.toUpperCase() : item,
                                  )}
                              </span>
                              <span className="custom-select__icon">
                                <svg width="15" height="6" aria-hidden="true">
                                  <use xlinkHref="#arrow-down"></use>
                                </svg>
                              </span>
                            </button>
                            <ul className="custom-select__list" role="listbox">
                              {Object.values(UserTypesTraining).map(
                                (option) => (
                                  <li
                                    onClick={() =>
                                      handleTrainingTypeInputClick(option)
                                    }
                                    key={option}
                                    className="custom-select__item"
                                  >
                                    {option
                                      .split('')
                                      .map((item, index) =>
                                        index === 0 ? item.toUpperCase() : item,
                                      )}
                                  </li>
                                ),
                              )}
                            </ul>
                            <span className="custom-select__error">
                              {trainingTypeInputUsed && trainingTypeError}
                            </span>
                          </div>
                          <div
                            className={`
                              custom-input custom-input--with-text-right
                              ${
                                caloriesCountInputUsed && caloriesCountError
                                  ? 'custom-input--error'
                                  : ''
                              }
                            `}
                          >
                            <label>
                              <span className="custom-input__label">
                                Сколько калорий потратим
                              </span>
                              <span className="custom-input__wrapper">
                                <input
                                  onFocus={handleInputFocus}
                                  onChange={handleCaloriesCountInputChange}
                                  type="number"
                                  name="calories"
                                  value={caloriesCount.toString()}
                                />
                                <span className="custom-input__text">ккал</span>
                              </span>
                              <span className="custom-input__error">
                                {caloriesCountInputUsed && caloriesCountError}
                              </span>
                            </label>
                          </div>
                          <div
                            className={`
                              custom-select
                              ${isDurationSelectOpened ? 'is-open' : ''}
                              ${
                                duration
                                  ? 'not-empty'
                                  : 'custom-select--not-selected'
                              }
                              ${
                                durationInputUsed && durationError
                                  ? 'is-invalid'
                                  : ''
                              }
                            `}
                          >
                            <span className="custom-select__label">
                              Сколько времени потратим
                            </span>
                            <button
                              onFocus={handleDurationInputFocus}
                              onClick={() =>
                                setIsDurationSelectOpened(
                                  (prevState) => !prevState,
                                )
                              }
                              className="custom-select__button"
                              type="button"
                              aria-label="Выберите одну из опций"
                            >
                              <span className="custom-select__text">
                                {duration}
                              </span>
                              <span className="custom-select__icon">
                                <svg width="15" height="6" aria-hidden="true">
                                  <use xlinkHref="#arrow-down"></use>
                                </svg>
                              </span>
                            </button>
                            <ul className="custom-select__list" role="listbox">
                              {Object.values(TrainingDuration).map((option) => (
                                <li
                                  onClick={() =>
                                    handleDurationInputClick(option)
                                  }
                                  key={option}
                                  className="custom-select__item"
                                >
                                  {option}
                                </li>
                              ))}
                            </ul>
                            <span className="custom-select__error">
                              {durationInputUsed && durationError}
                            </span>
                          </div>
                          <div
                            className={`
                              custom-input custom-input--with-text-right
                              ${
                                priceInputUsed && priceError
                                  ? 'custom-input--error'
                                  : ''
                              }
                            `}
                          >
                            <label>
                              <span className="custom-input__label">
                                Стоимость тренировки
                              </span>
                              <span className="custom-input__wrapper">
                                <input
                                  onFocus={handleInputFocus}
                                  onChange={handlePriceInputChange}
                                  type="number"
                                  name="price"
                                  value={price.toString()}
                                />
                                <span className="custom-input__text">₽</span>
                              </span>
                              <span className="custom-input__error">
                                {priceInputUsed && priceError}
                              </span>
                            </label>
                          </div>
                        </div>
                        <div
                          className={`
                            create-training__radio-wrapper
                            ${
                              genderInputUsed && genderError
                                ? 'custom-input--error'
                                : ''
                            }
                          `}
                        >
                          <span className="create-training__label">
                            Кому подойдет тренировка
                          </span>
                          <div className="custom-toggle-radio create-training__radio">
                            {Object.values(GenderOfTraining).map((option) => (
                              <div
                                key={option}
                                className="custom-toggle-radio__block"
                              >
                                <label>
                                  <input
                                    onChange={() =>
                                      handleGenderInputChange(option)
                                    }
                                    type="radio"
                                    name="gender"
                                    checked={option === gender}
                                  />
                                  <span className="custom-toggle-radio__icon"></span>
                                  <span className="custom-toggle-radio__label">
                                    {option
                                      .split('')
                                      .map((item, index) =>
                                        index === 0 ? item.toUpperCase() : item,
                                      )}
                                  </span>
                                </label>
                              </div>
                            ))}
                          </div>
                          <span className="custom-input__error">
                            {genderInputUsed && genderError}
                          </span>
                        </div>
                      </div>
                      <div className="create-training__block">
                        <h2 className="create-training__legend">
                          Описание тренировки
                        </h2>
                        <div className="custom-textarea create-training__textarea">
                          <label
                            className={`${
                              descriptionInputUsed && descriptionError
                                ? 'custom-input--error'
                                : ''
                            }`}
                          >
                            <textarea
                              className={`${
                                descriptionInputUsed && descriptionError
                                  ? 'custom-textarea__error'
                                  : ''
                              }`}
                              onFocus={handleDescriptionInputFocus}
                              onChange={handleDescriptionInputChange}
                              value={description}
                              name="description"
                              placeholder=" "
                            ></textarea>
                            <span className="custom-input__error">
                              {descriptionInputUsed && descriptionError}
                            </span>
                          </label>
                        </div>
                      </div>
                      <div className="create-training__block">
                        <h2 className="create-training__legend">
                          Загрузите видео-тренировку
                        </h2>
                        <div className="drag-and-drop create-training__drag-and-drop">
                          <label
                            className={`${
                              videoFileInputUsed && videoFileError
                                ? 'custom-input--error'
                                : ''
                            }`}
                          >
                            <span className="drag-and-drop__label" tabIndex={0}>
                              Загрузите сюда файлы формата MOV, AVI или MP4
                              <svg width="20" height="20" aria-hidden="true">
                                <use xlinkHref="#icon-import-video"></use>
                              </svg>
                            </span>
                            <input
                              onChange={handleVideoFileInputChange}
                              type="file"
                              name="import"
                              tabIndex={-1}
                              accept=".mov, .avi, .mp4"
                            />
                            <span className="custom-input__error">
                              {videoFileInputUsed && videoFileError}
                            </span>
                          </label>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={handleSubmitButtonClick}
                      className="btn create-training__button"
                      type="submit"
                    >
                      Опубликовать
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default CreateTrainingPage;
