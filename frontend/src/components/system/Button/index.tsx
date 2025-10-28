import React from 'react';
import { Button } from 'antd';
import type { CustomButtonProps } from './types';
import styles from './styles.module.scss';

/**
 * CustomButton component
 *
 * Extends Ant Design Button with custom styling and behavior.
 * Use this component instead of the default Ant Design Button
 * to ensure consistent styling across the application.
 *
 * @example
 * <CustomButton type="primary" fullWidth>
 *   Click me
 * </CustomButton>
 */
export const CustomButton: React.FC<CustomButtonProps> = ({
  fullWidth = false,
  className,
  ...props
}) => {
  const customClassName = [
    styles.customButton,
    fullWidth && styles.fullWidth,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <Button
      {...props}
      className={customClassName}
    />
  );
};
