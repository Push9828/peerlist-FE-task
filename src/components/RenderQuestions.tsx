"use client";
import { useState, useEffect } from "react";
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
  const commonClasses = `border rounded-lg border-[#E1E4E8] w-full p-2 hover:drop-shadow-sm transition-shadow duration-200 ${
    previewMode ? "bg-white " : "bg-[#F6F8FA]"
  } ${previewMode ? "" : "focus:outline-none"}`;
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
  questionErrors,
  setProgress,
  progress,
}: questions) => {
  const [dropdownStates, setDropdownStates] = useState<boolean[]>(
    questionsData.map(() => false)
  );

  const toggleDropdown = (index: number) => {
    setDropdownStates((prev) =>
      prev.map((state, i) => (i === index ? !state : false))
    );
  };

  const closeDropdowns = () => {
    setDropdownStates(questionsData.map(() => false));
  };

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

  const calculateProgress = () => {
    const answeredQuestions = questionsData.filter(
      (question) => question.response && question.response.length > 0
    );
    const progressPercentage =
      (answeredQuestions.length / questionsData.length) * 100;
    setProgress(progressPercentage);
  };

  useEffect(() => {
    setDropdownStates(questionsData.map(() => false));
  }, [questionsData]);

  useEffect(() => {
    calculateProgress();
    setDropdownStates(questionsData.map(() => false));
  }, [questionsData]);

  return (
    <div>
      {questionsData.map((question, index) => {
        if (question.type === 3 && !question.options) {
          question.options = [""];
        }

        return (
          <div key={index}>
            <div className="mx-6 mb-6 border border-[#E1E4E8] rounded-lg p-4 hover:bg-[#FAFBFC]">
              <div className="flex justify-between mb-2">
                <input
                  type="text"
                  placeholder="Write a question"
                  className={` text-sm font-semibold border-none bg-transparent focus:outline-none border
              ${questionErrors[index] ? "placeholder-[#EB5757]" : ""}`}
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
                        onClick={() => toggleDropdown(index)}
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
                      {dropdownStates[index] && (
                        <ul
                          className={`absolute bg-white border border-[#E1E4E8] rounded-lg shadow-lg w-full mt-2 z-20 origin-top`}
                        >
                          <p>{dropdownStates[index]}</p>
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
                                closeDropdowns();
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
                        className="p-2 appearance-none w-2 h-2 border border-[#6A737D] rounded-full transition-all relative checked:bg-white checked:border-[#1E874B] checked:before:bg-[#00AA45] checked:before:absolute before:top-1 before:left-1 before:w-2 before:h-2 before:rounded-full before:bg-[#00AA45]"
                        onChange={() =>
                          previewMode && handleRadioChange(index, option)
                        }
                        disabled={!previewMode}
                        checked={question.response === option}
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
          <Button
            text="Submit"
            onClick={handleFormSubmit}
            disabled={progress !== 100}
          />
        </div>
      )}
    </div>
  );
};
