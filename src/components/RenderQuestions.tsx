"use client";
import { useState } from "react";
import { Button } from "./Button";
import { QuestionItem, questions } from "@/types/components";

const InputField = ({
  type,
  previewMode,
  value,
  onChange,
}: {
  type: number | undefined;
  previewMode: boolean;
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}) => {
  const commonClasses = "border rounded-lg border-[#E1E4E8] w-full p-2";
  const inputProps = previewMode ? {} : { readOnly: true };

  switch (type) {
    case 1:
      return (
        <input
          type="text"
          className={commonClasses}
          value={value}
          onChange={onChange}
          {...inputProps}
        />
      );
    case 2:
      return (
        <textarea
          className={commonClasses}
          value={value}
          onChange={onChange}
          {...inputProps}
        />
      );
    case 4:
      return (
        <input
          type="url"
          className={commonClasses}
          value={value}
          onChange={onChange}
          {...inputProps}
        />
      );
    case 5:
      return (
        <input
          type="date"
          className={commonClasses}
          value={value}
          onChange={onChange}
          {...inputProps}
        />
      );
    default:
      return null;
  }
};

const updateQuestionState = (
  index: number,
  field: string,
  value: string,
  questionsData: QuestionItem[],
  setQuestions: React.Dispatch<React.SetStateAction<QuestionItem[]>>
) => {
  const updatedQuestions = [...questionsData];
  updatedQuestions[index] = {
    ...updatedQuestions[index],
    [field]: value,
  };
  setQuestions(updatedQuestions);
};

const addOption = (
  index: number,
  questionsData: QuestionItem[],
  setQuestions: React.Dispatch<React.SetStateAction<QuestionItem[]>>
) => {
  const updatedQuestions = [...questionsData];
  const currentOptions = updatedQuestions[index].options || [];
  updatedQuestions[index].options = [...currentOptions, ""];
  setQuestions(updatedQuestions);
};

const updateOption = (
  index: number,
  optionIndex: number,
  value: string,
  questionsData: QuestionItem[],
  setQuestions: React.Dispatch<React.SetStateAction<QuestionItem[]>>
) => {
  const updatedQuestions = [...questionsData];
  const updatedOptions = [...(updatedQuestions[index].options || [])];
  updatedOptions[optionIndex] = value;
  updatedQuestions[index].options = updatedOptions;
  setQuestions(updatedQuestions);
};

const handleTypeChange = (
  index: number,
  newType: number,
  questionsData: QuestionItem[],
  setQuestions: React.Dispatch<React.SetStateAction<QuestionItem[]>>
) => {
  const updatedQuestions = [...questionsData];
  updatedQuestions[index].type = newType;

  if (newType === 3) {
    updatedQuestions[index].options = updatedQuestions[index].options || [""];
  } else {
    delete updatedQuestions[index].options;
  }

  setQuestions(updatedQuestions);
};

const dropdownOptions = [
  { id: 1, text: "Short Text", icon: "/icons/short-answer-icon.svg" },
  { id: 2, text: "Long Text", icon: "/icons/long-answer-icon.svg" },
  { id: 3, text: "Multiple Choice", icon: "/icons/single-select-icon.svg" },
  { id: 4, text: "URL", icon: "/icons/url-icon.svg" },
  { id: 5, text: "Date", icon: "/icons/date-icon.svg" },
];

