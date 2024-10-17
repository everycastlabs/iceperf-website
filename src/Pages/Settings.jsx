import { useAuth } from '@workos-inc/authkit-react';

import { Button } from '../components/Button';
import { ButtonLink } from '../components/ButtonLink';
import { Layout } from '../layout/Layout';
import { Typography } from '../components/Typography';
import { CheckoutForm } from '../components/CheckoutForm';

export function Settings() {
  const { isLoading, signOut, user } = useAuth();

  return (
    <Layout>
      <Typography style='h2' className='mb-0'>Account Settings</Typography>
      <Typography style='h4' className='text-gray-500 mt-1 mb-8'>{user?.firstName} {user?.lastName}</Typography>
      <div className='flex flex-col mx-auto max-w-full md:max-w-md'>
        <CheckoutForm className='mt-6 w-full' />
        <ButtonLink
          className='mt-6'
          label='Manage Subscription'
          to='https://billing.stripe.com/p/login/test_eVa2accDp7pj9c4288' // FIXME can't be hardcoded
        />
        <Button
          className='text-red-800 mt-6'
          onClick={() => signOut()}
          disabled={isLoading}
        >
          Sign Out
        </Button>
      </div>
    </Layout>
  );
}
