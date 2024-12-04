import { NavLink } from "react-router-dom"
import PropTypes from "prop-types";

export function NavMenuItem({ label = '', to = '' }) {
  return (
    <NavLink
      className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-ipblue-800 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-300"
      to={to}
    >
      {label}
    </NavLink>
  )
}

NavMenuItem.propTypes = {
  label: PropTypes.string,
  to: PropTypes.string
};
