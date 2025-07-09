import { forwardRef, InputHTMLAttributes, ReactNode } from 'react';
import styles from './input.module.scss';
import { mergeClassNames } from '@/utils';
import { Search } from '../search/search';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  iconRight?: boolean;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ iconRight = true, className, ...props }, ref) => {
    return (
      <div className={styles.inputWrapper}>
        <input
          className={mergeClassNames(styles.input, className)}
          ref={ref}
          {...props}
        />

        {iconRight && <span className={styles.iconRight}>{<Search />}</span>}
      </div>
    );
  }
);

Input.displayName = 'Input';
