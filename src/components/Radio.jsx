import PropTypes from 'prop-types';
import { twMerge } from 'tailwind-merge';

const Radio = ({ id, className = '', checked = false, label, onClick }) => (
  <div className={twMerge('flex', className)}>
    <input
      type='radio'
      name='hs-default-radio'
      className='shrink-0 mt-0.5 border-gray-200 rounded-full text-blue-600 focus:ring-ipblue-800 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-ipblue-800 dark:checked:border-ipblue-800 dark:focus:ring-offset-gray-800'
      id={id}
      checked={checked}
      onClick={onClick}
    />
    <label
      htmlFor={id}
      className='text-sm text-gray-500 text-inherit ms-2 dark:text-neutral-400'
    >
      {label}
    </label>
  </div>
);

Radio.propTypes = {
  className: PropTypes.string,
  id: PropTypes.string.isRequired,
  checked: PropTypes.bool,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

const RadioGroup = ({ className = '', children }) => (
  <div className={twMerge('flex gap-x-6', className)}>
    {children}
  </div>
);

RadioGroup.propTypes = {
  className: PropTypes.string,
  children: PropTypes.func,
};

export { Radio, RadioGroup };
