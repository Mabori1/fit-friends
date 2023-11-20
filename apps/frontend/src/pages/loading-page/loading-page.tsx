import { Helmet } from 'react-helmet-async';

function LoadingPage(): JSX.Element {
  return (
    <section className="loading">
      <Helmet>
        <title>Loading...</title>
      </Helmet>
      <p>Loading ...</p>
    </section>
  );
}

export default LoadingPage;
