import 'bootstrap/dist/css/bootstrap.css';
import buildClient from '../api/buildclient';
import Header from '../components/header';

function ComExp({ Component, pageProps, currentUser }) {
  return (
    <div>
      <Header currentUser={currentUser} />
      <Component {...pageProps} />
    </div>
  );
}

ComExp.getInitialProps = async (appContext) => {
  const { data } = await buildClient(appContext.ctx).get(
    '/api/users/currentuser'
  );
  let pageProps = {};
  if (appContext.Component.getInitialProps) {
    pageProps = await appContext.Component.getInitialProps(appContext.ctx);
  }
  return { pageProps, ...data };
};

export default ComExp;
