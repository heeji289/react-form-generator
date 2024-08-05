import React from 'react';
import { TextQuestion } from '../form.type';
import * as styles from './style.css';
import { QuestionLabel } from './QuestionLabel';

interface QuestionTextareaProps {
  showError: boolean;
  question: TextQuestion;
  answer: string;
  onChangeAnswer: (answer: string) => void;
}

export function QuestionTextarea({
  showError,
  question,
  answer,
  onChangeAnswer,
}: QuestionTextareaProps) {
  return (
    <div className={styles.questionContainer}>
      <QuestionLabel question={question} />
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
