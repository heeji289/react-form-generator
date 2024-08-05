import React from 'react';
import { TextQuestion } from '../form.type';
import * as styles from './style.css';
import { QuestionLabel } from './QuestionLabel';

interface QuestionTextProps {
  showError: boolean;
  question: TextQuestion;
  answer: string;
  onChangeAnswer: (answer: string) => void;
}

export function QuestionText({
  showError,
  question,
  answer,
  onChangeAnswer,
}: QuestionTextProps) {
  return (
    <div className={styles.questionContainer}>
      <QuestionLabel question={question} />
      <input
        type='text'
        value={answer}
        onChange={(e) => onChangeAnswer(e.target.value)}
        required={question.required}
        className={styles.textInput}
      />
      {showError && question.required && !answer && (
        <div style={{ color: 'red' }}>필수 항목입니다.</div>
      )}
    </div>
  );
}
