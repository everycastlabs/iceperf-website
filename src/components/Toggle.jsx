import PropTypes from 'prop-types';

// This Toggle is completely controlled from the parent component
export const Toggle = ({ checked, onClick }) => (
  <input
    type='checkbox'
    className='relative w-[3.25rem] h-7 p-px bg-gray-100 border-transparent text-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:ring-ipblue-900 disabled:opacity-50 disabled:pointer-events-none checked:bg-none checked:text-ipblue-900 checked:border-ipblue-900 focus:checked:border-ipblue-900 dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-ipblue-800 dark:checked:border-ipblue-800 dark:focus:ring-offset-gray-600 before:inline-block before:size-6 before:bg-white checked:before:bg-white before:translate-x-0 checked:before:translate-x-full before:rounded-full before:shadow before:transform before:ring-0 before:transition before:ease-in-out before:duration-200 dark:before:bg-neutral-400 dark:checked:before:bg-white'
    checked={checked}
    onClick={onClick}
  />
);

Toggle.propTypes = {
  checked: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};
