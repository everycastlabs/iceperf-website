import PropTypes from 'prop-types';
import { twMerge } from 'tailwind-merge';


export const Input = ({ id, className = '', type = 'text', required = false, placeholder = '', label = '', value, onChange }) => (
  <div className={twMerge('relative', className)}>
    <input
      type={type}
      required={required}
      id={`hs-floating-input-${id}`}
      className='peer p-4 block w-full border-gray-200 rounded-lg text-sm placeholder:text-transparent focus:border-ipblue-900 focus:ring-ipblue-900 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:focus:ring-neutral-600 focus:pt-6 focus:pb-2 [&:not(:placeholder-shown)]:pt-6 [&:not(:placeholder-shown)]:pb-2 autofill:pt-6 autofill:pb-2'
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
    <label
      htmlFor={`hs-floating-input-${id}`}
      className='absolute top-0 start-0 p-4 h-full text-sm truncate pointer-events-none transition ease-in-out duration-100 border border-transparent  origin-[0_0] dark:text-white peer-disabled:opacity-50 peer-disabled:pointer-events-none peer-focus:scale-90 peer-focus:translate-x-0.5 peer-focus:-translate-y-1.5 peer-focus:text-gray-500 dark:peer-focus:text-neutral-500 peer-[:not(:placeholder-shown)]:scale-90 peer-[:not(:placeholder-shown)]:translate-x-0.5 peer-[:not(:placeholder-shown)]:-translate-y-1.5 peer-[:not(:placeholder-shown)]:text-gray-500 dark:peer-[:not(:placeholder-shown)]:text-neutral-500 dark:text-neutral-500'
    >
      {label}
    </label>
    {/* {type === 'password' && (
      // TODO icon button to show password when clicked. Changes the type to text
      <button
        className='absolute inset-y-0 end-2 flex items-center pointer-events-none ps-2 pt-4 cursor-pointer peer-disabled:opacity-50 peer-disabled:pointer-events-none invisible peer-focus:visible peer-[:not(:placeholder-shown)]:visible'
        onClick={() => {}}
      >
        <svg className='shrink-0 size-4 text-gray-500 dark:text-neutral-500' xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
          <path d='M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2'></path>
          <circle cx='12' cy='7' r='4'></circle>
        </svg>
      </button>
    )} */}
  </div>
);

Input.propTypes = {
  id: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  className: PropTypes.string,
  type: PropTypes.string,
  required: PropTypes.bool,
  placeholder: PropTypes.string,
  label: PropTypes.string,
};
