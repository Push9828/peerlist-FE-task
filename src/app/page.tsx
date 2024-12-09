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
  const [questions, setQuestions] = useState<QuestionItem[]>([]);
  const [previewState, setPreviewState] = useState<{
    id: string | null;
    isPreview: boolean;
  }>({ id: null, isPreview: false });
  const [loading, setLoading] = useState(false);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormTitle(e.target.value);
  };

  const handlePublishForm = async () => {
    if (!formTitle || questions.length === 0) {
      alert("Form must have a title and at least one question.");
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

  return (
    <main className="flex flex-col min-h-screen max-w-2xl mx-auto border border-[#E1E4E8] ">
      <div className="flex justify-between px-6 py-4">
        <input
          type="text"
          placeholder="Untitled Form"
          value={formTitle}
          onChange={handleTitleChange}
          className="text-lg font-semibold border-none bg-transparent focus:outline-none"
        />
        {!previewState.isPreview && (
          <Button
            text="Preview"
            iconPosition="after"
            isPrimary
            icon="/icons/link-icon.svg"
            disabled={questions.length === 0}
            onClick={() => setPreviewState({ id: null, isPreview: true })}
          />
        )}
      </div>
      <hr />

      <div className="my-6">
        <RenderQuestions
          questionsData={questions}
          setQuestions={setQuestions}
          previewMode={previewState.isPreview}
          handleFormSubmit={handleFormSubmit}
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
    </main>
  );
}
