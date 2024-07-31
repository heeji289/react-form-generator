import React from 'react';
import { Question } from '../form.type';
import * as styles from './style.css';

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
    <div className={styles.questionContainer}>
      {renderLabel()}
      <input
        type='text'
        value={answer}
        onChange={(e) => onChangeAnswer(e.target.value)}
        required={question.required}
        className={styles.textInput}
      />
    </div>
  );
}
