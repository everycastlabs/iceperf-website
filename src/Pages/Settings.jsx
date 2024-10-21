import { Button } from '../components/Button';
import { ButtonLink } from '../components/ButtonLink';
import { Layout } from '../layout/Layout';
import { ListGroup } from '../components/ListGroup';
import { ListGroupItem } from '../components/ListGroupItem';
import { Typography } from '../components/Typography';
import { useUserContext } from '../contexts/userContext';

export function Settings() {
  const { isLoading, signOut, user } = useUserContext();

  return (
    <Layout>
      <Typography style='h2' className='mb-0'>Account Settings</Typography>
      <Typography style='h4' className='text-gray-500 mt-1'>{user?.firstName} {user?.lastName}</Typography>
      <ListGroup className='max-w-full'>
        {user?.hasActiveSubscription ? (
          <ListGroupItem className='py-6'>
            <Typography style='body' className='mt-0 max-w-prose'>
              Manage your current subscription through the Customer Portal.
            </Typography>
            <ButtonLink
              className='mx-auto mt-6 md:m-0 md:ml-6 w-full sm:max-w-72 h-10'
              label='Manage Subscription'
              disabled={!user?.hasActiveSubscription}
              to={import.meta.env.VITE_STRIPE_CUSTOMER_PORTAL_URL}
            />
          </ListGroupItem>
        ) : (
          <ListGroupItem className='py-6'>
            <Typography style='body' className='mt-0 max-w-prose'>
              You don&apos;t currently have an active subscription. Start a new subscription on the Pricing page.
            </Typography>
            <ButtonLink
              className='mx-auto mt-4 md:m-0 md:ml-6 w-full sm:max-w-72 h-10'
              label='Start A New Subscription'
              disabled={user?.hasActiveSubscription}
              to='/pricing'
            />
          </ListGroupItem>
        )}
        <ListGroupItem className='py-6'>
          <Button
            className='mx-auto md:m-0 w-full sm:max-w-72 h-10 text-redBad'
            onClick={() => signOut()}
            disabled={isLoading}
          >
            Sign Out
          </Button>
        </ListGroupItem>
      </ListGroup>
    </Layout>
  );
}
