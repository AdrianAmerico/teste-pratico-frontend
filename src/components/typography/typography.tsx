import { ComponentPropsWithRef, ReactNode } from 'react';
import styles from './typography.module.scss';
import { mergeClassNames } from '@/utils';

type TypographyTags = 'h1' | 'h2' | 'h3' | 'p';

type TypographyProps<T extends TypographyTags = 'p'> = {
  as?: T;
  children: ReactNode;
  className?: string;
} & ComponentPropsWithRef<T>;

export const Typography = ({
  as: Tag = 'p',
  children,
  className,
}: TypographyProps) => {
  const baseClass = {
    h1: styles['title-h1'],
    h2: styles['title-h2'],
    h3: styles['title-h3'],
    p: '',
  }[Tag];

  return (
    <Tag className={mergeClassNames(baseClass, className)}>{children}</Tag>
  );
};
