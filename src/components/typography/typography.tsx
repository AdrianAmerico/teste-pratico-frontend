import { ElementType, ReactNode, ComponentPropsWithoutRef } from 'react';
import styles from './typography.module.scss';
import { mergeClassNames } from '@/utils';

type TypographyVariants = 'h1' | 'h2' | 'h3' | 'body';

type TypographyProps<T extends ElementType = 'p'> = {
  as?: T;
  variant?: TypographyVariants;
  children: ReactNode;
  className?: string;
} & ComponentPropsWithoutRef<T>;

export const Typography = <T extends ElementType = 'p'>({
  as,
  variant = 'body',
  children,
  className,
  ...rest
}: TypographyProps<T>) => {
  const Tag = as || 'p';

  const baseClass = {
    h1: styles['title-h1'],
    h2: styles['title-h2'],
    h3: styles['title-h3'],
    body: styles.body,
  }[variant];

  return (
    <Tag className={mergeClassNames(baseClass, className)} {...rest}>
      {children}
    </Tag>
  );
};
