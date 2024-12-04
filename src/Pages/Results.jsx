import { PropTypes } from 'prop-types';
import { Results as ResultsTables } from '../components/Results';

export function Results({ select = 'all' }) {
    return <ResultsTables select={select} />;
}

Results.propTypes = {
  select: PropTypes.string,
};
