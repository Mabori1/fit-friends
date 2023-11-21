import BackgroundLogo from '../../components/background-logo/background-logo';
import FormRegister from '../../components/form-register/form-register';

function RegisterPage() {
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
              <FormRegister />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default RegisterPage;
