import { useState, useEffect } from 'react';
import PropTypes from 'prop-types'
import { twMerge } from 'tailwind-merge';

import { Button } from '../components/Button';
import { PricingCardsGrid } from './PricingCardsGrid';

export const CheckoutForm = ({ className = '', disabled, userId }) => {
  const [selectedPriceId, setSelectedPriceId] = useState();
  const [customerId, setCustomerId] = useState('');
  const [products, setProducts] = useState([]);
  const [prices, setPrices] = useState([]);

  // get a list of products and prices from Stripe
  useEffect(() => {
    const getPrices = async () => {
      const resp = await fetch(`${import.meta.env.VITE_API_BASE_URI}/api/get-active-products`);
      const respJson = await resp.json();
      setPrices(respJson.pricesList);
      setProducts(respJson.productsList);
    }
    getPrices();
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
    <div className={twMerge('flex flex-col items-center', className)}>
      <PricingCardsGrid
        products={products}
        prices={prices}
        selectedPriceId={selectedPriceId}
        setSelectedPriceId={setSelectedPriceId}
      />
      <form
        action={`${import.meta.env.VITE_API_BASE_URI}/api/checkout/create-session/${selectedPriceId}/${customerId}`}
      >
        <Button
          type='submit'
          className='w-full md:w-52'
          disabled={disabled || !selectedPriceId}
        >
          Go To Checkout
        </Button>
      </form>
    </div>
  )
};

CheckoutForm.propTypes = {
  className: PropTypes.string,
  disabled: PropTypes.bool,
  userId: PropTypes.string,
};
