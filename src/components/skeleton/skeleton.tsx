import { CSSProperties, forwardRef, HTMLAttributes } from 'react';
import styles from './skeleton.module.scss';
import { mergeClassNames } from '@/utils';

interface SkeletonProps extends HTMLAttributes<HTMLSpanElement> {
  width?: string | number;
  height?: string | number;
  borderRadius?: string;
  className?: string;
}

export const Skeleton = forwardRef<HTMLSpanElement, SkeletonProps>(
  (
    {
      width = '100%',
      height = '1rem',
      borderRadius = '0.25rem',
      className = '',
      ...props
    },
    forwardedRef
  ) => {
    const inlineStyle: CSSProperties = {
      width,
      height,
      borderRadius,
    };

    return (
      <span
        ref={forwardedRef}
        className={mergeClassNames(styles.skeleton, className)}
        style={inlineStyle}
        aria-busy="true"
        aria-label="Carregando"
        {...props}
      />
    );
  }
);

Skeleton.displayName = 'Skeleton';
