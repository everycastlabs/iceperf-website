import { NavLink } from 'react-router-dom'
import PropTypes from 'prop-types';

export function NavItem({ to = '', label = '', current = false }) {
  if (current) {
    return (
      <NavLink className='' to={to} aria-current='page'>{label}</NavLink>
    )
  }
  return (
    <NavLink
      className={({ isActive }) => {
        return isActive ? 'font-medium sm:py-6 text-ipblue-800' : 'font-medium text-gray-800 hover:text-gray-500 sm:py-6 dark:text-neutral-200 dark:hover:text-neutral-400';
      }}
      to={to}
      aria-current='page'
    >
      {label}
    </NavLink>
  )
}

NavItem.propTypes = {
  label: PropTypes.string,
  to: PropTypes.string,
  current: PropTypes.bool
};
