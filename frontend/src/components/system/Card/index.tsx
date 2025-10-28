import React from 'react';
import { Card } from 'antd';
import type { CustomCardProps } from './types';
import styles from './styles.module.scss';

/**
 * CustomCard component
 *
 * Extends Ant Design Card with custom styling and behavior.
 * Use this component instead of the default Ant Design Card
 * to ensure consistent styling across the application.
 *
 * @example
 * <CustomCard title="Title" hoverable>
 *   <p>Card content</p>
 * </CustomCard>
 */
export const CustomCard: React.FC<CustomCardProps> = ({
  hoverable = false,
  bordered = true,
  className,
  ...props
}) => {
  const customClassName = [
    styles.customCard,
    hoverable && styles.hoverable,
    !bordered && styles.borderless,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <Card
      {...props}
      hoverable={hoverable}
      className={customClassName}
    />
  );
};