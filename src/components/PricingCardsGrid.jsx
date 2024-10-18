import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { PricingCard } from './PricingCard';
import { Toggle } from './Toggle';

export const PricingCardsGrid = ({ products, prices, selectedPriceId, setSelectedPriceId }) => {
  // toggle state
  const [isAnnual, setIsAnnual] = useState(false);
  const [price, setPrice] = useState();

  useEffect(() => {
    const freq = isAnnual ? 'year' : 'month';
    // FIXME this only works with on product
    const price = prices.find((p) => p.recurring.interval === freq);
    setPrice(price);
  }, [isAnnual, prices]);

  return (
    <div className='max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto'>
      {/* <!-- Title --> */}
      <div className='max-w-2xl mx-auto text-center mb-10 lg:mb-14'>
        <h2 className='text-2xl font-bold md:text-4xl md:leading-tight dark:text-white'>Pricing</h2>
        {/* <p className='mt-1 text-gray-600 dark:text-neutral-400'>Whatever your status, our offers evolve according to your needs.</p> */}
      </div>
      {/* <!-- End Title --> */}

      {/* <!-- Switch --> */}
      <div className='flex justify-center items-center'>
        <label className='min-w-14 text-sm text-gray-500 me-3 dark:text-neutral-400'>Monthly</label>
        <Toggle
          checked={isAnnual}
          onClick={() => {
            setSelectedPriceId();
            setIsAnnual((isAnnual) => !isAnnual);
          }}
        />
        <label className='relative min-w-14 text-sm text-gray-500 ms-3 dark:text-neutral-400'>
          Annual
          {/* <span className='absolute -top-10 start-auto -end-28'>
            <span className='flex items-center'>
              <svg className='w-14 h-8 -me-6' width='45' height='25' viewBox='0 0 45 25' fill='none' xmlns='http://www.w3.org/2000/svg'>
                <path d='M43.2951 3.47877C43.8357 3.59191 44.3656 3.24541 44.4788 2.70484C44.5919 2.16427 44.2454 1.63433 43.7049 1.52119L43.2951 3.47877ZM4.63031 24.4936C4.90293 24.9739 5.51329 25.1423 5.99361 24.8697L13.8208 20.4272C14.3011 20.1546 14.4695 19.5443 14.1969 19.0639C13.9242 18.5836 13.3139 18.4152 12.8336 18.6879L5.87608 22.6367L1.92723 15.6792C1.65462 15.1989 1.04426 15.0305 0.563943 15.3031C0.0836291 15.5757 -0.0847477 16.1861 0.187863 16.6664L4.63031 24.4936ZM43.7049 1.52119C32.7389 -0.77401 23.9595 0.99522 17.3905 5.28788C10.8356 9.57127 6.58742 16.2977 4.53601 23.7341L6.46399 24.2659C8.41258 17.2023 12.4144 10.9287 18.4845 6.96211C24.5405 3.00476 32.7611 1.27399 43.2951 3.47877L43.7049 1.52119Z' fill='currentColor' className='fill-gray-300 dark:fill-neutral-700'/>
              </svg>
              <span
                className='mt-3 inline-block whitespace-nowrap text-[11px] leading-5 font-semibold tracking-wide uppercase bg-blue-600 text-white rounded-full py-1 px-2.5'
              >
                Save with annual subscription
              </span>
            </span>
          </span> */}
        </label>
      </div>
      {/* <!-- End Switch --> */}

      {/* <!-- Grid --> */}
      <div className='mt-12 w-full flex flex-col md:flex-row justify-center'>
        {products.map((prod) => (
          <PricingCard
            key={prod.id}
            highlighted
            title={prod.name}
            description={prod.description}
            buttonText='Select'
            highlightText={isAnnual && 'save with annual subscription'}
            price={price}
            features={prod.marketing_features}
            selected={selectedPriceId === price?.id}
            setSelectedPriceId={setSelectedPriceId}
          />
        ))}
      </div>
      {/* <!-- End Grid --> */}
    </div>
  );
};

PricingCardsGrid.propTypes = {
  products: PropTypes.array.isRequired,
  prices: PropTypes.array.isRequired,
  selectedPriceId: PropTypes.string,
  setSelectedPriceId: PropTypes.func.isRequired,
};
