import 'bootstrap/dist/css/bootstrap.css';
import buildClient from '../api/buildclient';
import Header from '../components/header';

function ComExp({ Component, pageProps, currentUser }) {
  return (
    <div>
      <Header currentUser={currentUser} />
      <div className="container">
        <Component currentUser={currentUser} {...pageProps} />
      </div>
    </div>
  );
}

ComExp.getInitialProps = async (appContext) => {
  const client = buildClient(appContext.ctx);
  const { data } = await client.get(
    '/api/users/currentuser'
  );
  let pageProps = {};
  if (appContext.Component.getInitialProps) {
    pageProps = await appContext.Component.getInitialProps(appContext.ctx, client, data.currentUser);
  }
  return { pageProps, ...data };
};

export default ComExp;
