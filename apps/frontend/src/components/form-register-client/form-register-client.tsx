import { z } from 'zod';
import { useForm, SubmitHandler } from 'react-hook-form';
import {
  AppRoute,
  DURATION_TRAINING_ZOD,
  LEVEL_TRAINING_ZOD,
  TYPE_TRAINING_ZOD,
} from '../../constants';
import {
  CaloriesOfDay,
  CaloriesOfTotal,
  MAXIMUM_TRAINING_TYPES_CHOICE,
} from '@fit-friends/types';
import { upFirstWord } from '../../helper/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { updateUserAction } from '../../redux/userSlice/apiUserActions';
import { useNavigate } from 'react-router-dom';
import { UpdateUserDto } from '../../types/updateUserDto';
import { toast } from 'react-toastify';
import { isFulfilled } from '@reduxjs/toolkit';
import { useEffect } from 'react';
import { getUser } from '../../redux/userSlice/selectors';

const formSchema = z.object({
  typesOfTraining: z
    .array(z.enum(TYPE_TRAINING_ZOD))
    .min(1, 'Должен быть выбран хотя бы один тип тренировок')
    .max(MAXIMUM_TRAINING_TYPES_CHOICE, 'Не более трех типов тренировок'),
  timeOfTraining: z.enum(DURATION_TRAINING_ZOD),
  level: z.enum(LEVEL_TRAINING_ZOD),
  caloryLosingPlanTotal: z.coerce
    .number()
    .min(CaloriesOfTotal.Min, `Минимальное значение ${CaloriesOfTotal.Min}`)
    .max(CaloriesOfTotal.Max, `Максимальное значение ${CaloriesOfTotal.Max}`),
  caloryLosingPlanDaily: z.coerce
    .number()
    .min(CaloriesOfDay.Min, `Минимальное значение ${CaloriesOfDay.Min}`)
    .max(CaloriesOfDay.Max, `Максимальное значение ${CaloriesOfDay.Max}`),
});

type FormSchema = z.infer<typeof formSchema>;

function FormRegisgerClient() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const user = useAppSelector(getUser);

  useEffect(() => {
    if (!user?.name) {
      navigate(AppRoute.Register);
    }
  }, [user, navigate]);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { isDirty, isSubmitting, errors },
  } = useForm<FormSchema>({ resolver: zodResolver(formSchema) });

  const onSubmit: SubmitHandler<FormSchema> = (data) => {
    const updateData: UpdateUserDto = {
      level: data.level,
      typesOfTraining: data.typesOfTraining,
      client: {
        timeOfTraining: data.timeOfTraining,
        caloryLosingPlanTotal: data.caloryLosingPlanTotal,
        caloryLosingPlanDaily: data.caloryLosingPlanDaily,
      },
    };
    dispatch(updateUserAction(updateData))
      .then(isFulfilled)
      .then(() => {
        reset();
        navigate(AppRoute.ClientRoom);
      })
      .catch(() => {
        toast.error('Что-то пошло не так');
      });
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
                        <div key={type} className="btn-checkbox">
                          <label>
                            <input
                              {...register('typesOfTraining')}
                              disabled={isSubmitting}
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
                  <div className="questionnaire-user__block">
                    <span className="questionnaire-user__legend">
                      Сколько времени вы готовы уделять на тренировку в день
                    </span>
                    <div className="custom-toggle-radio custom-toggle-radio--big questionnaire-user__radio">
                      {DURATION_TRAINING_ZOD.map((duration) => (
                        <div
                          key={duration}
                          className="custom-toggle-radio__block"
                        >
                          <label>
                            <input
                              {...register('timeOfTraining')}
                              disabled={isSubmitting}
                              type="radio"
                              name="timeOfTraining"
                              value={duration}
                            />
                            <span className="custom-toggle-radio__icon"></span>
                            <span className="custom-toggle-radio__label">
                              {duration}
                            </span>
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
                        <div key={level} className="custom-toggle-radio__block">
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
                              min={CaloriesOfTotal.Min}
                              max={CaloriesOfTotal.Max}
                              name="caloryLosingPlanTotal"
                              aria-invalid={
                                errors['caloryLosingPlanTotal']
                                  ? 'true'
                                  : 'false'
                              }
                            />
                            <span className="custom-input__text">ккал</span>
                          </span>
                        </label>
                      </div>
                      {errors.caloryLosingPlanTotal && (
                        <span role="alert" className="error">
                          {errors.caloryLosingPlanTotal?.message}
                        </span>
                      )}
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
                              min={CaloriesOfDay.Min}
                              max={CaloriesOfDay.Max}
                              name="caloryLosingPlanDaily"
                              aria-invalid={
                                errors['caloryLosingPlanDaily']
                                  ? 'true'
                                  : 'false'
                              }
                            />
                            <span className="custom-input__text">ккал</span>
                          </span>
                        </label>
                      </div>
                      {errors.caloryLosingPlanDaily && (
                        <span role="alert" className="error">
                          {errors.caloryLosingPlanDaily?.message}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <pre>{JSON.stringify(watch(), null, 2)}</pre>
                <button
                  className="btn questionnaire-user__button"
                  type="submit"
                  disabled={isSubmitting || !isDirty}
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
