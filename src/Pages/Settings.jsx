import { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';

import { Button } from '../components/Button';
import { ButtonLink } from '../components/ButtonLink';
import { Layout } from '../layout/Layout';
import { ListGroup } from '../components/ListGroup';
import { ListGroupItem } from '../components/ListGroupItem';
import { Typography } from '../components/Typography';
import { Input } from '../components/Input';
import { Table, TableRow } from '../components/Table';
import { Radio, RadioGroup } from '../components/Radio';
import { Checkbox } from '../components/Checkbox';

import PlusIcon from '../icons/Plus';
import RubbishBinIcon from '../icons/RubbishBin';

import { useUserContext } from '../contexts/userContext';

import entitlements from '../util/entitlements';

const defaultCredentialsInput = {
  scheme: 'stun',
  transport: {
    udp: {},
    tcp: {},
    tls: {},
  },
};

export function Settings() {
  const [showCredentialsInput, setShowCredentialsInput] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [iceCredentialsList, setIceCredentialsList] = useState([]);
  const [iceCredentialsInput, setIceCredentialsInput] = useState(defaultCredentialsInput);

  const { isLoading, signOut, user } = useUserContext();
  const customerPortalLink = import.meta.env.VITE_STRIPE_CUSTOMER_PORTAL_URL;

  const getPrivateCredentials = useCallback(async () => {
    try {
      const resp = await fetch(`${import.meta.env.VITE_API_BASE_URI}/api/get-turn-credentials/${user.id}`);
      const { credentials } = await resp.json();

      if (credentials.success) {
        setIceCredentialsList(credentials.results);
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
    getPrivateCredentials();
  }, [user, getPrivateCredentials]);

  const cancelCredsInput = () => {
    setShowCredentialsInput(false);
    setIceCredentialsInput(defaultCredentialsInput);
  };

  const saveCredsInput = async () => {
    setIsSaving(true);
    try {
      const { url, username, password, requestUrl, apiKey } = iceCredentialsInput;
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
        await getPrivateCredentials();
      } else {
        throw new Error(result.err);
      }
    } catch (err) {
      console.error(err);
    } finally {
      cancelCredsInput();
      setIsSaving(false);
    }
  };

  const deleteTurnCredential = async (id) => {
    setIsSaving(true);
    try {
      const resp = await fetch(`${import.meta.env.VITE_API_BASE_URI}/api/delete-turn-credentials/${user.id}/${id}`);
      const result = await resp.json();
      if (result.success) {
        await getPrivateCredentials();
      } else {
        throw new Error(result.err);
      }
    } catch (err) {
      console.error(err);
    } finally {
      cancelCredsInput();
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
        <ListGroupItem
          className={`py-6 ${!hasAccessToPrivateTurn && 'text-gray-500'}`}
          title='Private ICE Servers Network'
        >
          <div>
            {iceCredentialsList.length ? (
              // <Table header={['URL', 'Username', 'Request URL', 'API Key', 'Delete']}>
              <Table header={['URL', 'Username', 'Delete']}>
                {iceCredentialsList.map(({ id, url, username }) => (
                  <TableRow
                    key={`ice-credentials-${id}`}
                    id={`ice-credentials-${id}`}
                    items={[
                      url,
                      username,
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
                You haven&apos;t added ICE server credentials yet.
              </Typography>
            )}
            <div>
              <Typography style='h4' className='mt-3 mb-2 w-full text-lg sm:max-w-prose text-left'>
                Add new credentials
              </Typography>
              {showCredentialsInput ? (
                <InputCredentialsForm
                  iceCredentialsInput={iceCredentialsInput}
                  setIceCredentialsInput={setIceCredentialsInput}
                  saveCredsInput={saveCredsInput}
                  cancelCredsInput={cancelCredsInput}
                  isLoading={isLoading}
                  isSaving={isSaving}
                  hasAccessToPrivateTurn={hasAccessToPrivateTurn}
                />
              ) : (
                <div className='flex w-full sm:max-w-36 items-end space-x-3'>
                  <Button
                    className='w-full sm:max-w-20 h-10 flex justify-center'
                    disabled={!hasAccessToPrivateTurn}
                    onClick={() => setShowCredentialsInput(true)}
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
            </div>
          </div>
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

// TODO only allow one stun and one turn domain!



const InputCredentialsForm = ({
  iceCredentialsInput,
  setIceCredentialsInput,
  saveCredsInput,
  cancelCredsInput,
  isLoading,
  isSaving,
  hasAccessToPrivateTurn,
  canAddStunServer = true, // TODO
  canAddTurnServer = true, // TODO
}) => {
  const {
    scheme: inputScheme, domain, transport: inputTransport } = iceCredentialsInput;
  return (
    <div className='w-full sm:max-w-72 space-y-3'>
      <Typography>Scheme</Typography>
      <RadioGroup>
        {['stun', 'turn'].map((scheme) => {
          let disabled = false;
          if (
            scheme === 'stun' && !canAddStunServer ||
            scheme === 'turn' && !canAddTurnServer
          ) {
            disabled = true;
          }
          return (
            <Radio
              key={`radio-${scheme}`}
              id={`radio-${scheme}`}
              name='scheme-selection'
              label={scheme.toUpperCase()}
              checked={inputScheme === scheme}
              disabled={disabled}
              onClick={() => setIceCredentialsInput((prev) => {
                prev.scheme = scheme;
                if (scheme === 'stun') {
                  prev.transport.tcp = {};
                  prev.transport.tls = {};
                }
                return { ...prev }
              })}
            />
          );
        })}
      </RadioGroup>
      <Input
        id='ice-server-domain'
        placeholder='Domain'
        label='ICE server domain'
        required
        value={domain}
        onChange={(ev) => setIceCredentialsInput((prev) => { return { ...prev, domain: ev.target.value } })}
      />
      <Typography>Transport</Typography>
      {['udp', 'tcp', 'tls'].map((transport) => (
        <div className='w-full flex gap-x-6 items-center h-12' key={`ports-${transport}`}>
          <Checkbox
            id='checkbox-udp'
            label={transport.toUpperCase()}
            checked={inputTransport[transport].enabled}
            disabled={transport !== 'udp' && inputScheme === 'stun'}
            onClick={(ev) => setIceCredentialsInput((prev) => {
              prev.transport[transport].enabled = ev.target.checked;
              return { ...prev }
            })}
          />
          {inputTransport[transport].enabled && (
            <Input
              id={`${transport}-transport-port`}
              placeholder='3478'
              label='Port'
              disabled={transport !== 'udp' && inputScheme === 'stun'}
              value={inputTransport[transport].port}
              onChange={(ev) => setIceCredentialsInput((prev) => {
                prev.transport[transport].port = ev.target.value.replace(/[^0-9]/g, '');
                return { ...prev }
              })}
            />
          )}
        </div>
      ))}
      <Typography>Authentication</Typography>
      <Input
        id='turn-username'
        placeholder='Username'
        label='TURN server username'
        value={iceCredentialsInput.username}
        onChange={(ev) => setIceCredentialsInput((prev) => { return { ...prev, username: ev.target.value } })}
      />
      <Input
        id='turn-password'
        placeholder='Password'
        type='password'
        label='TURN server password'
        value={iceCredentialsInput.password}
        onChange={(ev) => setIceCredentialsInput((prev) => { return { ...prev, password: ev.target.value } })}
      />
      {/* <Typography>Authorization</Typography> */}
      {/* <Input
      id='turn-request-url'
      placeholder='Request URL'
      label='Credentials request URL'
      value={iceCredentialsInput.requestUrl}
      onChange={(ev) => setIceCredentialsInput((prev) => { return { ...prev, requestUrl: ev.target.value } })}
      />
    <Input
      id='turn-api-key'
      placeholder='API Key'
      label='Credentials API key'
      value={iceCredentialsInput.apiKey}
      onChange={(ev) => setIceCredentialsInput((prev) => { return { ...prev, apiKey: ev.target.value } })}
    /> */}

      {!!iceCredentialsInput.domain && (
        <>
          <Typography>Adding the following ICE servers:</Typography>
          {Object.keys(inputTransport).map((transport) => {
            if (!inputTransport[transport].enabled) {
              return null;
            }
            return (
              <Typography
                key={`preview-${inputScheme}-${transport}`}
                style='body'
                className='text-sm text-gray-500 mt-1'
              >
                {previewServerURL({ scheme: inputScheme, domain, transport, port: inputTransport[transport].port})}
              </Typography>
            )
          })}
        </>
      )}

      <div className='w-full flex flex-row justify-between space-x-3'>
        <Button
          highlight
          className='flex-1'
          disabled={isLoading || isSaving || !hasAccessToPrivateTurn}
          onClick={saveCredsInput}
        >
          Save
        </Button>
        <Button
          className='text-redBad flex-1'
          onClick={cancelCredsInput}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
};

InputCredentialsForm.propTypes = {
  iceCredentialsInput: PropTypes.object,
  setIceCredentialsInput: PropTypes.func,
  saveCredsInput: PropTypes.func,
  cancelCredsInput: PropTypes.func,
  isLoading: PropTypes.bool,
  isSaving: PropTypes.bool,
  canAddStunServer: PropTypes.bool,
  canAddTurnServer: PropTypes.bool,
  hasAccessToPrivateTurn: PropTypes.bool,
}

const previewServerURL = ({ scheme, domain, transport, port }) => {
  let preview = '';
  if (scheme === 'stun') {
    preview = `${scheme}:${domain}:${port}`;
  } else if (scheme === 'turn') {
    if (transport === 'udp') {
      preview = `${scheme}:${domain}:${port}?transport=udp`;
    } else if (transport === 'tcp') {
      preview = `${scheme}:${domain}:${port}?transport=tcp`;
    } else if (transport === 'tls') {
      preview = `turns:${domain}:${port}?transport=tcp`;
    }
  }
  return preview;
}
