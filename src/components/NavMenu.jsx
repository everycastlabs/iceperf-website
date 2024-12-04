import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'

export function NavMenu({ children = null, label = '', to }) {
  return (
    <div className='hs-dropdown [--strategy:static] sm:[--strategy:fixed] [--adaptive:none] sm:[--trigger:hover] sm:py-4'>
      <Link
        className='flex items-center w-full text-gray-800 hover:text-gray-500 font-medium dark:text-neutral-200 dark:hover:text-neutral-400'
        to={to}
      >
        {label}
        <svg className='flex-shrink-0 ms-2 size-4' xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'><path d='m6 9 6 6 6-6'/></svg>
      </Link>
      <div className='hs-dropdown-menu transition-[opacity,margin] duration-[0.1ms] sm:duration-[150ms] hs-dropdown-open:opacity-100 opacity-0 sm:w-48 hidden z-10 bg-white sm:shadow-md rounded-lg p-2 dark:bg-neutral-800 sm:dark:border dark:border-neutral-700 dark:divide-neutral-700 before:absolute top-full sm:border before:-top-5 before:start-0 before:w-full before:h-5'>
        {children}
      </div>
    </div>
  )
}

NavMenu.propTypes = {
  label: PropTypes.string,
  to: PropTypes.string,
  children: PropTypes.array
};
