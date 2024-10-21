import PropTypes from 'prop-types';
import { twMerge } from 'tailwind-merge';

export const ListGroup = ({ className = '', children = null, ...rest }) => (
  <ul
    className={twMerge('max-w-xs flex flex-col divide-y divide-gray-200 dark:divide-neutral-700', className)}
    {...rest}
  >
    {children}
  </ul>
);

ListGroup.propTypes = {
  className: PropTypes.string,
  children: PropTypes.func,
};
