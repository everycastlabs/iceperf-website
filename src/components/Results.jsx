import { useEffect, useState } from 'react';

import { TableCard } from '../components/TableCard';
import { ListGroup } from '../components/ListGroup';
import { ListGroupItem } from '../components/ListGroupItem';
import { Typography } from '../components/Typography';
import { ButtonLink } from '../components/ButtonLink';
import { Layout } from '../layout/Layout';
import { explanations } from "../constants"
import entitlements from '../util/entitlements';

import { useUserContext } from '../contexts/userContext';

export function Results() {
  const [providerData, setProviderData] = useState();
  const [privateData, setPrivateData] = useState();
  const [bestAndWorst, setBestAndWorst] = useState();

  const { user } = useUserContext();

  useEffect(() => {
    const getPosts = async () => {
      const opts = user?.accessToken ? { headers: { Authorization: `Bearer ${user?.accessToken}` } } : null;
      const resp = await fetch(`${import.meta.env.VITE_API_BASE_URI}/api/results`, opts);
      const postsResp = await resp.json();
      // rearrange data this way:
      /*
        {
          avgTurnLatency: {
            cloudflare: {
              udp: 38.1,
              tcp: 35.7,
              tls: 36.4,
            },
            twilio: { ... },
          },
          maxTurnThroughput: {
            cloudflare: {
              udp: 54.4,
              tcp: 35.5,
              tls: 35.3
            },
            twilio: { ... },
          },
          ...
        }
      */
      if (!postsResp?.providerData) {
        return;
      }

      const providerResults = {};
      Object.keys(explanations).forEach((field) => {
        providerResults[field] = {};
        Object.keys(postsResp.providerData).forEach((provider) => {
          providerResults[field][provider] = postsResp.providerData[provider].data[field];
        });
      });
      setProviderData(providerResults);
      setPrivateData(postsResp.privateData);
      setBestAndWorst(postsResp.bestAndWorstProvider);
    };

    getPosts();
  }, [user]);

  if (!providerData) {
    return <></>;
  }

  // console.log(user)
  const hasAccessToPrivateIce = user?.decodedToken?.entitlements?.find((e) => e === entitlements.PRIVATE_TURN_CREDENTIALS);

  return (
    <Layout>
      {!Object.keys(privateData).length && (
        <ListGroup className='max-w-full bg-ipblue-100 px-3 rounded-md'>
          <ListGroupItem className='py-6'>
            <Typography style='h4' className='my-0 w-full text-md sm:text-lg sm:max-w-prose text-left text-ipblue-900'>
              Test your private network with ICEPerf.com
            </Typography>
            <ButtonLink
              className='mx-auto mt-6 md:m-0 md:ml-6 w-full sm:max-w-72 h-10'
              label='Manage Subscription'
              to={hasAccessToPrivateIce ? '/settings' : '/pricing'}
            />
          </ListGroupItem>
        </ListGroup>
      )}

      {Object.keys(explanations).map((field) => {
        const metric = explanations[field];
        return (
        <TableCard
          key={field}
          title={metric.title}
          description={metric.description}
          field={field}
          providerData={providerData[field]}
          bestAndWorst={bestAndWorst[field]}
        />
      )})}
    </Layout>
  );
}
