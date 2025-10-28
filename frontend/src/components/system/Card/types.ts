import type { CardProps as AntdCardProps } from 'antd';

/**
 * CustomCard component props
 *
 * Extends Ant Design Card with custom styling and behavior
 */
export type CustomCardProps = AntdCardProps & {
  /**
   * Whether the card should have a hover effect
   * @default false
   */
  hoverable?: boolean;

  /**
   * Whether the card should have a border
   * @default true
   */
  bordered?: boolean;

  /**
   * Custom CSS class name
   */
  className?: string;
};
