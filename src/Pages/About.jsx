import { Layout } from '../layout/Layout';
import { Typography } from '../components/Typography';
import { Blocks } from '../components/Blocks';
import { Card } from '../components/Card';
import { Link } from '../components/Link';
import ArrowUpDown from '../icons/ArrowUpDown';
import Cable from '../icons/Cable';
import Stopwatch from '../icons/Stopwatch';

export function About() {
  return (
    <Layout>
      <Typography style='h2'>About ICEPerf.com</Typography>
      <Typography style='body'>
        Which TURN server provider should you use? The answer depends on the specific needs of the users and applications using them, the quality of the network and, most importantly, the location. To our knowledge, there is no tool out there that helps you compare how each TURN provider will perform in each scenario, so we decided to build it!
      </Typography>
      <Typography style='body'>
        ICEPerf runs a series of tests with each of the TURN providers mentioned above and exports metrics to compare the results.
      </Typography>
      <Typography style='body'>
        Learn more on the <Link to='https://nimblea.pe/monkey-business/2024/04/30/introducing-iceperf-com/' target='_blank'>Nimble Ape blog post</Link>.
      </Typography>

      <Typography style='h3'>Description of the tests</Typography>
      <Typography style='body'>
        Each test is carried out between two clients running on the same machine, an Offerer and an Answerer. While normally an agent will gather all available ICE candidates when establishing a WebRTC connection, ICEPerf specifies the scheme, protocol and port for each test, and then runs all tests in sequence.
      </Typography>
      <Typography style='body'>
        For tests over TURN networks, only the Offerer is forced to go through TURN.
      </Typography>

      <Blocks>
        <Card
          title='Latency'
          content='Measures the time until the Answerer receives the first packet over a TURN network.'
          icon={<Stopwatch className='flex-shrink-0 size-6 text-blue-600 dark:text-blue-400' />}
        />
        <Card
          title='ICE Candidate'
          content='Determines the time taken to receive the first ICE candidate, which is crucial for establishing WebRTC connections quickly and efficiently.'
          icon={<Cable className='flex-shrink-0 size-6 text-blue-600 dark:text-blue-400' />}
        />
        <Card
          title='Throughput'
          content='Once the connection via a TURN server is established, the Offerer agent starts sending 1-MB packets to the Answerer through the data channel, as quickly as possible. The throughput is the calculated rate of packets received by the Answerer.'
          icon={<ArrowUpDown className='flex-shrink-0 size-6 text-blue-600 dark:text-blue-400' />}
        />
        <Card
          title='Time to Connected State'
          content='How quickly can we get into a connected state. This does not include the time to get TURN credentials from their API currently.'
          icon={<ArrowUpDown className='flex-shrink-0 size-6 text-blue-600 dark:text-blue-400' />}
        />
        <Card
          title='API response time'
          content='How quickly do we get a response from their API for TURN credentials. This is generally done on every session initialisation and so delays here can delay setting up your session.'
          icon={<ArrowUpDown className='flex-shrink-0 size-6 text-blue-600 dark:text-blue-400' />}
        />
      </Blocks>

      <Typography style='small'>
        NOTE: Tests are completed over a home broadband connection, hardwired from various nodes across Europe and North America. Tests are run every 60 minutes on each node. Average results shown on this website are 7-day averages, updated every 5 minutes. Throughput trends show the latest available measurement.
      </Typography>

      <Typography style='h3'>ICEPerf talks</Typography>
      <ul className='list-disc marker:text-ipblue-800 ps-5 space-y-2'>
        <li>
          <Typography style='body'>
            The team present ICEPerf at <Link to='https://www.youtube.com/watch?v=kOlibSF8PsE' target='_blank' rel='noreferrer'>JanusCon 2024</Link>.
          </Typography>
        </li>
        <li>
          <Typography style='body'>
            Dan talks about ICEPerf as part of his <Link to='https://www.youtube.com/live/Cho556qHRaE?si=EDMBG3tBg3G41Qv1&t=17675' target='_blank' rel='noreferrer'>OpenSIPs Summit 2024 talk</Link>.
          </Typography>
        </li>
        <li>
          <Typography style='body'>
            Dan introduces ICEPerf at <Link to='https://2024.commcon.xyz/talks/introducing-iceperfcom/' target='_blank' rel='noreferrer'>CommCon 2024</Link>.
          </Typography>
        </li>
      </ul>
    </Layout>
  );
}
