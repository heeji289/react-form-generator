import React from 'react';
import { Question } from '../form.type';

interface QuestionRadioProps {
  question: Question;
  answer: string;
  onChangeAnswer: (answer: string) => void;
  renderLabel: () => JSX.Element;
}

export function QuestionRadio({
  question,
  answer,
  onChangeAnswer,
  renderLabel,
}: QuestionRadioProps) {
  return (
    <div>
      {renderLabel()}
      {question.options?.map((option) => (
        <div key={option}>
          <input
            type='radio'
            id={`${question.id}-${option}`}
            name={question.id}
            value={option}
            checked={answer === option}
            onChange={() => onChangeAnswer(option)}
            required={question.required}
          />
          <label htmlFor={`${question.id}-${option}`}>{option}</label>
        </div>
      ))}
    </div>
  );
}
