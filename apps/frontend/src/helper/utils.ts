import { OrderQuery } from '../types/order.query';
import { PersonalOrderStatusQuery } from '../types/personal-order-status-query';
import { TrainingQuery } from '../types/training.query';
import { UserQuery } from '../types/user.query';

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

export const getNotificationDate = (dateArg: Date) => {
  if (!dateArg) {
    return '';
  }
  const date = dateArg.toString();

  const day = `${date[8]}${date[9]}`;
  const month =
    MonthNamesMap[`${date[5]}${date[6]}` as keyof typeof MonthNamesMap];
  const time = date.match(/(?<=T)\d{2}:\d{2}/);

  const notificationDate = `${day} ${month}, ${time ? time[0] : ''}`;

  return notificationDate;
};

export const createQueryString = (
  queryArgs?: TrainingQuery & UserQuery & PersonalOrderStatusQuery & OrderQuery,
) => {
  if (!queryArgs) {
    return '';
  }

  const queryParams = [
    `${queryArgs.limit ? `limit=${queryArgs.limit}` : ''}`,
    `${queryArgs.page ? `page=${queryArgs.page}` : ''}`,
    `${queryArgs.priceMin ? `priceMin=${queryArgs.priceMin}` : ''}`,
    `${queryArgs.priceMax ? `priceMax=${queryArgs.priceMax}` : ''}`,
    `${queryArgs.caloriesMin ? `caloriesMin=${queryArgs.caloriesMin}` : ''}`,
    `${queryArgs.caloriesMax ? `caloriesMax=${queryArgs.caloriesMax}` : ''}`,
    `${queryArgs.ratingMin ? `ratingMin=${queryArgs.ratingMin}` : ''}`,
    `${queryArgs.ratingMax ? `ratingMax=${queryArgs.ratingMax}` : ''}`,
    `${queryArgs.durations ? `durations=${queryArgs.durations}` : ''}`,
    `${queryArgs.types ? `types=${queryArgs.types}` : ''}`,
    `${queryArgs.levelOfUser ? `levelOfUser=${queryArgs.levelOfUser}` : ''}`,
    `${queryArgs.level ? `level=${queryArgs.level}` : ''}`,
    `${queryArgs.priceSort ? `priceSort=${queryArgs.priceSort}` : ''}`,
    `${queryArgs.ratingSort ? `ratingSort=${queryArgs.ratingSort}` : ''}`,
    `${queryArgs.quantitySort ? `quantitySort=${queryArgs.quantitySort}` : ''}`,
    `${
      queryArgs.sortDirection ? `sortDirection=${queryArgs.sortDirection}` : ''
    }`,
    `${queryArgs.isPromo ? `isPromo=${queryArgs.isPromo}` : ''}`,
    `${queryArgs.locations ? `locations=${queryArgs.locations}` : ''}`,
    `${queryArgs.role ? `role=${queryArgs.role}` : ''}`,
    `${queryArgs.isReady !== undefined ? `isReady=${queryArgs.isReady}` : ''}`,
    `${
      queryArgs.typesOfTraining
        ? `typesOfTraining=${queryArgs.typesOfTraining}`
        : ''
    }`,
    `${queryArgs.orderId ? `orderId=${queryArgs.orderId}` : ''}`,
    `${queryArgs.newStatus ? `newStatus=${queryArgs.newStatus}` : ''}`,
  ];

  const isNotEmptyString =
    queryParams.filter((param) => param !== '').join('') !== '';

  const queryString = isNotEmptyString
    ? `?${queryParams.filter((param) => param !== '').join('&')}`
    : '';

  return queryString;
};

export const debounce = <T>(callback: (arg: T) => void, delay: number) => {
  let timeoutId: ReturnType<typeof setTimeout>;
  return function (arg: T) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback(arg), delay);
  };
};

export const saveTrainingId = (trainingId: string): void => {
  localStorage.setItem('fitfriends-trainingId', trainingId);
};

export const getTrainingId = (): string => {
  const trainingId = localStorage.getItem('fitfriends-trainingId');
  return trainingId ?? '';
};

export const dropTrainingId = (): void => {
  localStorage.removeItem('fitfriends-trainingId');
};
