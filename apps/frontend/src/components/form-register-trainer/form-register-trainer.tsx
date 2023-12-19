/* eslint-disable @typescript-eslint/no-explicit-any */
import { z } from 'zod';
import { useForm, SubmitHandler } from 'react-hook-form';
import {
  LEVEL_TRAINING_ZOD,
  TYPE_TRAINING_ZOD,
  CERTIFICATE_FILE_TYPES,
} from '../../constants';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowCheck, IconImport } from '../../helper/svg-const';
import BackgroundLogo from '../background-logo/background-logo';
import { upFirstWord } from '../../helper/utils';
import { ChangeEvent, useEffect, useState } from 'react';
import {
  MAXIMUM_TRAINING_TYPES_CHOICE,
  TrainerMeritLength,
} from '@fit-friends/types';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import {
  updateUserAction,
  uploadCertificateAction,
} from '../../redux/userSlice/apiUserActions';
import { useNavigate } from 'react-router-dom';
import { AppRoute } from '../../constants';
import { getIsAuth, getUser } from '../../redux/userSlice/selectors';

const formSchema = z.object({
  typesOfTraining: z
    .array(z.enum(TYPE_TRAINING_ZOD))
    .min(1, 'Должен быть выбран хотя бы один тип тренировок')
    .max(MAXIMUM_TRAINING_TYPES_CHOICE, 'Не более трех типов тренировок'),
  level: z.enum(LEVEL_TRAINING_ZOD),
  merits: z
    .string()
    .min(
      TrainerMeritLength.Min,
      `Минимальное значение ${TrainerMeritLength.Min}`,
    )
    .max(
      TrainerMeritLength.Max,
      `Максимальное значение ${TrainerMeritLength.Max}`,
    ),
  isPersonalTraining: z.boolean(),
});

type FormSchema = z.infer<typeof formSchema>;

