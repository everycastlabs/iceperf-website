import { useState, useEffect } from 'react';
import PropTypes from 'prop-types'

import { Button } from '../components/Button';

export const CheckoutForm = ({ className = '', disabled, userId }) => {
  const [priceId, setPriceId] = useState();
  const [customerId, setCustomerId] = useState('');

  // TODO ideally we should get a list of products or prices from Stripe
  useEffect(() => {
    setPriceId('price_1Q5VZVChTA44sQl54VmhhNHc');
  }, []);

  useEffect(() => {
    if (!userId) {
      return;
    }
    const getStripeCustomer = async () => {
      const customer = await fetch(`${import.meta.env.VITE_API_BASE_URI}/api/get-customer/${userId}`);
      const customerResp = await customer.json();
      setCustomerId(customerResp.id);
    };
    getStripeCustomer();
  }, [userId]);

  return (
    <form
      className={className}
      action={`${import.meta.env.VITE_API_BASE_URI}/api/checkout/create-session/${priceId}/${customerId}`}
    >
      <Button
        type='submit'
        className='w-full'
        disabled={disabled}
      >
        Go To Checkout
      </Button>
    </form>
  )
};

CheckoutForm.propTypes = {
  className: PropTypes.string,
  disabled: PropTypes.bool,
  userId: PropTypes.string,
};
