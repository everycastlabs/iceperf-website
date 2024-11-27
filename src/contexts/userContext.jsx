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
        let activeSubscription;
        if (stripeCustomerId) {
          const req = await fetch(`${import.meta.env.VITE_API_BASE_URI}/api/get-active-subscription/${stripeCustomerId}`);
          const activeSubJson = await req.json();
          activeSubscription = activeSubJson?.subscription;
        }

        const accessToken = await getAccessToken();
        const decoded = decodeJwt(accessToken);

        setUpdatedUser({
          ...user,
          stripeCustomerId,
          activeSubscription,
          hasActiveSubscription: !!activeSubscription,
          accessToken: decoded,
        });
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
