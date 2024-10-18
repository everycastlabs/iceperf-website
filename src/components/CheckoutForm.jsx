import { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types'
import { twMerge } from 'tailwind-merge';

import { Button } from '../components/Button';
import { PricingCardsGrid } from './PricingCardsGrid';
import { UserContext } from '../contexts/userContext';

export const CheckoutForm = ({ className = '' }) => {
  const [selectedPriceId, setSelectedPriceId] = useState();
  const [products, setProducts] = useState([]);
  const [prices, setPrices] = useState([]);

  const { isLoading, user } = useContext(UserContext);

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

  return (
    <div className={twMerge('flex flex-col items-center', className)}>
      <PricingCardsGrid
        products={products}
        prices={prices}
        selectedPriceId={selectedPriceId}
        setSelectedPriceId={setSelectedPriceId}
      />
      <form
        action={`${import.meta.env.VITE_API_BASE_URI}/api/checkout/create-session/${selectedPriceId}/${user?.stripeCustomerId}`}
      >
        <Button
          type='submit'
          className='w-full md:w-52'
          disabled={isLoading || !selectedPriceId || !user?.stripeCustomerId}
        >
          Go To Checkout
        </Button>
      </form>
    </div>
  )
};

CheckoutForm.propTypes = {
  className: PropTypes.string,
};
