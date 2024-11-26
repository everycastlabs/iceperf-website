import { createContext, useEffect, useState, useContext } from 'react';
import { useAuth } from '@workos-inc/authkit-react';
import PropTypes from 'prop-types';
import { decodeJwt } from 'jose';

const UserContext = createContext(true);

export const UserContextProvider = ({ children }) => {
  const { isLoading, signIn, signUp, signOut, user, getAccessToken } = useAuth();
  const [updatedUser, setUpdatedUser] = useState();

  useEffect(() => {
    setUpdatedUser(user);
    if (!user) {
      return;
    }
    const getStripeData = async () => {
      try {
        const customer = await fetch(`${import.meta.env.VITE_API_BASE_URI}/api/get-customer/${user.id}`);
        const customerResp = await customer.json();

        if (customerResp.err) {
          throw new Error(customerResp.err);
        }

        const stripeCustomerId = customerResp?.id;
        let stripeSubscriptions;
        let hasActiveSubscription = false;
        let accessToken;
        let decoded;
        if (stripeCustomerId) {
          const subscriptions = await fetch(`${import.meta.env.VITE_API_BASE_URI}/api/get-subscriptions/${stripeCustomerId}`);
          const respJson = await subscriptions.json();
          stripeSubscriptions = respJson?.subscriptions;
          hasActiveSubscription = stripeSubscriptions?.some((s) => ['active', 'trialing'].includes(s.status));
          accessToken = await getAccessToken();
          decoded = decodeJwt(accessToken);
        }

        setUpdatedUser({ ...user, stripeCustomerId, stripeSubscriptions, hasActiveSubscription, accessToken: decoded });
      } catch (err) {
        console.error(err);
      }
    };
    getStripeData();
  }, [user, getAccessToken]);

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
