import {useOptions} from '../../../hooks/useOptions';

export const Option = () => {
  const [options] = useOptions();

  return (
    <>
      {options ? options.map(item =>
        <option key={item} value={item}>{item}</option>) :
      (<option> - </option>)};
    </>
  );
};
