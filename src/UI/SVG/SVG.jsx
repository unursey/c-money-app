import {ReactComponent as LogoIcon} from '../../img/logo.svg';
import {ReactComponent as ExitIcon} from '../../img/exit.svg';
import {ReactComponent as DownIcon} from '../../img/down.svg';
import {ReactComponent as UpIcon} from '../../img/up.svg';

import PropTypes from 'prop-types';

export const SVG = (prop) => {
  const svgs = {
    logoIcon: LogoIcon,
    exitIcon: ExitIcon,
    downIcon: DownIcon,
    upIcon: UpIcon,
  };

  const {
    iconName,
    As = svgs[iconName],
    className,
    alt,
    width,
    height,
  } = prop;

  return <As
    className={className}
    alt={alt}
    width={width}
    height={height}
  />;
};

SVG.propTypes = {
  As: PropTypes.string,
  className: PropTypes.string,
  alt: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
};
