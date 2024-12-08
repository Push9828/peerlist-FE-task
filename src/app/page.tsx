"use client";
import { useState } from "react";
import { Button } from "@/components/Button";
import { QuestionsModal } from "@/components/QuestionsModal";

export default function Home() {
  const [formTitle, setFormTitle] = useState("");
  const [questions, setQuestions] = useState<string[]>([]);
  const [isQuestionsModalOpen, setIsQuestionsModalOpen] = useState(false);
  const [questionType, setQuestionType] = useState<number | null>(null);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormTitle(e.target.value);
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
        <Button
          text="Preview"
          iconPosition="after"
          isPrimary
          icon="/icons/link-icon.svg"
          disabled={questions.length === 0}
        />
      </div>
      <hr />
      <div className="flex flex-col items-center mt-4 min-h-56">
        <Button
          text="Add Question"
          iconPosition="before"
          isPrimary
          icon="/icons/plus-icon.svg"
          onClick={() => setIsQuestionsModalOpen(true)}
        />
      </div>
      <div className=" mt-auto">
        <hr />
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
          />
        </div>
      </div>

      <QuestionsModal
        isOpen={isQuestionsModalOpen}
        onClose={() => setIsQuestionsModalOpen(false)}
        setQuestionType={setQuestionType}
      />
    </main>
  );
}
