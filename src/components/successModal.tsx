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
    <div className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-green-600">{title}</h2>
          <p className="mt-2 text-sm">{subText}</p>
        </div>
        <div className="mt-4 flex justify-center">
          <Button onClick={onClose} text="Close" isPrimary />
        </div>
      </div>
    </div>
  );
};
