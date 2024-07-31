import React from 'react';
import { Question } from '../form.type';
import * as styles from './style.css';

interface QuestionTextareaProps {
  showError: boolean;
  question: Question;
  answer: string;
  onChangeAnswer: (answer: string) => void;
  renderLabel: () => JSX.Element;
}

export function QuestionTextarea({
  showError,
  question,
  answer,
  onChangeAnswer,
  renderLabel,
}: QuestionTextareaProps) {
  return (
    <div className={styles.questionContainer}>
      {renderLabel()}
      <textarea
        value={answer}
        onChange={(e) => onChangeAnswer(e.target.value)}
        required={question.required}
        className={styles.textarea}
      />
      {showError && question.required && !answer && (
        <div style={{ color: 'red' }}>필수 항목입니다.</div>
      )}
    </div>
  );
}
