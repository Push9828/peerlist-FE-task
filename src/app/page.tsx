"use client";
import { useState } from "react";
import axios from "axios";
import { Button } from "@/components/Button";
import { QuestionsModal } from "@/components/QuestionsModal";
import { RenderQuestions } from "@/components/RenderQuestions";
import { QuestionItem } from "@/types/components";
import { SuccessModal } from "@/components/successModal";

export default function Home() {
  const [formTitle, setFormTitle] = useState("");
  const [isQuestionsModalOpen, setIsQuestionsModalOpen] = useState(false);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [saveAsDraft, setSaveAsDraft] = useState(false);
  const [questions, setQuestions] = useState<QuestionItem[]>([]);
  const [previewState, setPreviewState] = useState<{
    id: string | null;
    isPreview: boolean;
  }>({ id: null, isPreview: false });
  const [loading, setLoading] = useState(false);
  const [formTitleError, setformTitleError] = useState<boolean>(false);
  const [questionErrors, setQuestionErrors] = useState<boolean[]>([]);
  const [progress, setProgress] = useState<number>(0);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormTitle(e.target.value);
    setformTitleError(false);
  };

  const validateQuestions = () => {
    const errors = questions.map((question) => !question.title);
    setQuestionErrors(errors);
    return !errors.includes(true);
  };

  const handlePublishForm = async () => {
    if (!formTitle || !validateQuestions()) {
      setformTitleError(true);
      return;
    }

    setLoading(true);

    try {
      const payload = {
        title: formTitle,
        questions,
      };

      const response = await axios.post("/api/forms", payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        const { newForm } = response.data;
        setPreviewState({ id: newForm.id, isPreview: true });
      }
    } catch (error) {
      console.error("Error publishing form:", error);
      if (axios.isAxiosError(error) && error.response) {
        alert(`Failed to publish form: ${error.response.data.message}`);
      } else {
        alert("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleFormSubmit = () => {
    setIsFormSubmitted(true);
    setPreviewState({ id: null, isPreview: false });
    setQuestions([]);
    setFormTitle("");
  };

  const handlePreview = () => {
    if (!validateQuestions() || !formTitle) {
      setformTitleError(true);
    } else setPreviewState({ id: null, isPreview: true });
  };

  return (
    <main className="flex flex-col min-h-screen max-w-2xl mx-auto border border-[#E1E4E8] ">
      {/* Header */}

      <div className="flex gap-10 md:justify-between px-6 py-4">
        <input
          type="text"
          placeholder="Untitled Form"
          value={formTitle}
          onChange={handleTitleChange}
          className={`text-lg w-1/2  font-semibold border-none bg-transparent focus:outline-none  ${
            formTitleError ? "placeholder-[#EB5757]" : ""
          }`}
        />
        {previewState.isPreview ? (
          <div className="flex flex-col items-center w-full max-w-xs ml-4">
            <span className="text-sm  font-regular mb-2">
              Form completeness — {progress}%
            </span>
            <div className="relative w-full h-2 bg-gray-200 rounded">
              <div
                className="absolute top-0 left-0 h-2 bg-[#00AA45] rounded"
                style={{ width: `${Math.min(100, progress)}%` }}
              ></div>
            </div>
          </div>
        ) : (
          <Button
            text="Preview"
            iconPosition="after"
            isPrimary
            icon="/icons/link-icon.svg"
            disabled={questions.length === 0}
            onClick={handlePreview}
          />
        )}
      </div>

      <hr />

      {/* Questions section */}
      <div className="my-6">
        <RenderQuestions
          questionsData={questions}
          setQuestions={setQuestions}
          previewMode={previewState.isPreview}
          handleFormSubmit={handleFormSubmit}
          questionErrors={questionErrors}
          setProgress={setProgress}
          progress={progress}
        />
      </div>
      {!previewState.isPreview && (
        <div className="flex flex-col items-center">
          <div>
            <Button
              text="Add Question"
              iconPosition="before"
              isPrimary
              icon="/icons/plus-icon.svg"
              onClick={() => setIsQuestionsModalOpen(true)}
            />
          </div>
        </div>
      )}

      {/* Footer */}
      <div className=" mt-auto">
        <hr />
        {!previewState.isPreview && (
          <div className="flex justify-between bg-[#F6F8FAE5] py-4 px-6">
            <Button
              text="Save as draft"
              isPrimary
              iconPosition="before"
              icon="/icons/draft-icon.svg"
              disabled={questions.length === 0}
              onClick={() => setSaveAsDraft(true)}
            />
            <Button
              text="Publish form"
              iconPosition="before"
              icon="/icons/check-icon.svg"
              disabled={questions.length === 0}
              onClick={handlePublishForm}
              loading={loading}
            />
          </div>
        )}
      </div>

      {/* Modals */}
      <QuestionsModal
        isOpen={isQuestionsModalOpen}
        onClose={() => setIsQuestionsModalOpen(false)}
        setQuestions={setQuestions}
      />

      <SuccessModal
        title="Form submitted successfully"
        subText="Thank you for submitting your form. We will get back to you soon."
        isOpen={isFormSubmitted}
        onClose={() => setIsFormSubmitted(false)}
      />

      <SuccessModal
        title="Form saved as a draft"
        isOpen={saveAsDraft}
        onClose={() => setSaveAsDraft(false)}
      />
    </main>
  );
}
