import PropTypes from 'prop-types';

import { Button } from './Button';
import { Skeleton } from './Skeleton';

export const PricingCard = ({
  highlighted = false,
  highlightText,
  title,
  description,
  buttonText,
  price,
  features,
  selected = false,
  setSelectedPriceId,
}) => (
  <div className={`flex flex-col text-center rounded-xl p-8 mx-6 max-w-full md:max-w-60 ${highlighted ? 'border-2 border-ipblue-900 shadow-xl  dark:border-ipblue-800' : 'border border-gray-200 dark:border-neutral-800'}`}>
    {!!highlightText && (
      <p className='mb-3'>
      <span className='inline-flex items-center gap-1.5 py-1.5 px-3 rounded-lg text-xs uppercase font-semibold bg-ipblue-100 text-ipblue-900 dark:bg-ipblue-900 dark:text-white'>
        {highlightText}
      </span>
      </p>
    )}
    <h4 className='font-medium text-lg text-gray-800 dark:text-neutral-200'>
      {title}
    </h4>
    <span className='mt-5 font-bold text-5xl text-gray-800 dark:text-neutral-200'>
      {price ? (
        <>
          <span className='font-bold text-2xl -me-2'>&pound;</span>
          {' '}
          {price.unit_amount / 100}
          {' '}
          <span className='text-sm text-gray-500 dark:text-neutral-500'>ex. VAT</span>
        </>
      ) : <Skeleton />}
    </span>
    {!!description && (
      <p className='mt-2 text-sm text-gray-500 dark:text-neutral-500'>
        {description}
      </p>
    )}

    {!!features.length && (
      <ul className='mt-7 space-y-2.5 text-sm'>
        {features.map((feature) => (
          <li
            key={feature.name}
            className='flex gap-x-2 text-left'
          >
            <svg className='shrink-0 mt-0.5 size-4 text-blue-600 dark:text-blue-500' xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'><polyline points='20 6 9 17 4 12'/></svg>
            <span className='text-gray-800 dark:text-neutral-400'>
              {feature.name}
            </span>
          </li>
        ))}
      </ul>
    )}

    <Button
      className={`mt-5 py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border focus:outline-none disabled:opacity-50 disabled:pointer-events-none`}
      onClick={() => setSelectedPriceId(!selected ? price?.id : null)}
      disabled={!price?.id}
      highlight={!selected}
    >
      {buttonText}
    </Button>
  </div>
);

PricingCard.propTypes = {
  highlighted: PropTypes.bool,
  highlightText: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  buttonText: PropTypes.string.isRequired,
  price: PropTypes.object.isRequired,
  features: PropTypes.array,
  selected: PropTypes.bool.isRequired,
  setSelectedPriceId: PropTypes.func.isRequired,
};
