import { useState, useEffect } from 'react';

import { Button } from '../components/Button';
import { ButtonLink } from '../components/ButtonLink';
import { Layout } from '../layout/Layout';
import { ListGroup } from '../components/ListGroup';
import { ListGroupItem } from '../components/ListGroupItem';
import { Typography } from '../components/Typography';
import { Input } from '../components/Input';
import { Table, TableRow } from '../components/Table';

import PlusIcon from '../icons/Plus';

import { useUserContext } from '../contexts/userContext';

export function Settings() {
  const [showTurnInput, setShowTurnInput] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [turnCredentialsList, setTurnCredentialsList] = useState([]);
  const [turnCredentialsInput, setTurnCredentialsInput] = useState({});

  const { isLoading, signOut, user } = useUserContext();
  const customerPortalLink = import.meta.env.VITE_STRIPE_CUSTOMER_PORTAL_URL;

  // TODO
  // - write new credentials to D1
  // - protect access based on role

  useEffect(() => {
    if (!user) {
      return;
    }
    const getPrivateTurnCredentials = async () => {
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
    };
    getPrivateTurnCredentials();
  }, [user]);

  // console.log('user', user);
  // console.log('turnCredentialsList', turnCredentialsList);

  const cancelTurnInput = () => {
    setShowTurnInput(false);
    setTurnCredentialsInput({});
  };

  const saveTurnInput = async () => {
    setIsSaving(true);
    // TODO write to D1
    cancelTurnInput();
    setIsSaving(false);
  };

  return (
    <Layout>
      <Typography style='h2' className='mb-0'>Account Settings</Typography>
      <Typography style='h4' className='text-gray-500 mt-1'>{user?.firstName} {user?.lastName}</Typography>
      <ListGroup className='max-w-full'>
        {user?.hasActiveSubscription ? (
          <>
            <ListGroupItem className='py-6' title='Private TURN Network'>
              {turnCredentialsList.length ? (
                <Table header={['URL', 'Username', 'Password', 'Request URL', 'API Key']}>
                  {turnCredentialsList.map(({ url, username, password, requestUrl, apiKey}) => (
                    <TableRow key={url || apiKey} items={[url, username, password, requestUrl, apiKey]} />
                  ))}
                </Table>
              ) : (
                <Typography style='body' className='mt-0 max-w-prose'>
                  You haven&apos;t added TURN network credentials yet.
                </Typography>
              )}
            </ListGroupItem>
            <ListGroupItem className='py-6' title='TURN network credentials'>
            <Typography style='body' className='mt-0 max-w-prose'>
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
                      disabled={isLoading || isSaving}
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
                <Button onClick={() => setShowTurnInput(true)}>
                  <PlusIcon />
                </Button>
              )}
            </ListGroupItem>
            <ListGroupItem className='py-6' title='Manage Subscription'>
              <Typography style='body' className='mt-0 max-w-prose'>
                Manage your current subscription through the Customer Portal.
              </Typography>
              <ButtonLink
                className='mx-auto mt-6 md:m-0 md:ml-6 w-full sm:max-w-72 h-10'
                label='Manage Subscription'
                disabled={!user?.hasActiveSubscription}
                to={customerPortalLink}
              />
            </ListGroupItem>
          </>
        ) : (
          <ListGroupItem className='py-6'>
            <Typography style='body' className='mt-0 max-w-prose'>
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
