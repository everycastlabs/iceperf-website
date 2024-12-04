import PropTypes from 'prop-types';
import { twMerge } from 'tailwind-merge';

import { Typography } from '../components/Typography';

export const ListGroupItem = ({ className = '', title = '', children = null, ...rest }) => (
  <li
    className={twMerge('items-center gap-x-2 py-3 text-sm font-medium text-gray-800 dark:text-white', className)}
    {...rest}
  >
    {!!title && (
      <div className='w-full'>
        <Typography style='h4'>{title}</Typography>
      </div>
    )}
    <div className='inline-flex flex flex-col md:flex-row justify-center md:justify-between items-center w-full'>
      {children}
    </div>
  </li>
);

ListGroupItem.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
  children: PropTypes.func,
};
