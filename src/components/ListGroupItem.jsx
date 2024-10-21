import PropTypes from 'prop-types';
import { twMerge } from 'tailwind-merge';

export const ListGroupItem = ({ className = '', children = null, ...rest }) => (
  <li
    className={twMerge('inline-flex items-center gap-x-2 py-3 text-sm font-medium text-gray-800 dark:text-white', className)}
    {...rest}
  >
    <div className='flex flex-col md:flex-row justify-center md:justify-between items-center w-full'>
      {children}
    </div>
  </li>
);

ListGroupItem.propTypes = {
  className: PropTypes.string,
  children: PropTypes.func,
};
