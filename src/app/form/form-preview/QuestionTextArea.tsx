import React from 'react';
import { Question } from '../form.type';

interface QuestionTextareaProps {
  question: Question;
  answer: string;
  onChangeAnswer: (answer: string) => void;
  renderLabel: () => JSX.Element;
}

export function QuestionTextarea({
  question,
  answer,
  onChangeAnswer,
  renderLabel,
}: QuestionTextareaProps) {
  return (
    <div>
      {renderLabel()}
      <textarea
        value={answer}
        onChange={(e) => onChangeAnswer(e.target.value)}
        required={question.required}
      />
    </div>
  );
}
