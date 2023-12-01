import {
  useNavigate,
  isRouteErrorResponse,
  useRouteError,
} from 'react-router-dom';

const TrainerTrainingsPage = () => {
  const navigate = useNavigate();
  const error = useRouteError() as Error;

  if (!isRouteErrorResponse(error)) {
    return <div>Error {error.message}</div>;
  }

  return (
    <div>
      <h1>My Trainings</h1>
      <p>{error.data}</p>
      <button onClick={() => navigate(-1)}>&larr; Go back</button>
    </div>
  );
};

export default TrainerTrainingsPage;
