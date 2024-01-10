import { useNavigate } from 'react-router-dom';

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Something went wrong. 404.</h1>
      <button onClick={() => navigate(-1)}>&larr; Go back</button>
    </div>
  );
};

export default ErrorPage;
