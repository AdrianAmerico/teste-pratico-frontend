import { useState } from 'react';
import type { ImgHTMLAttributes } from 'react';
import styles from './avatar.module.scss';

interface AvatarProps extends ImgHTMLAttributes<HTMLImageElement> {
  src?: string;
  size?: number;
}

export const Avatar = ({ src, size = 40, ...rest }: AvatarProps) => {
  const [loaded, setLoaded] = useState(false);

  const handleLoad = () => setLoaded(true);
  const handleError = () => setLoaded(true);

  return (
    <div
      className={styles.avatar__wrapper}
      style={{ width: size, height: size, position: 'relative' }}
    >
      {!loaded && (
        <div
          aria-hidden="true"
          role="presentation"
          className={styles.avatar__skeleton}
          style={{
            width: size,
            height: size,
          }}
        />
      )}

      <img
        src={src}
        className={styles.avatar}
        loading="lazy"
        decoding="async"
        width={size}
        height={size}
        onLoad={handleLoad}
        onError={handleError}
        style={{
          width: size,
          height: size,
        }}
        {...rest}
      />
    </div>
  );
};
