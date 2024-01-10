import { FormEvent, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { getAllTrainings } from '../../redux/trainingSlice/selectors';
import {
  CaloriesOfDay,
  Rating,
  TrainingDuration,
  TrainingPrice,
  UserTypesTraining,
} from '@fit-friends/types';
import { debounce } from '../../helper/utils';
import { FILTER_QUERY_DELAY, SortDirection } from '../../constants';
import RangeSlider from '../range-slider/range-slider';
import { fetchTrainingsAction } from '../../redux/trainingSlice/apiTrainingActions';
import { ArrowCheck } from '../../helper/svg-const';

function TrainingsFilter(): JSX.Element {
  const dispatch = useAppDispatch();

  const allTrainings = useAppSelector(getAllTrainings);

  const currentTrainingsPrices = allTrainings?.length
    ? (allTrainings.map((training) => training.price) as number[])
    : [TrainingPrice.Min, TrainingPrice.Max];
  const minCurrentPrice = Math.min(...currentTrainingsPrices);
  const maxCurrentPrice = Math.max(...currentTrainingsPrices);

  const currentTrainingsCaloriesCounts =
    allTrainings.length !== 0
      ? allTrainings.map((training) => training.caloriesQtt)
      : [CaloriesOfDay.Min, CaloriesOfDay.Max];
  const minCurrentCaloriesCount = Math.min(...currentTrainingsCaloriesCounts);
  const maxCurrentCaloriesCount = Math.max(...currentTrainingsCaloriesCounts);

  // значения
  const [price, setPrice] = useState<number[]>([]);
  const [caloriesCount, setCaloriesCount] = useState<number[]>([]);
  const [duration, setDuration] = useState<TrainingDuration[]>([]);
  const [trainingType, setTrainingType] = useState<UserTypesTraining[]>([]);

  // фильтры
  const [priceFilter, setPriceFilter] = useState<number[]>([]);
  const [caloriesCountFilter, setCaloriesCountFilter] = useState<number[]>([]);
  const [ratingFilter, setRatingFilter] = useState<number[]>([]);
  const [durationFilter, setDurationFilter] = useState<TrainingDuration[]>([]);
  const [trainingTypeFilter, setTrainingTypeFilter] = useState<
    UserTypesTraining[]
  >([]);
  const [activeSortType, setActiveSortType] = useState<
    SortDirection | undefined
  >(undefined);
  const [activeSortDerection, setActiveSortDirection] = useState<
    SortDirection | undefined
  >(undefined);

  useEffect(() => {
    dispatch(
      fetchTrainingsAction({
        priceMin: priceFilter[0],
        priceMax: priceFilter[1],
        caloriesMin: caloriesCountFilter[0],
        caloriesMax: caloriesCountFilter[1],
        ratingMin: ratingFilter[0],
        ratingMax: ratingFilter[1],
        durations: durationFilter.join(','),
        types: trainingTypeFilter.join(','),
        priceSort: activeSortType,
        sortDirection: activeSortDerection,
      }),
    );
  }, [
    caloriesCountFilter,
    dispatch,
    durationFilter,
    priceFilter,
    ratingFilter,
    trainingTypeFilter,
    activeSortType,
    activeSortDerection,
  ]);

  const setPriceFilterDebounced = debounce<number[]>(
    (arg) => setPriceFilter(arg),
    FILTER_QUERY_DELAY,
  );
  const setCaloriesCountFilterDebounced = debounce<number[]>(
    (arg) => setCaloriesCountFilter(arg),
    FILTER_QUERY_DELAY,
  );
  const setDurationFilterDebounced = debounce<
    (prevState: TrainingDuration[]) => TrainingDuration[]
  >((arg) => setDurationFilter(arg), FILTER_QUERY_DELAY);
  const setRaitingFilterDebounced = debounce<number[]>(
    (arg) => setRatingFilter(arg),
    FILTER_QUERY_DELAY,
  );
  const setTrainingTypeFilterDebounced = debounce<
    (prevState: UserTypesTraining[]) => UserTypesTraining[]
  >((arg) => setTrainingTypeFilter(arg), FILTER_QUERY_DELAY);

  const handlePriceInputChange = (evt: FormEvent<HTMLInputElement>) => {
    const inputValue = Number(evt.currentTarget.value);
    const inputName = evt.currentTarget.name;
    switch (inputName) {
      case 'text-min':
        setPrice([inputValue, priceFilter[1]]);
        setPriceFilterDebounced([inputValue, priceFilter[1]]);
        break;
      case 'text-max':
        setPrice([priceFilter[0], inputValue]);
        setPriceFilterDebounced([priceFilter[0], inputValue]);
        break;
    }
  };

  const handleCaloriesCountInputChange = (evt: FormEvent<HTMLInputElement>) => {
    const inputValue = Number(evt.currentTarget.value);
    const inputName = evt.currentTarget.name;
    switch (inputName) {
      case 'text-min-cal':
        setCaloriesCount([inputValue, caloriesCountFilter[1]]);
        setCaloriesCountFilterDebounced([inputValue, caloriesCountFilter[1]]);
        break;
      case 'text-max-cal':
        setCaloriesCount([caloriesCountFilter[0], inputValue]);
        setCaloriesCountFilterDebounced([caloriesCountFilter[0], inputValue]);
        break;
    }
  };

  const handleDurationInputChange = (option: TrainingDuration) => {
    if (durationFilter.includes(option)) {
      setDuration((prevState) =>
        prevState.filter((durationValue) => durationValue !== option),
      );
      setDurationFilterDebounced((prevState) =>
        prevState.filter((durationValue) => durationValue !== option),
      );
    } else {
      setDuration((prevState) => [...prevState, option]);
      setDurationFilterDebounced((prevState) => [...prevState, option]);
    }
  };

  const handleTrainingTypeInputChange = (option: UserTypesTraining) => {
    if (trainingTypeFilter.includes(option)) {
      setTrainingType((prevState) =>
        prevState.filter((durationValue) => durationValue !== option),
      );
      setTrainingTypeFilterDebounced((prevState) =>
        prevState.filter((durationValue) => durationValue !== option),
      );
    } else {
      setTrainingType((prevState) => [...prevState, option]);
      setTrainingTypeFilterDebounced((prevState) => [...prevState, option]);
    }
  };

  const handleSortCheaperInputChange = () => {
    setActiveSortType(SortDirection.Asc);
    setActiveSortDirection(SortDirection.Asc);
    setPriceFilterDebounced(price);
  };

  const handleSortPricierInputChange = () => {
    setActiveSortType(SortDirection.Desc);
    setActiveSortDirection(SortDirection.Desc);
    setPriceFilterDebounced(price);
  };

  const handleSortForFreeInputChange = () => {
    setActiveSortType(undefined);
    setActiveSortDirection(undefined);
    setPriceFilterDebounced([0, 0]);
  };

  return (
    <form className="my-training-form__form" data-testid="trainings-filter">
      <div className="my-training-form__block my-training-form__block--price">
        <h4 className="my-training-form__block-title">Цена, ₽</h4>
        <div className="filter-price">
          <div className="filter-price__input-text filter-price__input-text--min">
            <input
              onChange={handlePriceInputChange}
              value={price[0]}
              placeholder={minCurrentPrice.toString()}
              type="number"
              id="text-min"
              name="text-min"
            />
            <label htmlFor="text-min">от</label>
          </div>
          <div className="filter-price__input-text filter-price__input-text--max">
            <input
              onChange={handlePriceInputChange}
              value={price[1]}
              placeholder={maxCurrentPrice.toString()}
              type="number"
              id="text-max"
              name="text-max"
            />
            <label htmlFor="text-max">до</label>
          </div>
        </div>
        <div className="filter-range">
          <RangeSlider
            minRangeValue={minCurrentPrice}
            maxRangeValue={maxCurrentPrice}
            setExternalValues={[setPriceFilterDebounced, setPrice]}
          />
        </div>
      </div>
      <div className="my-training-form__block my-training-form__block--calories">
        <h4 className="my-training-form__block-title">Калории</h4>
        <div className="filter-calories">
          <div className="filter-calories__input-text filter-calories__input-text--min">
            <input
              onChange={handleCaloriesCountInputChange}
              placeholder={minCurrentCaloriesCount.toString()}
              value={caloriesCount[0]}
              type="number"
              id="text-min-cal"
              name="text-min-cal"
            />
            <label htmlFor="text-min-cal">от</label>
          </div>
          <div className="filter-calories__input-text filter-calories__input-text--max">
            <input
              onChange={handleCaloriesCountInputChange}
              placeholder={maxCurrentCaloriesCount.toString()}
              value={caloriesCount[1]}
              type="number"
              id="text-max-cal"
              name="text-max-cal"
            />
            <label htmlFor="text-max-cal">до</label>
          </div>
        </div>
        <div className="filter-range">
          <RangeSlider
            minRangeValue={minCurrentCaloriesCount}
            maxRangeValue={maxCurrentCaloriesCount}
            setExternalValues={[
              setCaloriesCountFilterDebounced,
              setCaloriesCount,
            ]}
          />
        </div>
      </div>
      <div className="my-training-form__block my-training-form__block--raiting">
        <h4 className="my-training-form__block-title">Рейтинг</h4>
        <div className="filter-raiting">
          <RangeSlider
            minRangeValue={Rating.Min}
            maxRangeValue={Rating.Max}
            setExternalValues={[setRaitingFilterDebounced]}
          />
          <div className="filter-raiting__control">
            <div>
              <span>{Rating.Min}</span>
            </div>
            <div>
              <span>{Rating.Max}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="my-training-form__block my-training-form__block--duration">
        <h4 className="my-training-form__block-title">Длительность</h4>
        <ul className="my-training-form__check-list">
          {Object.values(TrainingDuration).map((option) => (
            <li key={option} className="my-training-form__check-list-item">
              <div className="custom-toggle custom-toggle--checkbox">
                <label>
                  <input
                    onChange={() => handleDurationInputChange(option)}
                    checked={duration.includes(option)}
                    type="checkbox"
                    value="duration-1"
                    name="duration"
                  />
                  <span className="custom-toggle__icon">
                    <svg width="9" height="6" aria-hidden="true">
                      <ArrowCheck />
                    </svg>
                  </span>
                  <span className="custom-toggle__label">{option}</span>
                </label>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="gym-catalog-form__block gym-catalog-form__block--type">
        <h4 className="gym-catalog-form__block-title">Тип</h4>
        <ul className="gym-catalog-form__check-list">
          {Object.values(UserTypesTraining).map((option) => (
            <li key={option} className="gym-catalog-form__check-list-item">
              <div className="custom-toggle custom-toggle--checkbox">
                <label>
                  <input
                    onChange={() => handleTrainingTypeInputChange(option)}
                    checked={trainingType.includes(option)}
                    type="checkbox"
                    value="type-1"
                    name="type"
                  />
                  <span className="custom-toggle__icon">
                    <svg width="9" height="6" aria-hidden="true">
                      <use xlinkHref="#arrow-check"></use>
                    </svg>
                  </span>
                  <span className="custom-toggle__label">{option}</span>
                </label>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="gym-catalog-form__block gym-catalog-form__block--sort">
        <h4 className="gym-catalog-form__title gym-catalog-form__title--sort">
          Сортировка
        </h4>
        <div className="btn-radio-sort gym-catalog-form__radio">
          <label>
            <input
              onChange={handleSortCheaperInputChange}
              type="radio"
              name="sort"
            />
            <span className="btn-radio-sort__label">Дешевле</span>
          </label>
          <label>
            <input
              onChange={handleSortPricierInputChange}
              type="radio"
              name="sort"
            />
            <span className="btn-radio-sort__label">Дороже</span>
          </label>
          <label>
            <input
              onChange={handleSortForFreeInputChange}
              type="radio"
              name="sort"
              checked={priceFilter[0] === 0 && priceFilter[1] === 0}
            />
            <span className="btn-radio-sort__label">Бесплатные</span>
          </label>
        </div>
      </div>
    </form>
  );
}

export default TrainingsFilter;
