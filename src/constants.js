export const providersList = {
  'your-network': {
    name: 'Your Network',
    description: 'User\'s private ICE network, tested by ICEPerf.com',
    isOSSProject: false,
    isPrivate: true,
    throughputFields: ['tcp', 'tls', 'udp'],
  },
  cloudflare: {
    name: 'Cloudflare',
    description: `
Cloudflare is a global leader in internet security and performance, with over 300 points of presence worldwide. Their Calls product supports a global TURN network. Pricing for Cloudflare's TURN service is straightforward, with charges based on usage: $0.05 per real-time GB on egress to a turn client only. Cloudflare Calls has a combined 1TB free allowance.

Cloudflare offers a TURN credential API as well as analytics on usage via their analytics graphql API.

For more details, visit Cloudflare's [TURN documentation](https://developers.cloudflare.com/calls/turn/)

Cloudflare are adding new features to their service all the time. Features such as being able to set a custom identifier on a turn credential make reporting on a specific user's usage easier.

Cloudlfare's TURN service is currently in beta. Cloudflare's TURN service does not utilise their nodes in China. Users in China would connect to a node outside of China.

We test Cloudflare's TURN service using their 1TB free allowance.`,
    isOSSProject: false,
    throughputFields: ['tcp', 'tls', 'udp'],
    features: {
      'ipv6-candidates': false,
      '2fa': {
        types: ['totp', 'passkey', 'security-key'],
        bool: true
      },
      'analysis-api': {
        bool: true,
        value: "Updated after 30s"
      },
      'credential-api': true,
      'revoke-api-credential': true,
      'shared-secret-auth': false,
      'free-tier': {
        bool: true,
        value: '1TB'
      },
      locations: {
        link: 'https://www.cloudflare.com/en-gb/network/',
        text: "300+"
      },
      'location-based-routing': true,
      'pay-per-gb': true,
      'overage': {
        value: '0.05',
        currency: '$'
      },
      'billing-model': 'egress-to-turn-client',
      'firewall-busting-ports': {
        bool: true,
        ports: {
          'tcp': 80,
          'tls': 443,
          'udp': 53
        }
      },
      'whitelabel-own-domain': {
        protocols: ['udp', 'tcp'],
        bool: true,
      },
      'documented-ips': {
        bool: true,
        link: 'https://developers.cloudflare.com/calls/turn/faq/#i-need-to-allowlist-whitelist-cloudflare-calls-turn-ip-addresses-which-ip-addresses-should-i-use'
      },
      'documentation-url': {
        link: 'https://developers.cloudflare.com/calls/turn'
      }
    },
  },
  xirsys: {
    name: 'Xirsys',
    description: `
[Xirsys](https://xirsys.com) is one of the two longest running TURN networks. They have infrastructure in 9 regions around the world.

Xirsys offer a 500 MB free tier, capped to a single region. Their plans range from $33 per month to $499 per month with overage pricing. Their overage pricing ranges from $0.50/GB to $0.09/GB.

We test Xirsys with a gisted Elite Plan.
`,
    isOSSProject: false,
    throughputFields: ['tcp', 'tls', 'udp'],
    features: {
      'ipv6-candidates': false,
      '2fa': {
        bool: false
      },
      'analysis-api': {
        bool: true,
        value: "Updated after 15s"
      },
      'credential-api': true,
      'revoke-api-credential': false,
      'shared-secret-auth': false,
      'free-tier': {
        bool: true,
        value: '500MB'
      },
      locations: {
        link: 'https://xirsys.com/pricing/',
        text: "11"
      },
      'location-based-routing': true,
      'pay-per-gb': false,
      'overage': {
        value: '0.50 - 0.09',
        currency: '$'
      },
      'billing-model': 'TBC',
      'firewall-busting-ports': {
        bool: true,
        ports: {
          'tcp': 80,
          'tls': 443,
          'udp': 80
        }
      },
      'whitelabel-own-domain': {
        bool: false,
      },
      'documented-ips': {
        bool: true,
        link: 'https://docs.xirsys.com/?pg=ip-whitelist'
      },
      'documentation-url': {
        link: 'https://docs.xirsys.com/'
      }
    },
  },
  twilio: {
    name: 'Twilio',
    description: `
Twilio's **Network Traversal Service (NTS)** is probably the most well known service. It's pay per GB model with no upfront monthly commitment makes it very easy to get started with. They operate in 9 regions globally.

For more information, visit Twilio's [NTS documentation](https://www.twilio.com/docs/stun-turn)

Their pricing varies depending on which location your data is relayed through. This ranges from $0.40 / GB to $0.80 / GB

We test Twilio with gifted credit.`,
    isOSSProject: false,
    throughputFields: ['tcp', 'tls', 'udp'],
    features: {
      'ipv6-candidates': false,
      '2fa': {
        bool: true,
        types: ['totp'],
      },
      'analysis-api': {
        bool: true,
        value: "Unknown",
        link: "https://www.twilio.com/docs/usage/api/usage-record"
      },
      'credential-api': true,
      'revoke-api-credential': false,
      'shared-secret-auth': false,
      'free-tier': {
        bool: false,
      },
      locations: {
        link: 'https://www.twilio.com/docs/stun-turn/regions',
        text: "9"
      },
      'location-based-routing': true,
      'pay-per-gb': true,
      'overage': {
        value: '0.40 - 0.80',
        currency: '$'
      },
      'billing-model': 'TBC',
      'firewall-busting-ports': {
        bool: true,
        ports: {
          'tls': 443,
        }
      },
      'whitelabel-own-domain': {
        bool: false,
      },
      'documented-ips': {
        bool: true,
        link: 'https://www.twilio.com/docs/stun-turn/regions'
      },
      'documentation-url': {
        link: 'https://www.twilio.com/docs/stun-turn'
      }
    },
  },
  metered: {
    name: 'Metered',
    description: `
[Metered](https://www.metered.ca/stun-turn) are a fairly new player in this market compared to Twilio and Xirsys. They operate in 9 locations globally.

Metered offers a 500 MB free tier without overages. Their plans range from $99 per month to $499 per month with overage pricing. Their overage pricing ranges from $0.40/GB to $0.10/GB.`,
    isOSSProject: false,
    throughputFields: ['tcp', 'tls', 'udp'],
    features: {
      'ipv6-candidates': false,
      '2fa': {
        bool: false
      },
      'analysis-api': {
        bool: true,
        value: "Updated after TBC",
        link: "https://www.metered.ca/docs/turn-rest-api/get-current-usage-by-user/"
      },
      'credential-api': true,
      'revoke-api-credential': true,
      'shared-secret-auth': false,
      'free-tier': {
        bool: true,
        value: '500MB'
      },
      locations: {
        link: 'https://www.metered.ca/docs/turnserver-guides/turnserver-regions',
        text: "22"
      },
      'location-based-routing': true,
      'pay-per-gb': false,
      'overage': {
        value: '0.40 - 0.10',
        currency: '$'
      },
      'billing-model': 'TBC',
      'firewall-busting-ports': {
        bool: true,
        ports: {
          'tcp': 80,
          'tls': 443,
          'udp': 80
        }
      },
      'whitelabel-own-domain': {
        bool: false,
      },
      'documented-ips': {
        bool: false,
      },
      'documentation-url': {
        link: 'https://www.metered.ca/docs/turn-rest-api/get-credential'
      }
    },
  },
  expressturn: {
    name: 'ExpressTURN',
    description: `
[ExpressTURN](https://www.expressturn.com) is one of the new platforms available to users. They operate in 10 regions globally.

While their documetation suggests they offer 1TB of transfer in their free tier; our tests would stop working until ExpressTURN gifted us their Premium tier, suggesting their free tier is not 1TB.

ExpressTURN's pricing is very simple. They offer a free tier. Their Premium tier is $9 a month for 5TB of data transfer.

We test ExpressTURN with a gifted Premium tier.`,
    isOSSProject: false,
    throughputFields: ['tcp', 'udp'],
    features: {
      'ipv6-candidates': false,
      '2fa': {
        bool: false
      },
      'analysis-api': {
        bool: false,
      },
      'credential-api': false,
      'revoke-api-credential': true,
      'shared-secret-auth': true,
      'free-tier': {
        bool: true,
        value: '1TB'
      },
      locations: {
        text: "11"
      },
      'location-based-routing': false,
      'pay-per-gb': false,
      'billing-model': 'TBC',
      'firewall-busting-ports': {
        bool: true,
        ports: {
          'tcp': 80,
          'tls': 443,
          'udp': 80
        }
      },
      'whitelabel-own-domain': {
        bool: false,
      },
      'documented-ips': {
        bool: false,
      },
      'documentation-url': {
        link: 'https://www.expressturn.com/#faq'
      }
    },
  },
  google: {
    name: 'Google',
    description: `
Google's public STUN server, \`stun.l.google.com:19302\`, is one of the most widely used STUN servers in WebRTC applications. Its free, reliable nature has made it the default for many developers building WebRTC-based applications, such as video chat, real-time communication tools, and online games. However, its widespread use can create dependencies on Google's infrastructure.

And when you're not paying for a service, who do you contact when something goes wrong and the STUN server isn't available and your applications aren't working properly. While free sounds great, moving to a provider or STUN server under your control is far better.
`,
    isOSSProject: false,
    throughputFields: null
  },
  rel: {
    name: 'Rel',
    description: `
[Rel](https://github.com/elixir-webrtc/rel) is an open-source STUN and TURN server built using Elixir. It helps users with NAT traversal, enabling peer-to-peer communication. Rel focuses on scalability, performance, and ease of use, making it suitable for developers looking to self-host their own STUN/TURN infrastructure. It is customizable and designed for distributed systems, offering an alternative to proprietary services.

For more details, check the [GitHub repository](https://github.com/elixir-webrtc/rel).`,
    isOSSProject: true,
    throughputFields: ['udp']
  },
  stunner: {
    name: 'Stunner',
    description: `
[Stunner](https://github.com/l7mp/stunner) is an open-source WebRTC ingress for Kubernetes.`,
    isOSSProject: true,
    throughputFields: ['udp', 'tcp', 'tls', 'dtls']
  },
};

