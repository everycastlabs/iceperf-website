import PropTypes from 'prop-types';
import { twMerge } from 'tailwind-merge';

export const Button = ({ children = null, onClick = ()=>{}, className = '', disabled = false, highlight = false, ...props }) => {
  return (
    <button
      type='button'
      className={twMerge(`text-sm px-4 py-2 font-semibold rounded-lg border border-gray-200 text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:border-neutral-700 dark:hover:bg-neutral-700 ${highlight && 'border-transparent bg-ipblue-900 text-white hover:bg-ipblue-800'}`, className)}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
        {children}
    </button>
  )
}

Button.propTypes = {
  children: PropTypes.func,
  onClick: PropTypes.func,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  highlight: PropTypes.bool,
};
