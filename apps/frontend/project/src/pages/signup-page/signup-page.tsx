import BackgroundLogo from '../../components/background-logo/background-logo';

function SignUpPage() {
  return (
    <>
      <BackgroundLogo />
      <div className="popup-form popup-form--sign-up">
        <div className="popup-form__wrapper">
          <div className="popup-form__content">
            <div className="popup-form__title-wrapper">
              <h1 className="popup-form__title">Регистрация</h1>
            </div>
            <div className="popup-form__form">
              <form method="get">
                <div className="sign-up">
                  <div className="sign-up__load-photo">
                    <div className="input-load-avatar">
                      <label>
                        <input
                          className="visually-hidden"
                          type="file"
                          accept="image/png, image/jpeg"
                        />
                        <span className="input-load-avatar__btn">
                          /
                          <svg width="20" height="20" aria-hidden="true">
                            <svg
                              width="22"
                              height="22"
                              viewBox="0 0 22 22"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M12 1H8C3 1 1 3 1 8V14C1 19 3 21 8 21H14C19 21 21 19 21 14V9M17 1V7M17 7L19 5M17 7L15 5M1.67 17.95L6.6 14.64C7.39 14.11 8.53 14.17 9.24 14.78L9.57 15.07C10.35 15.74 11.61 15.74 12.39 15.07L16.55 11.5C17.33 10.83 18.59 10.83 19.37 11.5L21 12.9M10 7C10 8.10457 9.10457 9 8 9C6.89543 9 6 8.10457 6 7C6 5.89543 6.89543 5 8 5C9.10457 5 10 5.89543 10 7Z"
                                stroke="currentColor"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                            </svg>
                          </svg>
                        </span>
                      </label>
                    </div>
                    <div className="sign-up__description">
                      <h2 className="sign-up__legend">
                        Загрузите фото профиля
                      </h2>
                      <span className="sign-up__text">
                        JPG, PNG, оптимальный размер 100&times;100&nbsp;px
                      </span>
                    </div>
                  </div>
                  <div className="sign-up__data">
                    <div className="custom-input">
                      <label>
                        <span className="custom-input__label">Имя</span>
                        <span className="custom-input__wrapper">
                          <input type="text" name="name" />
                        </span>
                        /
                      </label>
                    </div>
                    <div className="custom-input">
                      <label>
                        <span className="custom-input__label">E-mail</span>
                        <span className="custom-input__wrapper">
                          <input type="email" name="email" />
                        </span>
                      </label>
                    </div>
                    <div className="custom-input">
                      <label>
                        <span className="custom-input__label">
                          Дата рождения
                        </span>
                        <span className="custom-input__wrapper">
                          <input type="date" name="birthday" max="2099-12-31" />
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
                            <svg
                              width="17"
                              height="8"
                              viewBox="0 0 17 8"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M16 1L9.82576 6.5118C9.09659 7.16273 7.90341 7.16273 7.17424 6.5118L1 1"
                                stroke="currentColor"
                                stroke-miterlimit="10"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                            </svg>
                          </svg>
                        </span>
                      </button>
                      <ul className="custom-select__list" role="listbox"></ul>
                    </div>
                    <div className="custom-input">
                      <label>
                        <span className="custom-input__label">Пароль</span>
                        <span className="custom-input__wrapper">
                          <input
                            type="password"
                            name="password"
                            autoComplete="off"
                          />
                        </span>
                      </label>
                    </div>
                    <div className="sign-up__radio">
                      <span className="sign-up__label">Пол</span>
                      <div className="custom-toggle-radio custom-toggle-radio--big">
                        <div className="custom-toggle-radio__block">
                          <label>
                            <input type="radio" name="sex" />
                            <span className="custom-toggle-radio__icon"></span>
                            <span className="custom-toggle-radio__label">
                              Мужской
                            </span>
                          </label>
                        </div>
                        <div className="custom-toggle-radio__block">
                          <label>
                            <input type="radio" name="sex" checked />
                            <span className="custom-toggle-radio__icon"></span>
                            <span className="custom-toggle-radio__label">
                              Женский
                            </span>
                          </label>
                        </div>
                        <div className="custom-toggle-radio__block">
                          <label>
                            <input type="radio" name="sex" />
                            <span className="custom-toggle-radio__icon"></span>
                            <span className="custom-toggle-radio__label">
                              Неважно
                            </span>
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
                            value="coach"
                            checked
                          />
                          <span className="role-btn__icon">
                            <svg width="12" height="13" aria-hidden="true">
                              <svg
                                width="12"
                                height="13"
                                viewBox="0 0 12 13"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M5.53704 10.5625H4.14815C3.46914 10.5625 2.91358 11.1475 2.91358 11.8625V12.025H2.2963C2.04321 12.025 1.83333 12.246 1.83333 12.5125C1.83333 12.779 2.04321 13 2.2963 13H9.7037C9.95679 13 10.1667 12.779 10.1667 12.5125C10.1667 12.246 9.95679 12.025 9.7037 12.025H9.08642V11.8625C9.08642 11.1475 8.53086 10.5625 7.85185 10.5625H6.46296V9.074C6.30864 9.0935 6.15432 9.1 6 9.1C5.84568 9.1 5.69136 9.0935 5.53704 9.074V10.5625Z"
                                  fill="currentColor"
                                />
                                <path
                                  d="M10 6.266C10.4074 6.1035 10.7654 5.837 11.0494 5.538C11.6235 4.8685 12 4.069 12 3.133C12 2.197 11.3025 1.4625 10.4136 1.4625H10.0679C9.66667 0.598 8.82716 0 7.85185 0H4.14815C3.17284 0 2.33333 0.598 1.9321 1.4625H1.58642C0.697531 1.4625 0 2.197 0 3.133C0 4.069 0.376543 4.8685 0.950617 5.538C1.23457 5.837 1.59259 6.1035 2 6.266C2.64198 7.93 4.18519 9.1 6 9.1C7.81482 9.1 9.35802 7.93 10 6.266ZM7.75309 4.1925L7.37037 4.6865C7.30864 4.758 7.26543 4.901 7.27161 4.9985L7.30864 5.6355C7.33333 6.0255 7.0679 6.227 6.72222 6.084L6.16049 5.85C6.07407 5.8175 5.92593 5.8175 5.83951 5.85L5.27778 6.084C4.9321 6.227 4.66667 6.0255 4.69136 5.6355L4.7284 4.9985C4.73457 4.901 4.69136 4.758 4.62963 4.6865L4.24691 4.1925C4.00617 3.8935 4.11111 3.562 4.46914 3.4645L5.05556 3.3085C5.14815 3.2825 5.25926 3.1915 5.30864 3.107L5.6358 2.574C5.83951 2.2425 6.16049 2.2425 6.3642 2.574L6.69136 3.107C6.74074 3.1915 6.85185 3.2825 6.94445 3.3085L7.53086 3.4645C7.88889 3.562 7.99383 3.8935 7.75309 4.1925Z"
                                  fill="currentColor"
                                />
                              </svg>
                            </svg>
                          </span>
                          <span className="role-btn__btn">
                            Я хочу тренировать
                          </span>
                        </label>
                      </div>
                      <div className="role-btn">
                        <label>
                          <input
                            className="visually-hidden"
                            type="radio"
                            name="role"
                            value="sportsman"
                          />
                          <span className="role-btn__icon">
                            <svg width="12" height="13" aria-hidden="true">
                              <svg
                                width="14"
                                height="8"
                                viewBox="0 0 14 8"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M10.2231 0C9.15911 0 7.88978 0.385185 7.88978 2.22222V5.77778C7.88978 7.61482 9.15911 8 10.2231 8C11.2871 8 12.5564 7.61482 12.5564 5.77778V2.22222C12.5564 0.385185 11.2871 0 10.2231 0Z"
                                  fill="currentColor"
                                />
                                <path
                                  d="M3.77689 0C2.71289 0 1.44356 0.385185 1.44356 2.22222V5.77778C1.44356 7.61482 2.71289 8 3.77689 8C4.84089 8 6.11022 7.61482 6.11022 5.77778V2.22222C6.11022 0.385185 4.84089 0 3.77689 0Z"
                                  fill="currentColor"
                                />
                                <path
                                  d="M7.88978 3.55556H6.11022V4.44444H7.88978V3.55556Z"
                                  fill="currentColor"
                                />
                                <path
                                  d="M13.5333 5.92593C13.2782 5.92593 13.0667 5.72444 13.0667 5.48148V2.51852C13.0667 2.27556 13.2782 2.07407 13.5333 2.07407C13.7884 2.07407 14 2.27556 14 2.51852V5.48148C14 5.72444 13.7884 5.92593 13.5333 5.92593Z"
                                  fill="currentColor"
                                />
                                <path
                                  d="M0.466667 5.92593C0.211556 5.92593 0 5.72444 0 5.48148V2.51852C0 2.27556 0.211556 2.07407 0.466667 2.07407C0.721778 2.07407 0.933333 2.27556 0.933333 2.51852V5.48148C0.933333 5.72444 0.721778 5.92593 0.466667 5.92593Z"
                                  fill="currentColor"
                                />
                              </svg>
                            </svg>
                          </span>
                          <span className="role-btn__btn">
                            Я хочу тренироваться
                          </span>
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="sign-up__checkbox">
                    <label>
                      <input
                        type="checkbox"
                        value="user-agreement"
                        name="user-agreement"
                        checked
                      />
                      <span className="sign-up__checkbox-icon">
                        <svg width="9" height="6" aria-hidden="true">
                          <svg
                            width="11"
                            height="8"
                            viewBox="0 0 11 8"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M1 4L3.99647 7L10 1"
                              stroke="currentColor"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                          </svg>
                        </svg>
                      </span>
                      <span className="sign-up__checkbox-label">
                        Я соглашаюсь с <span>политикой конфиденциальности</span>{' '}
                        компании
                      </span>
                    </label>
                  </div>
                  <button className="btn sign-up__button" type="submit">
                    Продолжить
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignUpPage;
