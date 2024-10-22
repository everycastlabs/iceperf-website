import { useLocation } from 'react-router-dom';

import { Button } from '../components/Button';
import { Layout } from '../layout/Layout';
import { Typography } from '../components/Typography';
import { useUserContext } from '../contexts/userContext';

export function Login() {
  const { isLoading, signIn } = useUserContext();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search)

  return (
    <Layout>
      <Typography style='h2'>Log into your ICEPerf.com account</Typography>
      <Button
        onClick={() => signIn({
          context: searchParams.get('context') ?? undefined,
          state: { returnTo: location.pathname },
        })}
        disabled={isLoading}
      >
        Login
      </Button>
    </Layout>
  );
}
