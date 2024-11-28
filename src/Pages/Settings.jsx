import { useState, useEffect, useCallback } from 'react';

import { Button } from '../components/Button';
import { ButtonLink } from '../components/ButtonLink';
import { Layout } from '../layout/Layout';
import { ListGroup } from '../components/ListGroup';
import { ListGroupItem } from '../components/ListGroupItem';
import { Typography } from '../components/Typography';
import { Input } from '../components/Input';
import { Table, TableRow } from '../components/Table';

import PlusIcon from '../icons/Plus';
import RubbishBinIcon from '../icons/RubbishBin';

import { useUserContext } from '../contexts/userContext';

import entitlements from '../util/entitlements';

export function Settings() {
  const [showTurnInput, setShowTurnInput] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [turnCredentialsList, setTurnCredentialsList] = useState([]);
  const [turnCredentialsInput, setTurnCredentialsInput] = useState({});

  const { isLoading, signOut, user } = useUserContext();
  const customerPortalLink = import.meta.env.VITE_STRIPE_CUSTOMER_PORTAL_URL;

  const getPrivateTurnCredentials = useCallback(async () => {
    try {
      const resp = await fetch(`${import.meta.env.VITE_API_BASE_URI}/api/get-turn-credentials/${user.id}`);
      const { credentials } = await resp.json();

      if (credentials.success) {
        setTurnCredentialsList(credentials.results);
      } else {
        throw new Error(credentials.err);
      }
    } catch (err) {
      console.error(err);
    }
  }, [user?.id]);

  useEffect(() => {
    if (!user) {
      return;
    }
    getPrivateTurnCredentials();
  }, [user, getPrivateTurnCredentials]);

  const cancelTurnInput = () => {
    setShowTurnInput(false);
    setTurnCredentialsInput({});
  };

  const saveTurnInput = async () => {
    setIsSaving(true);
    try {
      const { url, username, password, requestUrl, apiKey } = turnCredentialsInput;
      const resp = await fetch(
        `${import.meta.env.VITE_API_BASE_URI}/api/add-turn-credentials/${user.id}`,
        {
          method: 'post',
          body: JSON.stringify({
            url: url || null,
            username: username || null,
            password: password || null,
            requestUrl: requestUrl || null,
            apiKey: apiKey || null,
          }),
        },
      );
      const result = await resp.json();
      if (result.success) {
        await getPrivateTurnCredentials();
      } else {
        throw new Error(result.err);
      }
    } catch (err) {
      console.error(err);
    } finally {
      cancelTurnInput();
      setIsSaving(false);
    }
  };

  const deleteTurnCredential = async (id) => {
    setIsSaving(true);
    try {
      const resp = await fetch(`${import.meta.env.VITE_API_BASE_URI}/api/delete-turn-credentials/${user.id}/${id}`);
      const result = await resp.json();
      if (result.success) {
        await getPrivateTurnCredentials();
      } else {
        throw new Error(result.err);
      }
    } catch (err) {
      console.error(err);
    } finally {
      cancelTurnInput();
      setIsSaving(false);
    }
  }

  const hasAccessToPrivateTurn = user?.accessToken?.entitlements?.find((e) => e === entitlements.PRIVATE_TURN_CREDENTIALS);

  return (
    <Layout>
      <Typography style='h2' className='mb-0'>Account Settings</Typography>
      <Typography style='h4' className='text-gray-500 mt-1'>{user?.firstName} {user?.lastName}</Typography>
      <Typography style='body' className='text-sm text-gray-500 mt-1'>{user?.email}</Typography>
      <ListGroup className='max-w-full'>
        <ListGroupItem className={`py-6 ${!hasAccessToPrivateTurn && 'text-gray-500'}`} title='Private TURN Network'>
          {turnCredentialsList.length ? (
            <Table header={['URL', 'Username', 'Request URL', 'API Key', 'Delete']}>
              {turnCredentialsList.map(({ id, url, username, requestUrl, apiKey }) => (
                <TableRow
                  key={`turn-credentials-${id}`}
                  id={`turn-credentials-${id}`}
                  items={[
                    url,
                    username,
                    requestUrl,
                    apiKey,
                    <Button
                      key={url}
                      disabled={isLoading || isSaving || !hasAccessToPrivateTurn}
                      onClick={() => deleteTurnCredential(id)}
                    >
                      <RubbishBinIcon />
                    </Button>
                  ]}
                />
              ))}
            </Table>
          ) : (
            <Typography style='body' className='mt-0 w-full text-md sm:max-w-prose text-left'>
              You haven&apos;t added TURN network credentials yet.
            </Typography>
          )}
        </ListGroupItem>
        <ListGroupItem className={`py-6 ${!hasAccessToPrivateTurn && 'text-gray-500'}`} title='TURN network credentials'>
          <Typography style='body' className='mt-0 w-full text-md sm:max-w-prose text-left'>
            Add new credentials.
          </Typography>
          {showTurnInput ? (
            <div className='w-full sm:max-w-72 space-y-3'>
              <Input
                id='turn-url'
                placeholder='URL'
                label='TURN server URL'
                required
                value={turnCredentialsInput.url}
                onChange={(ev) => setTurnCredentialsInput((prev) => { return { ...prev, url: ev.target.value } })}
                />
              <Input
                id='turn-username'
                placeholder='Username'
                label='TURN server username'
                value={turnCredentialsInput.username}
                onChange={(ev) => setTurnCredentialsInput((prev) => { return { ...prev, username: ev.target.value } })}
                />
              <Input
                id='turn-password'
                placeholder='Password'
                type='password'
                label='TURN server password'
                value={turnCredentialsInput.password}
                onChange={(ev) => setTurnCredentialsInput((prev) => { return { ...prev, password: ev.target.value } })}
                />
              <Input
                id='turn-request-url'
                placeholder='Request URL'
                label='Credentials request URL'
                value={turnCredentialsInput.requestUrl}
                onChange={(ev) => setTurnCredentialsInput((prev) => { return { ...prev, requestUrl: ev.target.value } })}
                />
              <Input
                id='turn-api-key'
                placeholder='API Key'
                label='Credentials API key'
                value={turnCredentialsInput.apiKey}
                onChange={(ev) => setTurnCredentialsInput((prev) => { return { ...prev, apiKey: ev.target.value } })}
              />
              <div className='w-full flex flex-row justify-between space-x-3'>
                <Button
                  highlight
                  className='flex-1'
                  disabled={isLoading || isSaving || !hasAccessToPrivateTurn}
                  onClick={saveTurnInput}
                >
                  Save
                </Button>
                <Button
                  className='text-redBad flex-1'
                  onClick={cancelTurnInput}
                >
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <div className='flex flex-col w-full sm:max-w-36 items-end space-y-3'>
              <Button
                className='w-full sm:max-w-20 h-10 flex justify-center'
                disabled={!hasAccessToPrivateTurn}
                onClick={() => setShowTurnInput(true)}
              >
                <PlusIcon />
              </Button>
              {!hasAccessToPrivateTurn && (
                <ButtonLink
                  className='mx-auto w-full min-w-28 h-10'
                  label='Get Access'
                  disabled={hasAccessToPrivateTurn}
                  to={user?.hasActiveSubscription ? customerPortalLink : '/pricing'}
                />
              )}
            </div>
          )}
        </ListGroupItem>
        {user?.hasActiveSubscription ? (
          <ListGroupItem className='py-6' title='Manage Subscription'>
            <Typography style='body' className='mt-0 w-full text-md sm:max-w-prose text-left'>
              Manage your current subscription through the Customer Portal.
            </Typography>
            <ButtonLink
              className='mx-auto mt-6 md:m-0 md:ml-6 w-full sm:max-w-72 h-10'
              label='Manage Subscription'
              disabled={!user?.hasActiveSubscription}
              to={customerPortalLink}
            />
          </ListGroupItem>
        ) : (
          <ListGroupItem className='py-6'>
            <Typography style='body' className='mt-0 w-full text-md sm:max-w-prose text-left'>
              You don&apos;t currently have an active subscription. Start a new subscription on the Pricing page.
            </Typography>
            <ButtonLink
              className='mx-auto mt-4 md:m-0 md:ml-6 w-full sm:max-w-72 h-10'
              label='Start A New Subscription'
              disabled={user?.hasActiveSubscription}
              to='/pricing'
            />
          </ListGroupItem>
        )}
        <ListGroupItem className='py-6'>
          <Button
            className='mx-auto md:m-0 w-full sm:max-w-72 h-10 text-redBad'
            onClick={() => signOut()}
            disabled={isLoading}
          >
            Sign Out
          </Button>
        </ListGroupItem>
      </ListGroup>
    </Layout>
  );
}
