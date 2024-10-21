import PropTypes from 'prop-types';
import { twMerge } from 'tailwind-merge';
import { Link as RRDLink } from 'react-router-dom'

export const Link = ({ to = '', className = '', children = null, ...rest }) => (
  <RRDLink
    to={to}
    className={twMerge('text-ipblue-800 dark:text-ipblue-100 underline hover:opacity-80', className)}
    {...rest}
  >
    {children}
  </RRDLink>
);

Link.propTypes = {
  to: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.func,
};
