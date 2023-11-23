import { z } from 'zod';
import { useForm, SubmitHandler } from 'react-hook-form';
import {
  DURATION_TRAINING_ZOD,
  LEVEL_TRAINING_ZOD,
  TYPE_TRAINING_ZOD,
} from '../../const';
import { CaloriesOfDay } from '@fit-friends/types';
import { upFirstWord } from '../../helper/utils';
import { zodResolver } from '@hookform/resolvers/zod';

const formSchema = z.object({
  typesOfTraining: z.array(z.enum(TYPE_TRAINING_ZOD)),
  timeOfTraining: z.enum(DURATION_TRAINING_ZOD),
  level: z.enum(LEVEL_TRAINING_ZOD),
  caloryLosingPlanTotal: z
    .number()
    .min(CaloriesOfDay.Min, `Минимальное значение ${CaloriesOfDay.Min}`)
    .max(CaloriesOfDay.Max, `Максимальное значение ${CaloriesOfDay.Max}`),
  caloryLosingPlanDaily: z
    .number()
    .min(CaloriesOfDay.Min, `Минимальное значение ${CaloriesOfDay.Min}`)
    .max(CaloriesOfDay.Max, `Максимальное значение ${CaloriesOfDay.Max}`),
});

type FormSchema = z.infer<typeof formSchema>;

function FormRegisgerClient() {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { isDirty, isSubmitting, errors },
  } = useForm<FormSchema>({ resolver: zodResolver(formSchema) });

  const onSubmit: SubmitHandler<FormSchema> = (data) => {
    console.log(data);
    reset();
  };

  return (
    <div className="popup-form popup-form--questionnaire-user">
      <div className="popup-form__wrapper">
        <div className="popup-form__content">
          <div className="popup-form__form">
            <form method="post" onSubmit={handleSubmit(onSubmit)}>
              <div className="questionnaire-user">
                <h1 className="visually-hidden">Опросник</h1>
                <div className="questionnaire-user__wrapper">
                  <div className="questionnaire-user__block">
                    <span className="questionnaire-user__legend">
                      Ваша специализация (тип) тренировок
                    </span>
                    <div className="specialization-checkbox questionnaire-user__specializations">
                      {TYPE_TRAINING_ZOD.map((type) => (
                        <div className="btn-checkbox">
                          <label>
                            <input
                              {...register('typesOfTraining')}
                              disabled={isSubmitting}
                              className="visually-hidden"
                              type="checkbox"
                              name="specialisation"
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
                  <div className="questionnaire-user__block">
                    <span className="questionnaire-user__legend">
                      Сколько времени вы готовы уделять на тренировку в день
                    </span>
                    <div className="custom-toggle-radio custom-toggle-radio--big questionnaire-user__radio">
                      {DURATION_TRAINING_ZOD.map((duration) => (
                        <div className="custom-toggle-radio__block">
                          <label>
                            <input
                              {...register('timeOfTraining')}
                              disabled={isSubmitting}
                              type="radio"
                              name="time"
                              value={duration}
                            />
                            <span className="custom-toggle-radio__icon"></span>
                            <span className="custom-toggle-radio__label">
                              {duration}
                            </span>
                            /
                          </label>
                        </div>
                      ))}
                      {errors.timeOfTraining && (
                        <span role="alert" className="error">
                          {errors.timeOfTraining?.message}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="questionnaire-user__block">
                    <span className="questionnaire-user__legend">
                      Ваш уровень
                    </span>
                    <div className="custom-toggle-radio custom-toggle-radio--big questionnaire-user__radio">
                      {LEVEL_TRAINING_ZOD.map((level) => (
                        <div className="custom-toggle-radio__block">
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
                  <div className="questionnaire-user__block">
                    <div className="questionnaire-user__calories-lose">
                      <span className="questionnaire-user__legend">
                        Сколько калорий хотите сбросить
                      </span>
                      <div className="custom-input custom-input--with-text-right questionnaire-user__input">
                        <label>
                          <span className="custom-input__wrapper">
                            <input
                              {...register('caloryLosingPlanTotal')}
                              disabled={isSubmitting}
                              type="number"
                              name="calories-lose"
                              aria-invalid={
                                errors['caloryLosingPlanTotal']
                                  ? 'true'
                                  : 'false'
                              }
                            />
                            <span className="custom-input__text">ккал</span>
                          </span>
                        </label>
                        {errors.caloryLosingPlanTotal && (
                          <span role="alert" className="error">
                            {errors.caloryLosingPlanTotal?.message}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="questionnaire-user__calories-waste">
                      <span className="questionnaire-user__legend">
                        Сколько калорий тратить в день
                      </span>
                      <div className="custom-input custom-input--with-text-right questionnaire-user__input">
                        <label>
                          <span className="custom-input__wrapper">
                            <input
                              {...register('caloryLosingPlanDaily')}
                              disabled={isSubmitting}
                              type="number"
                              name="calories-waste"
                              aria-invalid={
                                errors['caloryLosingPlanDaily']
                                  ? 'true'
                                  : 'false'
                              }
                            />
                            <span className="custom-input__text">ккал</span>
                          </span>
                        </label>
                        {errors.caloryLosingPlanDaily && (
                          <span role="alert" className="error">
                            {errors.caloryLosingPlanDaily?.message}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <pre>{JSON.stringify(watch(), null, 2)}</pre>
                <button
                  className="btn questionnaire-user__button"
                  type="submit"
                  disabled={!isDirty || isSubmitting || !errors}
                >
                  Продолжить
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FormRegisgerClient;
