import { createContext, useEffect, useState, useContext } from 'react';
import { useAuth } from '@workos-inc/authkit-react';
import PropTypes from 'prop-types';

const UserContext = createContext(true);

export const UserContextProvider = ({ children }) => {
  const { isLoading, signIn, signUp, signOut, user } = useAuth();
  const [updatedUser, setUpdatedUser] = useState();

  useEffect(() => {
    setUpdatedUser(user);
    if (!user) {
      return;
    }
    const getStripeData = async () => {
      const customer = await fetch(`${import.meta.env.VITE_API_BASE_URI}/api/get-customer/${user.id}`);
      const customerResp = await customer.json();

      const stripeCustomerId = customerResp?.id;
      let stripeSubscriptions;
      let hasActiveSubscription = false;
      if (stripeCustomerId) {
        const subscriptions = await fetch(`${import.meta.env.VITE_API_BASE_URI}/api/get-subscriptions/${stripeCustomerId}`);
        const respJson = await subscriptions.json();
        stripeSubscriptions = respJson?.subscriptions;
        hasActiveSubscription = stripeSubscriptions?.some((s) => ['active', 'trialing'].includes(s.status));
      }

      setUpdatedUser({ ...user, stripeCustomerId, stripeSubscriptions, hasActiveSubscription });
    };
    getStripeData();
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

export const useUserContext = () => {
  return useContext(UserContext);
}

UserContextProvider.propTypes = {
  children: PropTypes.func,
};
