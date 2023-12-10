import { useEffect } from 'react';
import Header from '../../components/header/header';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { getUserInfo } from '../../redux/trainingSlice/selectors';
import { fetchUserInfoAction } from '../../redux/trainingSlice/apiTrainingActions';
import UserCardTrainer from '../../components/user-card-trainer/user-card-trainer';
import UserCardClient from '../../components/user-card-client/user-card-client';
import { ArrowLeft } from '../../helper/svg-const';
import { getIsTrainer } from '../../redux/userSlice/selectors';
import { fetchInPersonalOrdersAction } from '../../redux/userSlice/apiUserActions';

function UserCard(): JSX.Element {
  const dispatch = useAppDispatch();

  const userId = useParams().id;

  const user = useAppSelector(getUserInfo);
  const isTrainer = useAppSelector(getIsTrainer);

  useEffect(() => {
    if (userId && user?.userId !== +userId) {
      dispatch(fetchUserInfoAction(+userId));
    }
    if (user?.userId) {
      dispatch(fetchInPersonalOrdersAction(user?.userId));
    }
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
                {isTrainer && user && <UserCardTrainer trainer={user} />}
                {!isTrainer && user && <UserCardClient client={user} />}
                {!user && <h1>Пользователь не найден</h1>}
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default UserCard;
