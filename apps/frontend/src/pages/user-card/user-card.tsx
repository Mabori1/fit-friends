import { useEffect } from 'react';
import Header from '../../components/header/header';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { getUserInfo } from '../../redux/trainingSlice/selectors';
import { fetchUserInfoAction } from '../../redux/trainingSlice/apiTrainingActions';
import { fetchOutPersonalOrderAction } from '../../redux/userSlice/apiUserActions';
import { UserRole } from '@fit-friends/types';
import UserCardTrainer from '../../components/user-card-trainer/user-card-trainer';
import UserCardClient from '../../components/user-card-client/user-card-client';
import { ArrowLeft } from '../../helper/svg-const';

function UserCard(): JSX.Element {
  const dispatch = useAppDispatch();

  const userId = useParams().id;

  const user = useAppSelector(getUserInfo);

  useEffect(() => {
    if (userId && user?.userId !== +userId) {
      dispatch(fetchUserInfoAction(+userId));
    }
    dispatch(fetchOutPersonalOrderAction());
  }, [dispatch, user, userId]);

  return (
    <>
      <Header />
      <main>
        <div className="inner-page inner-page--no-sidebar">
          <div className="container">
            <div className="inner-page__wrapper">
              <button
                onClick={() => window.history.back()}
                className="btn-flat inner-page__back"
                type="button"
              >
                <svg width="14" height="10" aria-hidden="true">
                  <ArrowLeft />
                </svg>
                <span>Назад</span>
              </button>
              <div className="inner-page__content">
                {user?.role === UserRole.Trainer && (
                  <UserCardTrainer trainer={user} />
                )}
                {user?.role === UserRole.Client && (
                  <UserCardClient client={user} />
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default UserCard;
