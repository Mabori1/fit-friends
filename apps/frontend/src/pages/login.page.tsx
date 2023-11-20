import { useAppDispatch } from '../redux/store';
import { loginUserAction } from '../redux/authSlice/apiAuthActions';
import { z } from 'zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { UserPasswordLength } from '@fit-friends/types';

const formSchema = z.object({
  email: z.string().email('Некорректный email'),
  password: z
    .string()
    .min(UserPasswordLength.Min, 'Пароль слишком короткий')
    .max(UserPasswordLength.Max, 'Пароль слишком длинный'),
});

type FormSchema = z.infer<typeof formSchema>;

function LoginPage(): JSX.Element {
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    reset,
    setFocus,
    formState: { isDirty, isSubmitting, errors },
  } = useForm<FormSchema>({ resolver: zodResolver(formSchema) });

  const onSubmit: SubmitHandler<FormSchema> = (data) => {
    dispatch(loginUserAction(data));
    reset();
  };

  useEffect(() => {
    setFocus('email');
  }, []);

  return (
    <main>
      <div className="background-logo">
        <svg
          className="background-logo__logo"
          width="750"
          height="284"
          aria-hidden="true"
        >
          <use xlinkHref="#logo-big"></use>
        </svg>
        <svg
          className="background-logo__icon"
          width="343"
          height="343"
          aria-hidden="true"
        >
          <use xlinkHref="#icon-logotype"></use>
        </svg>
      </div>
      <div className="popup-form popup-form--sign-in">
        <div className="popup-form__wrapper">
          <div className="popup-form__content">
            <div className="popup-form__title-wrapper">
              <h1 className="popup-form__title">Вход</h1>
            </div>
            <div className="popup-form__form">
              <form method="get" onSubmit={handleSubmit(onSubmit)}>
                <div className="sign-in">
                  <div className="custom-input sign-in__input">
                    <label>
                      <span className="custom-input__label">E-mail</span>
                      <span className="custom-input__wrapper">
                        <input
                          {...register('email')}
                          type="email"
                          name="email"
                          id="email"
                          className="input"
                          placeholder="name@mail.com"
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
                  <div className="custom-input sign-in__input">
                    <label>
                      <span className="custom-input__label">Пароль</span>
                      <span className="custom-input__wrapper">
                        <input
                          {...register('password')}
                          type="password"
                          id="password"
                          placeholder="Не менее 6 символов"
                          className="input"
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
                  <button
                    className="btn sign-in__button"
                    type="submit"
                    disabled={!isDirty || isSubmitting}
                  >
                    Продолжить
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default LoginPage;
