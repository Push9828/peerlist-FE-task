export type ButtonProps = {
  text: string;
  icon?: string;
  iconPosition?: "before" | "after";
  isPrimary?: boolean;
  onClick?: () => void;
  disabled?: boolean;
};
