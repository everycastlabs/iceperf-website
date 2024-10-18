import { createContext, useEffect, useState } from 'react';
import { useAuth } from '@workos-inc/authkit-react';
import PropTypes from 'prop-types';

export const UserContext = createContext(true);

export const UserContextProvider = ({ children }) => {
  const { isLoading, signIn, signUp, signOut, user } = useAuth();
  const [updatedUser, setUpdatedUser] = useState();

  useEffect(() => {
    setUpdatedUser(user);
    if (!user) {
      return;
    }
    const getStripeCustomer = async () => {
      const customer = await fetch(`${import.meta.env.VITE_API_BASE_URI}/api/get-customer/${user.id}`);
      const customerResp = await customer.json();
      setUpdatedUser({ ...user, stripeCustomerId: customerResp?.id })
    };
    getStripeCustomer();
  }, [user]);

  return (
    <UserContext.Provider
      value={{
        isLoading,
        signIn,
        signUp,
        signOut,
        user: updatedUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

UserContextProvider.propTypes = {
  children: PropTypes.func,
};