function FormRegisterTrainer() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector(getUser);
  const isAuth = useAppSelector(getIsAuth);

  useEffect(() => {
    if (!isAuth) {
      navigate(AppRoute.Intro);
    }
    if (!user?.name) {
      navigate(AppRoute.Register);
    }
  }, [user, isAuth, navigate]);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { isSubmitting, errors },
  } = useForm<FormSchema>({ resolver: zodResolver(formSchema) });

  const [certificate, setCertificate] = useState<File | null>(null);
  const [certificateInputUsed, setCertificateInputUsed] = useState(false);
  const [certificateError, setCertificateError] = useState(
    'Должен быть хотя бы один документ',
  );
  const [certificateName, setCertificateName] = useState([
    'Загрузите сюда файлы формата PDF, JPG или PNG',
  ]);

  const onSubmit: SubmitHandler<FormSchema> = async (data) => {
    if (!certificateError && certificateInputUsed) {
      const updateData = {
        level: data.level,
        typesOfTraining: data.typesOfTraining,
        trainer: {
          merits: data.merits,
          isPersonalTraining: data.isPersonalTraining,
          certificate: [],
        },
      };

      const res = await dispatch(updateUserAction(updateData));
      if (certificate && updateUserAction.fulfilled.match(res)) {
        const formData = new FormData();
        formData.append('file', certificate);
        const dataCertificate = await dispatch(
          uploadCertificateAction(formData),
        );
        if (uploadCertificateAction.fulfilled.match(dataCertificate)) {
          const resCertificate = await dispatch(
            updateUserAction({
              trainer: { certificate: [dataCertificate.payload?.path] },
            }),
          );
          if (updateUserAction.fulfilled.match(resCertificate)) {
            navigate(AppRoute.TrainerRoom);
          }
        }
      }
      reset();
    }
    setCertificateInputUsed(true);
  };

  const handleCertificateFileInputChange = (
    evt: ChangeEvent<HTMLInputElement>,
  ) => {
    const file = evt.currentTarget.files && evt.currentTarget.files[0];
    const fileName = file ? file.name.toLowerCase() : '';
    const matches = CERTIFICATE_FILE_TYPES.some((fileType) =>
      fileName.endsWith(fileType),
    );
    setCertificateName([fileName]);

    if (matches && file) {
      setCertificate(file);

      setCertificateError('');
    } else if (!matches && file) {
      setCertificateError('Загрузите сюда файлы формата PDF, JPG или PNG');
    } else {
      setCertificateError('Добавьте подтверждающий документ');
    }
    setCertificateInputUsed(true);
  };

  return (
    <>
      <BackgroundLogo />
      <div className="popup-form popup-form--questionnaire-coach">
        <div className="popup-form__wrapper">
          <div className="popup-form__content">
            <div className="popup-form__form">
              <form method="post" onSubmit={handleSubmit(onSubmit)}>
                <div className="questionnaire-coach">
                  <h1 className="visually-hidden">Опросник</h1>
                  <div className="questionnaire-coach__wrapper">
                    <div className="questionnaire-coach__block">
                      <span className="questionnaire-coach__legend">
                        Ваша специализация (тип) тренировок
                      </span>
                      <div className="specialization-checkbox questionnaire-coach__specializations">
                        {TYPE_TRAINING_ZOD.map((type) => (
                          <div key={type} className="btn-checkbox">
                            <label>
                              <input
                                {...register('typesOfTraining')}
                                className="visually-hidden"
                                type="checkbox"
                                name="typesOfTraining"
                                value={type}
                                aria-invalid={
                                  errors.typesOfTraining ? 'true' : 'false'
                                }
                              />
                              <span className="btn-checkbox__btn">
                                {upFirstWord(type)}
                              </span>
                            </label>
                          </div>
                        ))}
                        {errors.typesOfTraining && (
                          <span role="alert" className="error">
                            {errors.typesOfTraining?.message}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="questionnaire-coach__block">
                      <span className="questionnaire-coach__legend">
                        Ваш уровень
                      </span>
                      <div className="custom-toggle-radio custom-toggle-radio--big questionnaire-coach__radio">
                        {LEVEL_TRAINING_ZOD.map((level) => (
                          <div
                            key={level}
                            className="custom-toggle-radio__block"
                          >
                            <label>
                              <input
                                {...register('level')}
                                disabled={isSubmitting}
                                type="radio"
                                name="level"
                                value={level}
                              />
                              <span className="custom-toggle-radio__icon"></span>
                              <span className="custom-toggle-radio__label">
                                {upFirstWord(level)}
                              </span>
                            </label>
                          </div>
                        ))}
                        {errors.level && (
                          <span role="alert" className="error">
                            {errors.level?.message}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="questionnaire-coach__block">
                      <span className="questionnaire-coach__legend">
                        Ваши дипломы и сертификаты
                      </span>
                      <div className="drag-and-drop questionnaire-coach__drag-and-drop">
                        <label
                          className={`${
                            certificateInputUsed && certificateError
                              ? 'custom-input--error'
                              : ''
                          }`}
                        >
                          <span className="drag-and-drop__label" tabIndex={0}>
                            {certificateName}
                            <svg width="20" height="20" aria-hidden="true">
                              <IconImport />
                            </svg>
                          </span>
                          <input
                            onChange={handleCertificateFileInputChange}
                            type="file"
                            name="import"
                            tabIndex={-1}
                            accept=".pdf, .jpg, .png"
                            disabled={isSubmitting}
                            multiple
                          />
                          <span className="custom-input__error">
                            {certificateError}
                          </span>
                        </label>
                      </div>
                    </div>
                    <div className="questionnaire-coach__block">
                      <span className="questionnaire-coach__legend">
                        Расскажите о своём опыте, который мы сможем проверить
                      </span>
                      <div className="custom-textarea questionnaire-coach__textarea">
                        <label>
                          <textarea
                            {...register('merits')}
                            disabled={isSubmitting}
                            aria-invalid={errors.merits ? 'true' : 'false'}
                            name="merits"
                            placeholder=" "
                          ></textarea>
                        </label>
                        {errors.merits && (
                          <span role="alert" className="error">
                            {errors.merits?.message}
                          </span>
                        )}
                      </div>
                      <div className="questionnaire-coach__checkbox">
                        <label>
                          <input
                            {...register('isPersonalTraining')}
                            type="checkbox"
                            name="isPersonalTraining"
                            disabled={isSubmitting}
                            aria-invalid={
                              errors.isPersonalTraining ? 'true' : 'false'
                            }
                          />
                          <span className="questionnaire-coach__checkbox-icon">
                            <svg width="9" height="6" aria-hidden="true">
                              <ArrowCheck />
                            </svg>
                          </span>
                          <span className="questionnaire-coach__checkbox-label">
                            Хочу дополнительно индивидуально тренировать
                          </span>
                        </label>
                        {errors.isPersonalTraining && (
                          <span role="alert" className="error">
                            {errors.isPersonalTraining?.message}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <button
                    className="btn questionnaire-coach__button"
                    type="submit"
                    disabled={isSubmitting}
                  >
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

export default FormRegisterTrainer;
