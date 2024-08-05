import React from 'react';
import { ChoiceQuestion } from '../form.type';
import * as styles from './style.css';

interface QuestionCheckboxProps {
  showError: boolean;
  question: ChoiceQuestion;
  answer: string[];
  onChangeAnswer: (answer: string[]) => void;
  renderLabel: () => JSX.Element;
}

export function QuestionCheckbox({
  showError,
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
    <div className={styles.questionContainer}>
      <div className={styles.radioContainer}>
        {renderLabel()}
        {question.options.map((option) => (
          <div key={option} className={styles.radioLabel}>
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
        {showError && question.required && answer.length === 0 && (
          <div style={{ color: 'red' }}>필수 항목입니다.</div>
        )}
      </div>
    </div>
  );
}
