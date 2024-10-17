import { useState, useEffect } from 'react';
import PropTypes from 'prop-types'

import { Button } from '../components/Button';

export const CheckoutForm = ({ className = '' }) => {
  const [priceId, setPriceId] = useState();

  // TODO ideally we should get a list of products or prices from Stripe
  useEffect(() => {
    setPriceId('price_1Q5VZVChTA44sQl54VmhhNHc');
  }, []);

  return (
    <form
      className={className}
      action={`${import.meta.env.VITE_API_BASE_URI}/api/checkout/create-session/${priceId}`}
    >
      <Button type='submit' className='w-full'>
        Checkout
      </Button>
    </form>
  )
};

CheckoutForm.propTypes = {
  className: PropTypes.string,
};
