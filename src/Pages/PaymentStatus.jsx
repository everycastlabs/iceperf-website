import { useSearchParams } from 'react-router-dom';

import { Layout } from '../layout/Layout';
import { Link } from '../components/Link';
import { Typography } from '../components/Typography';

export const PaymentStatus = () => {
  const [ params ] = useSearchParams();
  const isSuccess = params.get('success')?.toLowerCase() === 'true';
  const isCanceled = params.get('canceled')?.toLowerCase() === 'true';

  if (isSuccess) {
    return (
      <Layout>
        <Typography style='h2' className='text-greenGood'>
          Success
        </Typography>
        <Typography style='body'>
          Your payment was successful! Enjoy your ICEPerf.com subscription.
        </Typography>
      </Layout>
    );
  } else if (isCanceled) {
    return (
      <Layout>
        <Typography style='h2' className='text-greenGood'>
          Canceled
        </Typography>
        <Typography style='body'>
          You successfully canceled your checkout process. Your card won&apos;t be charged.
        </Typography>
        <Typography style='body'>
          If you still want to make a purchase, go to the <Link to='/pricing'>pricing page</Link>.
        </Typography>
      </Layout>
    );
  } else {
    return (
      <Layout>
        <Typography style='h2' className='text-redBad'>
          Something went wrong
        </Typography>
        <Typography style='body'>
          Your checkout process did not complete successfully.
        </Typography>
        <Typography style='body'>
          Please check your <Link to='/settings'>settings page</Link> or <Link to='mailto:support@iceperf.com'>email support</Link>.
        </Typography>
      </Layout>
    );
  }
};
