import PropTypes from 'prop-types';
import {useOptions} from '../../../hooks/useOptions';

export const Option = (selected) => {
  const [options] = useOptions();

  return (
    <>
      <option >--</option>
      {options ? options
        .filter(item => item !== selected.selected)
        .map(item =>
          <option key={item} value={item}>{item}</option>) :
      (<option> - </option>)};
    </>
  );
};

Option.protoTypes = {
  selected: PropTypes.object,
};
