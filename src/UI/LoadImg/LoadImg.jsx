import style from './LoadImg.module.css';
import {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import Preloader from '../Preloader';

export const LoadImg = ({src, alt, className, height, width}) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const image = new Image();
    image.src = src;
    image.onload = () => {
      setLoading(false);
    };
  }, [src]);

  if (loading) {
    return (
      <>
        <img className={style.loading}
          height={height}
          width={width} border="0"/>
        <span className={style.text}><Preloader /></span>
      </>
    );
  }

  return <img src={src} alt={alt} className={className} />;
};

LoadImg.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  className: PropTypes.string,
  height: PropTypes.number,
  width: PropTypes.number,
};


