import React from 'react';
import { Question } from '../form.type';

interface QuestionTextProps {
  question: Question;
  answer: string;
  onChangeAnswer: (answer: string) => void;
  renderLabel: () => JSX.Element;
}

export function QuestionText({
  question,
  answer,
  onChangeAnswer,
  renderLabel,
}: QuestionTextProps) {
  return (
    <div>
      {renderLabel()}
      <input
        type='text'
        value={answer}
        onChange={(e) => onChangeAnswer(e.target.value)}
        required={question.required}
      />
    </div>
  );
}
