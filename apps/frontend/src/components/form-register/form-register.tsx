import { z } from 'zod';
import {
  ArrowCheck,
  ArrowDown,
  IconCup,
  IconImport,
  IconWeight,
} from '../../helper/svg-const';
import {
  UserNameLength,
  UserPasswordLength,
  UserRole,
} from '@fit-friends/types';
import {
  GENDER_ZOD,
  LOCATIONS_ZOD,
  ROLE_ZOD,
  AVATAR_FILE_TYPES,
  AVATAR_MAX_SIZE,
  AppRoute,
} from '../../const';
import { useForm, SubmitHandler } from 'react-hook-form';
import { ChangeEvent, useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { registerUserAction } from '../../redux/authSlice/apiAuthActions';
import { getIsAuth, getRole } from '../../redux/authSlice/selectors';
import { useNavigate } from 'react-router-dom';
import { upFirstWord } from '../../helper/utils';

const formSchema = z.object({
  avatar: z.object({}),
  name: z
    .string()
    .min(UserNameLength.Min, 'Имя слишком короткое')
    .max(UserNameLength.Max, 'Имя слишком длинное'),
  email: z.string().email('Некорректный email'),
  birthDate: z.coerce
    .date()
    .min(new Date('1900-01-01'), { message: 'Слишком старый' })
    .max(new Date(), {
      message: 'Слишком молодой',
    }),
  location: z.enum(LOCATIONS_ZOD),
  password: z
    .string()
    .min(UserPasswordLength.Min, 'Пароль слишком короткий')
    .max(UserPasswordLength.Max, 'Пароль слишком длинный'),
  gender: z.enum(GENDER_ZOD),
  role: z.enum(ROLE_ZOD),
  terms: z.literal(true, {
    errorMap: () => ({ message: 'Согласие обязательно' }),
  }),
});

type FormSchema = z.infer<typeof formSchema>;

function FormRegister() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    reset,
    setFocus,
    watch,
    formState: { isDirty, isSubmitting, errors },
  } = useForm<FormSchema>({ resolver: zodResolver(formSchema) });

  const isAuth = useAppSelector(getIsAuth);
  const role = useAppSelector(getRole);

  const onSubmit: SubmitHandler<FormSchema> = (data) => {
    dispatch(
      registerUserAction({
        ...data,
        avatar,
      }),
    );
    reset();
  };

  useEffect(() => {
    if (isAuth) {
      switch (role) {
        case UserRole.Trainer:
          navigate(AppRoute.RegisterTrainer);
          break;
        case UserRole.Client:
          navigate(AppRoute.RegisterClient);
          break;
      }
    }
  }, [isAuth, role, navigate]);

  useEffect(() => {
    setFocus('name');
  }, [setFocus]);

  const [isSelectOpened, setIsSelectOpened] = useState(false);
  const [avatar, setAvatar] = useState('');
  const [avatarError, setAvatarError] = useState('');

  const handleAvatarFileInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const file = evt.currentTarget.files && evt.currentTarget.files[0];
    const fileName = file ? file.name.toLowerCase() : '';
    const matches = AVATAR_FILE_TYPES.some((fileType) =>
      fileName.endsWith(fileType),
    );

    if (matches && file) {
      setAvatar(URL.createObjectURL(file));

      setAvatarError('');
    } else if (!matches && file) {
      setAvatarError('Загрузите сюда файлы формата PDF, JPG или PNG');
    } else {
      setAvatarError('Добавьте подтверждающий документ');
    }

    if (file?.size && file?.size > AVATAR_MAX_SIZE) {
      setAvatarError(
        `Максимальный размер файла ${AVATAR_MAX_SIZE * 1e-6} Мбайт`,
      );
    }
  };

  return (
    <form method="post" onSubmit={handleSubmit(onSubmit)}>
      <div className="sign-up">
        <div className="sign-up__load-photo">
          <div className="input-load-avatar">
            <label>
              <input
                {...register('avatar')}
                onChange={handleAvatarFileInputChange}
                disabled={isSubmitting}
                className="visually-hidden"
                type="file"
                name="avatar"
                accept="image/png, image/jpeg"
                aria-invalid={errors.avatar ? 'true' : 'false'}
              />
              <span className="input-load-avatar__btn">
                {avatar && (
                  <img
                    src={avatar}
                    width="334"
                    height="573"
                    alt="user avatar"
                  />
                )}
                <svg width="20" height="20" aria-hidden="true">
                  <IconImport />
                </svg>
              </span>
            </label>
          </div>
          <div className="sign-up__description">
            <h2 className="sign-up__legend">Загрузите фото профиля</h2>
            <span className="sign-up__text">
              JPG, PNG, оптимальный размер 100&times;100&nbsp;px
            </span>
            {errors.avatar && (
              <span role="alert" className="error">
                {errors.avatar?.message}
              </span>
            )}
            <span className="error">{avatarError}</span>
          </div>
        </div>
        <div className="sign-up__data">
          <div className="custom-input">
            <label>
              <span className="custom-input__label">Имя</span>
              <span className="custom-input__wrapper">
                <input
                  {...register('name')}
                  disabled={isSubmitting}
                  type="text"
                  name="name"
                  placeholder="Ваше имя"
                  aria-invalid={errors.name ? 'true' : 'false'}
                />
                {errors.name && (
                  <span role="alert" className="error">
                    {errors.name?.message}
                  </span>
                )}
              </span>
            </label>
          </div>
          <div className="custom-input">
            <label>
              <span className="custom-input__label">E-mail</span>
              <span className="custom-input__wrapper">
                <input
                  {...register('email')}
                  disabled={isSubmitting}
                  type="email"
                  name="email"
                  placeholder="email@mail.ru"
                  aria-invalid={errors.email ? 'true' : 'false'}
                />
                {errors.email && (
                  <span role="alert" className="error">
                    {errors.email?.message}
                  </span>
                )}
              </span>
            </label>
          </div>
          <div className="custom-input">
            <label>
              <span className="custom-input__label">Дата рождения</span>
              <span className="custom-input__wrapper">
                <input
                  {...register('birthDate')}
                  disabled={isSubmitting}
                  type="date"
                  name="birthDate"
                  max="2023-11-21"
                  aria-invalid={errors.birthDate ? 'true' : 'false'}
                />
                {errors.birthDate && (
                  <span role="alert" className="error">
                    {errors.birthDate?.message}
                  </span>
                )}
              </span>
            </label>
          </div>
          <div
            className={`
                        custom-select
                        ${watch('location') ? 'not-empty' : ''}
                        ${
                          isSelectOpened
                            ? 'is-open'
                            : 'custom-select--not-selected'
                        }
                      `}
          >
            <span className="custom-select__label">Ваша локация</span>
            <button
              onClick={() => setIsSelectOpened((prevState) => !prevState)}
              className="custom-select__button"
              type="button"
              aria-label="Выберите одну из опций"
            >
              <span className="custom-select__text">{watch('location')}</span>
              <span className="custom-select__icon">
                <svg width="15" height="6" aria-hidden="true">
                  <ArrowDown />
                </svg>
              </span>
            </button>
            <ul
              className="custom-select__list"
              role="listbox"
              onClick={() => setIsSelectOpened((prevState) => !prevState)}
            >
              {LOCATIONS_ZOD.map((station, i) => (
                <li
                  key={`location-${i} ${station}`}
                  className="custom-select__item"
                >
                  <label htmlFor={station} className="custom-label">
                    <input
                      {...register('location')}
                      disabled={isSubmitting}
                      hidden
                      type="radio"
                      id={station}
                      name="location"
                      value={station}
                      onClick={() =>
                        setIsSelectOpened((prevState) => !prevState)
                      }
                    />
                    {station}
                  </label>
                </li>
              ))}
            </ul>
            {errors.location && (
              <span role="alert" className="error">
                {errors.location?.message}
              </span>
            )}
          </div>
          <div className="custom-input">
            <label>
              <span className="custom-input__label">Пароль</span>
              <span className="custom-input__wrapper">
                <input
                  {...register('password')}
                  disabled={isSubmitting}
                  type="password"
                  name="password"
                  placeholder="Не менее 6 символов"
                  autoComplete="off"
                  aria-invalid={errors.password ? 'true' : 'false'}
                />
                {errors.password && (
                  <span role="alert" className="error">
                    {errors.password?.message}
                  </span>
                )}
              </span>
            </label>
          </div>
          <div className="sign-up__radio">
            <span className="sign-up__label">Пол</span>
            <div className="custom-toggle-radio custom-toggle-radio--big">
              {GENDER_ZOD.map((gender) => (
                <div key={gender} className="custom-toggle-radio__block">
                  <label>
                    <input
                      {...register('gender')}
                      disabled={isSubmitting}
                      type="radio"
                      name="gender"
                      value={gender}
                    />
                    <span className="custom-toggle-radio__icon"></span>
                    <span className="custom-toggle-radio__label">
                      {upFirstWord(gender)}
                    </span>
                  </label>
                </div>
              ))}
            </div>
            {errors.gender && (
              <span role="alert" className="error">
                {errors.gender?.message}
              </span>
            )}
          </div>
        </div>
        <div className="sign-up__role">
          <h2 className="sign-up__legend">Выберите роль</h2>
          <div className="role-selector sign-up__role-selector">
            <div className="role-btn">
              <label>
                <input
                  {...register('role')}
                  disabled={isSubmitting}
                  className="visually-hidden"
                  type="radio"
                  name="role"
                  value="тренер"
                />
                <span className="role-btn__icon">
                  <svg width="12" height="13" aria-hidden="true">
                    <IconCup />
                  </svg>
                </span>
                <span className="role-btn__btn">Я хочу тренировать</span>
              </label>
            </div>
            <div className="role-btn">
              <label>
                <input
                  {...register('role')}
                  disabled={isSubmitting}
                  className="visually-hidden"
                  type="radio"
                  name="role"
                  value="пользователь"
                />
                <span className="role-btn__icon">
                  <svg width="12" height="13" aria-hidden="true">
                    <IconWeight />
                  </svg>
                </span>
                <span className="role-btn__btn">Я хочу тренироваться</span>
              </label>
            </div>
          </div>
        </div>
        <div className="sign-up__checkbox">
          <label>
            <input
              {...register('terms')}
              disabled={isSubmitting}
              id="terms"
              aria-describedby="terms"
              type="checkbox"
              name="terms"
              aria-invalid={errors.terms ? 'true' : 'false'}
            />
            <span className="sign-up__checkbox-icon">
              <svg width="9" height="6" aria-hidden="true">
                <ArrowCheck />
              </svg>
            </span>
            <span className="sign-up__checkbox-label">
              Я соглашаюсь с <span>политикой конфиденциальности</span> компании
            </span>
          </label>
        </div>
        {errors.terms && <span className="error">{errors.terms?.message}</span>}
        <pre>{JSON.stringify(watch(), null, 2)}</pre>
        <button
          className="btn sign-up__button"
          type="submit"
          disabled={!isDirty || isSubmitting || !watch('terms') || !errors}
        >
          Продолжить
        </button>
      </div>
    </form>
  );
}

export default FormRegister;
