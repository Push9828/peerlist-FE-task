export type ButtonProps = {
  text: string;
  icon?: string;
  iconPosition?: "before" | "after";
  isPrimary?: boolean;
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
};

export type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  setQuestions?: React.Dispatch<React.SetStateAction<QuestionItem[]>>;
  title?: string;
  subText?: string;
};

export type questions = {
  questionsData: QuestionItem[];
  setQuestions: React.Dispatch<React.SetStateAction<QuestionItem[]>>;
  previewMode?: boolean;
  handleFormSubmit?: () => void;
  loading?: boolean;
  questionErrors: boolean[];
};

export type QuestionItem = {
  type?: number;
  title?: string;
  helpText?: string;
  options?: string[];
  response?: string;
};
