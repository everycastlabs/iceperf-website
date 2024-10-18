import { useContext } from 'react';

import { Button } from '../components/Button';
import { ButtonLink } from '../components/ButtonLink';
import { Layout } from '../layout/Layout';
import { Typography } from '../components/Typography';
import { UserContext } from '../contexts/userContext';

export function Settings() {
  const { isLoading, signOut, user } = useContext(UserContext);

  return (
    <Layout>
      <Typography style='h2' className='mb-0'>Account Settings</Typography>
      <Typography style='h4' className='text-gray-500 mt-1 mb-8'>{user?.firstName} {user?.lastName}</Typography>
      <div className='flex flex-col'>
        <ButtonLink
          label='Start a new subscription'
          disabled={user?.hasActiveSubscription}
          to='/pricing'
        />
        <ButtonLink
          className='mt-6 mx-auto max-w-full md:max-w-md'
          label='Manage Subscription'
          disabled={!user?.hasActiveSubscription}
          to='https://billing.stripe.com/p/login/test_eVa2accDp7pj9c4288' // FIXME can't be hardcoded
        />
        <Button
          className='text-red-800 mt-6 mx-auto max-w-full md:max-w-md'
          onClick={() => signOut()}
          disabled={isLoading}
        >
          Sign Out
        </Button>
      </div>
    </Layout>
  );
}