export const features = {
  'ipv6-candidates': false,
  '2fa': false,
  'analysis-api': false,
  'credential-api': false,
  'revoke-api-credential': false,
  'shared-secret-auth': false,
  'free-tier': false,
  locations: "0",
  'location-based-routing': false,
  'pay-per-gb': false,
  'overage': {
    value: '0',
    currency: '$'
  },
  'billing-model': '',
  'firewall-busting-ports': {},
  'whitelabel-own-domain': [],
  'documented-ips': false,
};

export const featureTranslation = {
  'ipv6-candidates': 'IPv6 Candidates',
  '2fa': 'Portal Two-factor authentication',
  'analysis-api': 'Usage API',
  'credential-api': 'Credential Creation API',
  'revoke-api-credential': 'Credential Revocation API',
  'shared-secret-auth': 'Shared Secret Credential Creation',
  'free-tier': 'Free Tier',
  locations: "Locations",
  'location-based-routing': 'Location based routing',
  'pay-per-gb': 'No Subscription, pay per GB used',
  'overage': 'Overage fee',
  'billing-model': 'Billing Model',
  'firewall-busting-ports': 'Firewall busting ports available',
  'whitelabel-own-domain': 'Whitelabel TURN domain',
  'documented-ips': 'Documented IP addresses',
  'documentation-url': 'Documentation URL'
}

