import type { ButtonProps as AntdButtonProps } from 'antd';

/**
 * CustomButton component props
 *
 * Extends Ant Design Button with custom styling and behavior
 */
export type CustomButtonProps = AntdButtonProps & {
  /**
   * Whether the button should take full width
   * @default false
   */
  fullWidth?: boolean;

  /**
   * Custom CSS class name
   */
  className?: string;
};
