import { createContext, useEffect, useState, useContext } from 'react';
import { useAuth } from '@workos-inc/authkit-react';
import PropTypes from 'prop-types';
import { decodeJwt } from 'jose';

import entitlements from '../util/entitlements';

const UserContext = createContext(true);

export const UserContextProvider = ({ children }) => {
  const { isLoading, signIn, signUp, signOut, user, getAccessToken } = useAuth();
  const [updatedUser, setUpdatedUser] = useState();

  useEffect(() => {
    setUpdatedUser(user);
    if (!user) {
      return;
    }
    const getUserData = async () => {
      const accessToken = await getAccessToken();

      if (!accessToken) {
        return;
      }

      // TODO get Stripe customer and sub in a single endpoint!
      try {
        const customer = await fetch(`${import.meta.env.VITE_API_BASE_URI}/api/get-customer/${user.id}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
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

        const decodedToken = decodeJwt(accessToken);

        const hasAccessToPrivateIce = decodedToken?.entitlements?.find((e) => e === entitlements.PRIVATE_TURN_CREDENTIALS);

        setUpdatedUser({
          ...user,
          stripeCustomerId,
          activeSubscription,
          hasActiveSubscription: !!activeSubscription,
          accessToken,
          decodedToken,
          hasAccessToPrivateIce,
        });
      } catch (err) {
        console.error(err);
      }
    };
    getUserData();
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
