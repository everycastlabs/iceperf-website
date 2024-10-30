import PropTypes from 'prop-types'
import CloudflareLogo from '../assets/providers/cloudflare-official.svg?react'
import GoogleLogo from '../assets/providers/google-logo-search-new-svgrepo-com.svg?react'
import ExpressTurnLogo from '../assets/providers/expressturn-logo21.svg?react'
import TwilioLogo from '../assets/providers/twilio-icon-svgrepo-com.svg?react'
import IceCubeLogo from '../assets/icecube.svg?react'
import XirsysLogo from '../assets/providers/xirsys-logo.svg?react'
import MeteredLogo from '../assets/providers/metered-logo.png?react'
import RelLogo from '../assets/providers/elixir-webrtc.svg?react'
import StunnerLogo from '../assets/providers/stunner.svg?react'

export function ProviderLogo({ provider = '', height = null }) {
  switch (provider) {
    case 'cloudflare':
      return <CloudflareLogo height={height} />
    case 'google':
      return <GoogleLogo height={height} />
    case 'expressturn':
      return <ExpressTurnLogo height={height} />
    case 'twilio':
      return <TwilioLogo height={height} />
    case 'xirsys':
      return <XirsysLogo height={height} />
    case 'metered':
        return <img src={MeteredLogo} style={{ height, maxHeight: '100%', maxWidth: '100%' }} />
    case 'rel':
    case 'elixir':
        return <RelLogo height={height} />
    case 'stunner':
        return <StunnerLogo height={height} />
    default:
      return <IceCubeLogo height={height} />
  }
}

ProviderLogo.propTypes = {
  provider: PropTypes.string,
  height: PropTypes.string,
};
