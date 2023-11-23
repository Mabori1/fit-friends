import { z } from 'zod';
import { useForm, SubmitHandler } from 'react-hook-form';
import {
  LEVEL_TRAINING_ZOD,
  TYPE_TRAINING_ZOD,
  CERTIFICATE_FILE_TYPES,
} from '../../const';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowCheck, IconImport } from '../../helper/svg-const';
import BackgroundLogo from '../background-logo/background-logo';
import { upFirstWord } from '../../helper/utils';
import { ChangeEvent, useState } from 'react';
import {
  MAXIMUM_TRAINING_TYPES_CHOICE,
  UserDescriptionLength,
} from '@fit-friends/types';

const formSchema = z.object({
  typesOfTraining: z
    .array(z.enum(TYPE_TRAINING_ZOD))
    .max(MAXIMUM_TRAINING_TYPES_CHOICE, 'Не более трех типов тренировок'),
  level: z.enum(LEVEL_TRAINING_ZOD),
  certificate: z.any(),
  description: z
    .string()
    .min(
      UserDescriptionLength.Min,
      `Минимальное значение ${UserDescriptionLength.Min}`,
    )
    .max(
      UserDescriptionLength.Max,
      `Максимальное значение ${UserDescriptionLength.Max}`,
    ),
  isPersonalTraining: z.boolean(),
});

type FormSchema = z.infer<typeof formSchema>;

function FormRegisgerTrainer() {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { isSubmitting, errors },
  } = useForm<FormSchema>({ resolver: zodResolver(formSchema) });

  const [certificate, setCertificate] = useState<File | null>(null);

  const onSubmit: SubmitHandler<FormSchema> = (data) => {
    dispatch(updateUserAction({ ...data, certificate }));
    reset();
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
      setCertificate(file);
    }
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
                        <label>
                          <span className="drag-and-drop__label" tabIndex={0}>
                            Загрузите сюда файлы формата PDF, JPG или PNG
                            <svg width="20" height="20" aria-hidden="true">
                              <IconImport />
                            </svg>
                          </span>
                          <input
                            {...register('certificate')}
                            onChange={handleCertificateFileInputChange}
                            type="file"
                            name="certificate"
                            tabIndex={-1}
                            accept=".pdf, .jpg, .png"
                            disabled={isSubmitting}
                            aria-invalid={errors.certificate ? 'true' : 'false'}
                            multiple
                          />
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
                            {...register('description')}
                            disabled={isSubmitting}
                            aria-invalid={errors.description ? 'true' : 'false'}
                            name="description"
                            placeholder=" "
                          ></textarea>
                        </label>
                        {errors.description && (
                          <span role="alert" className="error">
                            {errors.description?.message}
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
                  <pre>{JSON.stringify(watch(), null, 2)}</pre>
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

export default FormRegisgerTrainer;
