import { TrainingQuery } from '../types/training.query';

export function upFirstWord(str: string) {
  if (!str) return str;

  return str[0].toUpperCase() + str.slice(1);
}

const MonthNamesMap = {
  '01': 'января',
  '02': 'февраля',
  '03': 'марта',
  '04': 'апреля',
  '05': 'мая',
  '06': 'июня',
  '07': 'июля',
  '08': 'августа',
  '09': 'сентября',
  '10': 'октября',
  '11': 'ноября',
  '12': 'декабря',
};

export const getNotificationDate = (date: string) => {
  const day = `${date[8]}${date[9]}`;
  const month =
    MonthNamesMap[`${date[5]}${date[6]}` as keyof typeof MonthNamesMap];
  const time = date.match(/(?<=T)\d{2}:\d{2}/);

  const notificationDate = `${day} ${month}, ${time ? time[0] : ''}`;

  return notificationDate;
};

export const createQueryString = (queryArgs?: TrainingQuery) => {
  if (!queryArgs) {
    return '';
  }

  const queryParams = [
    `${queryArgs.limit ? `limit=${queryArgs.limit}` : ''}`,
    `${queryArgs.page ? `page=${queryArgs.page}` : ''}`,
    `${queryArgs.priceMin ? `minPrice=${queryArgs.priceMin}` : ''}`,
    `${queryArgs.priceMax ? `maxPrice=${queryArgs.priceMax}` : ''}`,
    `${
      queryArgs.caloriesMin ? `minCaloriesCount=${queryArgs.caloriesMin}` : ''
    }`,
    `${queryArgs.caloriesMax ?? `maxCaloriesCount=${queryArgs.caloriesMax}`}`,
    `${queryArgs.ratingMin ? `minRating=${queryArgs.ratingMin}` : ''}`,
    `${queryArgs.ratingMax ? `maxRating=${queryArgs.ratingMax}` : ''}`,
    `${queryArgs.durations ? `duration=${queryArgs.durations}` : ''}`,
    `${queryArgs.types ? `trainingType=${queryArgs.types}` : ''}`,
    `${queryArgs.priceSort ? `location=${queryArgs.priceSort}` : ''}`,
    `${queryArgs.sortDirection ? `features=${queryArgs.sortDirection}` : ''}`,
  ];

  const isNotEmptyString =
    queryParams.filter((param) => param !== '').join('') !== '';

  const queryString = isNotEmptyString
    ? `?${queryParams.filter((param) => param !== '').join('&')}`
    : '';

  return queryString;
};
