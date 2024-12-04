import PropTypes from 'prop-types';
import { twMerge } from 'tailwind-merge';

export const Typography = ({ style, children, className }) => {
  switch (style) {
    case 'body':
      return <p className={twMerge('mt-3 text-lg text-gray-800 text-inherit dark:text-neutral-400', className)}>{children}</p>;
    case 'h1':
      return (
        <h1
          className={twMerge('block text-3xl font-bold text-gray-800 text-inherit sm:text-4xl lg:text-6xl lg:leading-tight dark:text-white', className)}
        >
          {children}
        </h1>
      );
    case 'h2':
      return (
        <h2
          className={twMerge('my-8 text-3xl text-gray-800 text-inherit font-bold lg:text-4xl dark:text-white', className)}
        >
          {children}
        </h2>
      );
    case 'h3':
      return (
        <h3
          className={twMerge('mb-2 mt-6 text-2xl text-gray-800 text-inherit font-semibold lg:text-3xl dark:text-white', className)}
        >
          {children}
        </h3>
      );
    case 'h4':
      return (
        <h4
          className={twMerge('mb-2 mt-6 text-xl text-gray-800 text-inherit font-semibold lg:text-2xl dark:text-white', className)}
        >
          {children}
        </h4>
      );
    case 'small':
      return (
        <p className={twMerge('mt-3 text-gray-800 text-inherit dark:text-neutral-400', className)}>
          <small>{children}</small>
        </p>
      );
    default:
      return <p className={className}>{children}</p>;
  }
};

Typography.propTypes = {
  style: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.func,
};
