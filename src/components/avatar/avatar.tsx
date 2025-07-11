import { useState } from 'react';
import type { ImgHTMLAttributes } from 'react';
import styles from './avatar.module.scss';

interface AvatarProps extends ImgHTMLAttributes<HTMLImageElement> {
  src?: string;
  nome?: string;
  size?: number;
}

export const Avatar = ({
  src,
  nome = 'usuário',
  size = 40,
  ...rest
}: AvatarProps) => {
  const [loaded, setLoaded] = useState(false);

  const altText = src
    ? `Foto de perfil de ${nome}`
    : `Imagem de perfil padrão de ${nome}`;

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
            backgroundColor: '#ccc',
            borderRadius: '50%',
            position: 'absolute',
            top: 0,
            left: 0,
          }}
        />
      )}

      <img
        src={src}
        alt={altText}
        className={styles.avatar}
        loading="lazy"
        decoding="async"
        width={size}
        height={size}
        onLoad={handleLoad}
        onError={handleError}
        style={{
          objectFit: 'cover',
          borderRadius: '50%',
          width: size,
          height: size,
          display: 'block',
        }}
        {...rest}
      />
    </div>
  );
};
