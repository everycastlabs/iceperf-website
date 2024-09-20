import { useAuth } from '@workos-inc/authkit-react';

import { Layout } from '../layout/Layout';

export function Signup() {
  const { isLoading, signUp } = useAuth();

  return (
    <Layout>
      <button
        className='btn btn-primary'
        onClick={() => signUp()}
        disabled={isLoading}
      >
        Sign Up
      </button>
    </Layout>
  );
}
