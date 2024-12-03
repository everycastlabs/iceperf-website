import { useEffect, useState } from 'react';

import { TableCard } from '../components/TableCard';
import { Layout } from '../layout/Layout';
import { explanations } from "../constants"

import { useUserContext } from '../contexts/userContext';

export function Results() {
  const [providerData, setProviderData] = useState();
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
      setBestAndWorst(postsResp.bestAndWorstProvider);
    };

    getPosts();
  }, [user]);

  if (!providerData) {
    return <></>;
  }

  return (
    <Layout>
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
