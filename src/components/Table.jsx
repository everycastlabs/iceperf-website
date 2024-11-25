import PropTypes from 'prop-types';
import { twMerge } from 'tailwind-merge';

export const Table = ({ className = '', header, children }) => (
  <div className={twMerge('flex flex-col', className)}>
    <div className='-m-1.5 overflow-x-auto'>
      <div className='p-1.5 min-w-full inline-block align-middle'>
        <div className='overflow-hidden'>
          <table className='min-w-full divide-y divide-gray-200 dark:divide-neutral-700'>
            {!!header?.length && (
              <thead>
                <tr>
                  {header.map((item) => (
                    <th key={item}  scope='col' className='px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500'>
                      {item}
                    </th>
                  ))}
                </tr>
              </thead>
            )}
            <tbody className='divide-y divide-gray-200 dark:divide-neutral-700'>
              {children}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
);

export const TableRow = ({ className, items }) => (
  <tr className={className}>
    {!!items?.length && items.map((item) => (
      <td
        key={item}
        className='px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200'
      >
        {item}
      </td>
    ))}
  </tr>
);

Table.propTypes = {
  children: PropTypes.func,
  className: PropTypes.string,
  header: PropTypes.array,
};

TableRow.propTypes = {
  className: PropTypes.string,
  items: PropTypes.array,
};
