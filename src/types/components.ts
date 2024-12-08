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
  setQuestions: React.Dispatch<React.SetStateAction<QuestionItem[]>>;
};

export type questions = {
  questionsData: QuestionItem[];
  setQuestions: React.Dispatch<React.SetStateAction<QuestionItem[]>>;
};

export type QuestionItem = {
  type?: number;
  title?: string;
  helpText?: string;
  options?: string[];
};
