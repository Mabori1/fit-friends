import { z } from 'zod';
import {
  ArrowCheck,
  ArrowDown,
  IconCup,
  IconImport,
  IconWeight,
} from '../../helper/svg-const';
import { UserNameLength, UserPasswordLength } from '@fit-friends/types';
import { GENDER_ZOD, LOCATIONS_ZOD, ROLE_ZOD } from '../../const';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';

const formSchema = z.object({
  avatar: z.string().optional(),
  name: z
    .string()
    .min(UserNameLength.Min, 'Имя слишком короткое')
    .max(UserNameLength.Max, 'Имя слишком длинное'),
  email: z.string().email('Некорректный email'),
  birthDay: z.coerce
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
    errorMap: () => ({
      message: 'Примите политику конфиденциальности компании',
    }),
  }),
});

type FormSchema = z.infer<typeof formSchema>;

function FormRegister() {
  const {
    register,
    handleSubmit,
    reset,
    setFocus,
    formState: { isDirty, isSubmitting, errors },
  } = useForm<FormSchema>({ resolver: zodResolver(formSchema) });

  const onSubmit: SubmitHandler<FormSchema> = (data) => {
    console.log(data);
    reset();
  };

  useEffect(() => {
    setFocus('name');
  }, [setFocus]);

  return (
    <form method="get" onSubmit={handleSubmit(onSubmit)}>
      <div className="sign-up">
        <div className="sign-up__load-photo">
          <div className="input-load-avatar">
            <label>
              <input
                {...register('avatar')}
                className="visually-hidden"
                type="file"
                accept="image/png, image/jpeg"
                aria-invalid={errors.avatar ? 'true' : 'false'}
              />
              <span className="input-load-avatar__btn">
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
          </div>
        </div>
        <div className="sign-up__data">
          <div className="custom-input">
            <label>
              <span className="custom-input__label">Имя</span>
              <span className="custom-input__wrapper">
                <input
                  {...register('name')}
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
                  {...register('birthDay')}
                  type="date"
                  name="birthday"
                  max="2023-11-21"
                  aria-invalid={errors.birthDay ? 'true' : 'false'}
                />
                {errors.birthDay && (
                  <span role="alert" className="error">
                    {errors.birthDay?.message}
                  </span>
                )}
              </span>
            </label>
          </div>
          <div className="custom-select custom-select--not-selected">
            <span className="custom-select__label">Ваша локация</span>
            <button
              className="custom-select__button"
              type="button"
              aria-label="Выберите одну из опций"
            >
              <span className="custom-select__text"></span>
              <span className="custom-select__icon">
                <svg width="15" height="6" aria-hidden="true">
                  <ArrowDown />
                </svg>
              </span>
            </button>

            <ul className="custom-select__list" role="listbox">
              {LOCATIONS_ZOD.map((station) => (
                <li key={station} className="custom-select__item">
                  <span className="custom-input__wrapper">
                    <input
                      {...register('location')}
                      placeholder="Ваша станция метро"
                      type="text"
                      name="location"
                      value={station}
                      aria-invalid={errors.location ? 'true' : 'false'}
                    />
                    {errors.location && (
                      <span role="alert" className="error">
                        {errors.location?.message}
                      </span>
                    )}
                  </span>
                  {station}
                </li>
              ))}
            </ul>
          </div>
          <div className="custom-input">
            <label>
              <span className="custom-input__label">Пароль</span>
              <span className="custom-input__wrapper">
                <input
                  {...register('password')}
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
              <div className="custom-toggle-radio__block">
                <label>
                  <input {...register('gender')} type="radio" name="sex" />
                  <span className="custom-toggle-radio__icon"></span>
                  <span className="custom-toggle-radio__label">Мужской</span>
                </label>
              </div>
              <div className="custom-toggle-radio__block">
                <label>
                  <input type="radio" name="sex" checked />
                  <span className="custom-toggle-radio__icon"></span>
                  <span className="custom-toggle-radio__label">Женский</span>
                </label>
              </div>
              <div className="custom-toggle-radio__block">
                <label>
                  <input type="radio" name="sex" />
                  <span className="custom-toggle-radio__icon"></span>
                  <span className="custom-toggle-radio__label">Неважно</span>
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="sign-up__role">
          <h2 className="sign-up__legend">Выберите роль</h2>
          <div className="role-selector sign-up__role-selector">
            <div className="role-btn">
              <label>
                <input
                  className="visually-hidden"
                  type="radio"
                  name="role"
                  value="тренер"
                  checked
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
              id="terms"
              aria-describedby="terms"
              type="checkbox"
              value="user-agreement"
              name="user-agreement"
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
          {errors.terms && (
            <span className="error">{errors.terms?.message}</span>
          )}
        </div>
        <button
          className="btn sign-up__button"
          type="submit"
          disabled={!isDirty || isSubmitting}
        >
          Продолжить
        </button>
      </div>
    </form>
  );
}

export default FormRegister;
