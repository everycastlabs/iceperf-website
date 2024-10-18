import { useContext } from 'react';
import { useLocation } from 'react-router-dom';

import { Button } from '../components/Button';
import { Layout } from '../layout/Layout';
import { Typography } from '../components/Typography';
import { UserContext } from '../contexts/userContext';

export function Login() {
  const { isLoading, signIn } = useContext(UserContext);
  const location = useLocation();

  return (
    <Layout>
      <Typography style='h2'>Log into your ICEPerf.com account</Typography>
      <Button
        onClick={() => signIn({ context: location.search, state: { returnTo: location.pathname } })}
        disabled={isLoading}
      >
        Login
      </Button>
    </Layout>
  );
}
