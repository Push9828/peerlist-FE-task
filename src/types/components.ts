export type ButtonProps = {
  text: string;
  icon?: string;
  iconPosition?: "before" | "after";
  isPrimary?: boolean;
  onClick?: () => void;
  disabled?: boolean;
};

export type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  setQuestionType: React.Dispatch<React.SetStateAction<number | null>>;
};