export const featureValueTranslations = {
  'billing-model': {
    'TBC': 'TBC',
    'egress-to-turn-client': 'Data billed on egress from Provider towards a turn client'
  }
}
// export const fields = ['avgTurnLatency', 'maxTurnThroughput', 'avgTurnCandidate', 'avgStunCandidate', 'avgApiResponseTime', 'avgTurnTimeToConnectedState', 'avgStunTimeToConnectedState'];

export const explanations = {
  avgStunCandidate: {
    title: "Average STUN Candidate Latency",
    description: "The average time to get a STUN candidate from the server",
    columns: ['udp'],
    measure: "ms",
    min: {
      field: 'minStunCandidate'
    },
    max: {
      field: 'maxStunCandidate'
    }
  },
  avgStunTimeToConnectedState: {
    title: "Average Time to Connected State (STUN)",
    description: "The average time to a connected state",
    columns: ['udp'],
    measure: "ms",
    min: {
      field: 'minStunTimeToConnectedState'
    },
    max: {
      field: 'maxStunTimeToConnectedState'
    }
  },
  avgTurnCandidate: {
    title: "Average TURN Candidate Latency",
    description: "The average time to get a Relay candidate from the server",
    columns: ['udp', 'tcp', 'tls'],
    measure: "ms",
    min: {
      field: 'minTurnCandidate'
    },
    max: {
      field: 'maxTurnCandidate'
    }
  },
  avgTurnTimeToConnectedState: {
    title: "Average Time to Connected State (TURN)",
    description: "The average time to a connected state",
    columns: ['udp', 'tcp', 'tls'],
    measure: "ms",
    min: {
      field: 'minTurnTimeToConnectedState'
    },
    max: {
      field: 'maxTurnTimeToConnectedState'
    }
  },
  avgTurnLatency: {
    title: "Average TURN Latency",
    description: "The average time to first byte through a TURN server",
    columns: ['udp', 'tcp', 'tls'],
    measure: "ms",
    min: {
      field: 'minTurnLatency'
    },
    max: {
      field: 'maxTurnLatency'
    }
  },
  maxTurnThroughput: {
    title: "Max TURN Throughput",
    description: "The max amount of throughput through a TURN server",
    columns: ['udp', 'tcp', 'tls'],
    measure: "Mb/s"
  },
  avgApiResponseTime: {
    title: "Average API Response Time",
    description: "The average time to get a list of Ice Servers from the Provider's API",
    columns: ['Response time'],
    measure: "ms",
    min: {
      field: 'minApiResponseTime'
    },
    max: {
      field: 'maxApiResponseTime'
    }
  },
}

export const providers = Object.values(providersList)
  .map(({ name, isOSSProject, isPrivate }) => isOSSProject || isPrivate ? undefined : name)
  .filter(notUndefined => notUndefined !== undefined);
export const projects = Object.values(providersList)
  .map(({ name, isOSSProject }) => isOSSProject ? name : undefined)
  .filter(notUndefined => notUndefined !== undefined);
export const privateNetworks = Object.values(providersList)
  .map(({ name, isPrivate }) => isPrivate ? name : undefined)
  .filter(notUndefined => notUndefined !== undefined);

export function getProviderTitleFromId(id) {
  return providersList[id]?.name || '';
}

export function getProviderBlurbFromId(id) {
  return providersList[id]?.description || '';
}

export function getProviderFeaturesFromId(id) {
  return providersList[id]?.features || null;
}

// This solves the problem of Rel being called elixir in the data
export function getProviderIdFromName(n) {
  if (!n) {
    return;
  }
  const found = Object.entries(providersList).find(([id, value]) => value.name.toLocaleLowerCase() === n);
  if (found) {
    return found[0];
  }
}