export const RenderQuestions = ({
  questionsData,
  setQuestions,
  previewMode = false,
  handleFormSubmit,
}: questions) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  const handleResponseChange = (index: number, value: string) => {
    const updatedQuestions = [...questionsData];
    updatedQuestions[index].response = value;
    setQuestions(updatedQuestions);
  };

  const handleRadioChange = (index: number, optionValue: string) => {
    const updatedQuestions = [...questionsData];
    updatedQuestions[index].response = optionValue;
    setQuestions(updatedQuestions);
  };

  return (
    <div>
      {questionsData.map((question, index) => {
        if (question.type === 3 && !question.options) {
          question.options = [""];
        }

        return (
          <div key={index}>
            <div className="mx-6 mb-6 border border-[#E1E4E8] rounded-lg p-4">
              <div className="flex justify-between mb-2">
                <input
                  type="text"
                  placeholder="Write a question"
                  className="text-sm font-semibold border-none bg-transparent focus:outline-none"
                  value={question.title || ""}
                  onChange={(e) =>
                    !previewMode &&
                    updateQuestionState(
                      index,
                      "title",
                      e.target.value,
                      questionsData,
                      setQuestions
                    )
                  }
                  readOnly={previewMode}
                />
                {!previewMode && (
                  <div className="flex gap-4 items-center">
                    <div className="relative">
                      <button
                        onClick={() => setIsDropdownOpen((prev) => !prev)}
                        className="bg-white px-4 py-2 rounded-md flex items-center justify-between w-full"
                      >
                        <span className="flex font-semibold text-[#868686] text-xs">
                          <img
                            src={
                              dropdownOptions.find(
                                (option) => option.id === question.type
                              )?.icon
                            }
                            alt="icon"
                            className="w-4 h-4"
                          />

                          <svg
                            width="17"
                            height="17"
                            viewBox="0 0 17 17"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M4.63965 6.31812L8.63965 10.3181L12.6396 6.31812"
                              stroke="#0D0D0D"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </span>
                      </button>
                      {isDropdownOpen && (
                        <ul
                          className={`absolute bg-white border border-[#E1E4E8] rounded-lg shadow-lg w-full mt-2 z-99 origin-top`}
                        >
                          {dropdownOptions.map((option) => (
                            <li
                              key={option.id}
                              className="flex items-center text-xs font-medium px-4 py-2 hover:bg-gray-100 cursor-pointer"
                              onClick={() => {
                                if (!previewMode) {
                                  handleTypeChange(
                                    index,
                                    option.id,
                                    questionsData,
                                    setQuestions
                                  );
                                }
                                setIsDropdownOpen((prev) => !prev);
                              }}
                            >
                              <img src={option.icon} alt={option.text} />
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>

                    <img
                      src="/icons/dots-icon.svg"
                      alt="icon"
                      className="w-4 h-4"
                    />
                  </div>
                )}
              </div>
              {question.helpText &&
                question.helpText?.length > 0 &&
                previewMode && (
                  <input
                    type="text"
                    placeholder="Help text"
                    className="text-sm border-none bg-transparent focus:outline-none mb-2"
                    value={question.helpText}
                    readOnly={previewMode}
                  />
                )}
              {!previewMode && (
                <input
                  type="text"
                  placeholder="Help text"
                  className="text-sm border-none bg-transparent focus:outline-none mb-2"
                  value={question.helpText || ""}
                  onChange={(e) =>
                    !previewMode &&
                    updateQuestionState(
                      index,
                      "helpText",
                      e.target.value,
                      questionsData,
                      setQuestions
                    )
                  }
                />
              )}

              {question.type === 3 && question.options ? (
                <div>
                  {question.options.map((option, optionIndex) => (
                    <div
                      key={optionIndex}
                      className="flex items-center gap-2 mb-2"
                    >
                      <input
                        type="radio"
                        id={`radio-${optionIndex}`}
                        name={`radio-group-${index}`}
                        value={option}
                        className="p-2"
                        onChange={() =>
                          !previewMode && handleRadioChange(index, option)
                        }
                        disabled={!previewMode}
                      />
                      <input
                        type="text"
                        value={option}
                        onChange={(e) =>
                          !previewMode &&
                          updateOption(
                            index,
                            optionIndex,
                            e.target.value,
                            questionsData,
                            setQuestions
                          )
                        }
                        placeholder={`Option ${optionIndex + 1}`}
                        className="border rounded-lg border-[#E1E4E8] w-full p-2 text-sm"
                        readOnly={previewMode}
                      />
                      {question.options &&
                        optionIndex === question.options.length - 1 &&
                        optionIndex < 3 &&
                        !previewMode && (
                          <button
                            type="button"
                            onClick={() =>
                              addOption(index, questionsData, setQuestions)
                            }
                            className="text-blue-500 p-2"
                          >
                            <img src="/icons/plus-icon.svg" alt="Add Option" />
                          </button>
                        )}
                    </div>
                  ))}
                </div>
              ) : (
                <InputField
                  type={question.type}
                  previewMode={previewMode}
                  value={question.response || ""}
                  onChange={(e) =>
                    previewMode && handleResponseChange(index, e.target.value)
                  }
                />
              )}
            </div>
          </div>
        );
      })}
      {previewMode && (
        <div className="flex justify-end mr-4">
          <Button text="Submit" onClick={handleFormSubmit} />
        </div>
      )}
    </div>
  );
};
