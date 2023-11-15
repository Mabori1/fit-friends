import { useGetUserQuery } from './user-slice';
import { Link } from 'react-router-dom';

const UsersList = () => {
  const {
    data: users,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetUserQuery();
};
