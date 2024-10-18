import PropTypes from 'prop-types';
import { twMerge } from 'tailwind-merge';

export const Skeleton = ({ className = '' }) => (
  <p className={twMerge('h-4 bg-gray-200 rounded-full dark:bg-neutral-700 w-2/5', className)} />
);

Skeleton.propTypes = {
  className: PropTypes.string,
};
