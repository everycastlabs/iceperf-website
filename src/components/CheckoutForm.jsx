import { useState, useEffect } from 'react';
import PropTypes from 'prop-types'

import { Button } from '../components/Button';

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
    setSelectedPriceId('price_1Q5VZVChTA44sQl54VmhhNHc');
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

  console.log('the prices', prices);
  console.log('the products', products);

  return (
    <>
      {/* <Card></Card> */}
      <form
        className={className}
        action={`${import.meta.env.VITE_API_BASE_URI}/api/checkout/create-session/${selectedPriceId}/${customerId}`}
      >
        <Button
          type='submit'
          className='w-full'
          disabled={disabled || !selectedPriceId}
        >
          Go To Checkout
        </Button>
      </form>
    </>
  )
};

CheckoutForm.propTypes = {
  className: PropTypes.string,
  disabled: PropTypes.bool,
  userId: PropTypes.string,
};
