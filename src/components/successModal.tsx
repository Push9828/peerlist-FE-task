import { ModalProps } from "@/types/components";
import { Button } from "./Button";

export const SuccessModal = ({
  isOpen,
  onClose,
  title,
  subText,
}: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50 z-50
      transition-opacity duration-300 ${
        isOpen
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      }`}
    >
      <div
        className={`bg-white p-6 rounded-lg shadow-lg w-1/3 transform
    transition-all duration-300 ${
      isOpen ? "translate-y-0 opacity-100" : "-translate-y-10 opacity-0"
    }`}
      >
        <div className="text-center">
          <h2 className="text-lg font-semibold text-green-600">{title}</h2>
          <p className="mt-2 text-sm">{subText}</p>
        </div>
        <div className="mt-4 flex justify-center">
          <Button onClick={onClose} text="Close" isPrimary />
        </div>
      </div>
    </div>
  );
};
