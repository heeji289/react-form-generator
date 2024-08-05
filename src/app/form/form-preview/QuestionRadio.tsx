import React from 'react';
import { ChoiceQuestion } from '../form.type';
import * as styles from './style.css';
import { QuestionLabel } from './QuestionLabel';

interface QuestionRadioProps {
  showError: boolean;
  question: ChoiceQuestion;
  answer: string;
  onChangeAnswer: (answer: string) => void;
}

export function QuestionRadio({
  showError,
  question,
  answer,
  onChangeAnswer,
}: QuestionRadioProps) {
  return (
    <div className={styles.questionContainer}>
      <div className={styles.radioContainer}>
        <QuestionLabel question={question} />

        {question.options.map((option) => (
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
        {showError && question.required && !answer && (
          <div style={{ color: 'red' }}>필수 항목입니다.</div>
        )}
      </div>
    </div>
  );
}
