import { useEffect, useState } from 'react';
import Header from '../../components/header/header';
import { nanoid } from 'nanoid';
import {
  AppRoute,
  MAX_DIFF_IN_MILLISECONDS,
  MAX_FRIENDS_COUNT_PER_PAGE,
} from '../../constants';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import {
  getClientFriends,
  getIncomingRequests,
  getIsTrainer,
  getOutgoingRequests,
  getTrainerFriends,
} from '../../redux/userSlice/selectors';
import {
  fetchClientFriendsAction,
  fetchInPersonalOrderAction,
  fetchOutPersonalOrderAction,
  fetchTrainerFriendsAction,
} from '../../redux/userSlice/apiUserActions';
import FriendsListItem from '../../components/friends-list-item/friend-list.item';
import { ArrowCheck, ArrowLeft } from '../../helper/svg-const';
import { UserRdo } from '../../types/user.rdo';

function FriendsListPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const isTrainer = useAppSelector(getIsTrainer);
  const myFriends = useAppSelector(
    isTrainer ? getTrainerFriends : getClientFriends,
  );

  const myIncomingRequests = useAppSelector(getIncomingRequests);
  const myOutgoingRequests = useAppSelector(getOutgoingRequests);

  const [currentListPage, setCurrentListPage] = useState(1);
  const pagesCount = Math.ceil(myFriends.length / MAX_FRIENDS_COUNT_PER_PAGE);

  const [onlineFilterChecked, setOnlineFilterChecked] = useState(false);

  const filterOfflineUsers = (user: UserRdo) => {
    const timeNow = Number(new Date());
    const lastTimeUpdated = Number(new Date(user.updatedAt ?? timeNow));
    const timeDiff = Math.abs(timeNow - lastTimeUpdated);

    if (onlineFilterChecked && timeDiff > MAX_DIFF_IN_MILLISECONDS) {
      return null;
    } else {
      return user;
    }
  };

  const handleShowMoreButtonClick = () => {
    setCurrentListPage((prevState) =>
      prevState < pagesCount ? prevState + 1 : prevState,
    );
  };

  const handleReturnToTopButtonClick = () => {
    window.scrollTo(0, 0);
  };

  const findIncomingRequest = (friendId: number) => {
    const friendRequest = myIncomingRequests.find(
      (request) => request.initiatorId === friendId,
    );
    return friendRequest;
  };

  const findOutgoingRequest = (friendId: number) => {
    const friendRequest = myOutgoingRequests.find(
      (request) => request.userId === friendId,
    );
    return friendRequest;
  };

  useEffect(() => {
    isTrainer
      ? dispatch(fetchTrainerFriendsAction())
      : dispatch(fetchClientFriendsAction());

    dispatch(fetchInPersonalOrderAction());
    if (!isTrainer) {
      dispatch(fetchOutPersonalOrderAction());
    }
  }, [dispatch, isTrainer]);

  const handleOnlineStatusInputChange = () => {
    setOnlineFilterChecked((prevState) => !prevState);
  };

  return (
    <>
      <Header />
      <main>
        <section className="friends-list">
          <div className="container">
            <div className="friends-list__wrapper">
              <button
                onClick={() => navigate(AppRoute.Intro)}
                className="btn-flat friends-list__back"
                type="button"
              >
                <svg width="14" height="10" aria-hidden="true">
                  <ArrowLeft />
                </svg>
                <span>Назад</span>
              </button>
              <div className="friends-list__title-wrapper">
                <h1 className="friends-list__title">Мои друзья</h1>
                <div
                  className="custom-toggle custom-toggle--switch custom-toggle--switch-right"
                  data-validate-type="checkbox"
                >
                  <label>
                    <input
                      onChange={handleOnlineStatusInputChange}
                      type="checkbox"
                      value="user-agreement-1"
                      name="user-agreement"
                    />
                    <span className="custom-toggle__icon">
                      <svg width="9" height="6" aria-hidden="true">
                        <ArrowCheck />
                      </svg>
                    </span>
                    <span className="custom-toggle__label">Только онлайн</span>
                  </label>
                </div>
              </div>
              <ul className="friends-list__list">
                {myFriends
                  .filter((user) => filterOfflineUsers(user))
                  .slice(0, currentListPage * MAX_FRIENDS_COUNT_PER_PAGE)
                  .map((friend) => (
                    <FriendsListItem
                      key={nanoid()}
                      friend={friend}
                      request={
                        findIncomingRequest(friend.userId ?? 0) ??
                        findOutgoingRequest(friend.userId ?? 0)
                      }
                      isTrainer={isTrainer}
                    />
                  ))}
              </ul>
              <div className="show-more friends-list__show-more">
                {currentListPage >= pagesCount ? (
                  <button
                    onClick={handleReturnToTopButtonClick}
                    className={`btn show-more__button ${
                      pagesCount <= 1 ? 'show-more__button--to-top' : ''
                    }`}
                  >
                    Вернуться в начало
                  </button>
                ) : (
                  <button
                    onClick={handleShowMoreButtonClick}
                    className="btn show-more__button show-more__button--more"
                    type="button"
                  >
                    Показать еще
                  </button>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default FriendsListPage;
