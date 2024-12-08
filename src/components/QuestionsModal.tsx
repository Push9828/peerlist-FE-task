"use client";
import { useState, useEffect, useRef } from "react";
import { ModalProps } from "@/types/components";

const dropdownOptions = [
  { id: 1, icon: "/icons/short-answer-icon.svg", text: "Short answer" },
  { id: 2, icon: "/icons/long-answer-icon.svg", text: "Long answer" },
  { id: 3, icon: "/icons/single-select-icon.svg", text: "Single select" },
  { id: 4, icon: "/icons/url-icon.svg", text: "URL" },
  { id: 5, icon: "/icons/date-icon.svg", text: "Date" },
];

export const QuestionsModal = ({
  isOpen,
  onClose,
  setQuestionType,
}: ModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleOutsideClick = (event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      onClose();
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("click", handleOutsideClick);
    } else {
      document.removeEventListener("click", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [isOpen, onClose]);

  const renderDropdown = () => (
    <ul
      className={`bg-white border border-[#E1E4E8] rounded-lg shadow-lg w-full mt-2 z-10 origin-top`}
    >
      {dropdownOptions.map((option) => (
        <li
          key={option.id}
          className="flex items-center text-xs font-medium px-4 py-2 hover:bg-gray-100 cursor-pointer"
          onClick={() => {
            setQuestionType(option.id);
            onClose();
            setIsDropdownOpen(false);
          }}
        >
          <img src={option.icon} alt={option.text} className="mr-3 " />
          {option.text}
        </li>
      ))}
    </ul>
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50 z-50">
      <div
        ref={modalRef}
        className="bg-[#FAFBFC] p-6 rounded-3xl h-72 w-96 shadow-lg"
      >
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen((prev) => !prev)}
            className="bg-gray-100 px-4 py-2 rounded-md flex items-center justify-between w-full"
          >
            <span className="font-semibold text-[#6A737D] text-xs">
              Input Types
            </span>
          </button>
          {isDropdownOpen && renderDropdown()}
        </div>
      </div>
    </div>
  );
};
