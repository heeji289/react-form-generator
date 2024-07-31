import React from 'react';
import { Question } from '../form.type';
import * as styles from './style.css';

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
    <div className={styles.questionContainer}>
      <div className={styles.radioContainer}>
        {renderLabel()}
        {question.options?.map((option) => (
          <div key={option} className={styles.radioLabel}>
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
    </div>
  );
}
