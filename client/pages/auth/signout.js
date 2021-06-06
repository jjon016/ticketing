import Router from 'next/router';
import { useEffect } from 'react';
import useRequest from '../../hooks/userequest';

export default function sgnout() {
  const { doRequest, errors } = useRequest({
    url: '/api/users/signout',
    method: 'get',
    body: {},
    onSuccess: () => Router.push('/'),
  });
  useEffect(() => {
    doRequest();
  }, []);
  return <div>Signing out...</div>;
}
