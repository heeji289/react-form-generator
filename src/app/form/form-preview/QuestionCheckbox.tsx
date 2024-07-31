import React from 'react';
import { Question } from '../form.type';

interface QuestionCheckboxProps {
  question: Question;
  answer: string[];
  onChangeAnswer: (answer: string[]) => void;
  renderLabel: () => JSX.Element;
}

export function QuestionCheckbox({
  question,
  answer,
  onChangeAnswer,
  renderLabel,
}: QuestionCheckboxProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newAnswer = [...answer];
    if (e.target.checked) {
      newAnswer.push(e.target.value);
    } else {
      const index = newAnswer.indexOf(e.target.value);
      if (index > -1) newAnswer.splice(index, 1);
    }
    onChangeAnswer(newAnswer);
  };

  return (
    <div>
      {renderLabel()}
      {question.options?.map((option) => (
        <div key={option}>
          <input
            type='checkbox'
            id={`${question.id}-${option}`}
            name={question.id}
            value={option}
            checked={answer.includes(option)}
            onChange={handleChange}
          />
          <label htmlFor={`${question.id}-${option}`}>{option}</label>
        </div>
      ))}
    </div>
  );
}
