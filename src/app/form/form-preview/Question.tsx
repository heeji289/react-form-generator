import React from 'react';
import { Question as QuestionType } from '../form.type';
import { QuestionText } from './QuestionText';
import { QuestionRadio } from './QuestionRadio';
import { QuestionCheckbox } from './QuestionCheckbox';
import { QuestionTextarea } from './QuestionTextArea';
import * as styles from './style.css';

interface QuestionProps {
  showError: boolean;
  question: QuestionType;
  answer: string | string[];
  onChangeAnswer: (answer: string | string[]) => void;
}

export function Question({
  showError,
  question,
  answer,
  onChangeAnswer,
}: QuestionProps) {
  const renderLabel = () => (
    <label className={styles.questionTitle}>
      {question.title}
      {question.required && <span style={{ color: 'red' }}> *</span>}
    </label>
  );

  switch (question.type) {
    case 'text':
      return (
        <QuestionText
          showError={showError}
          question={question}
          answer={(answer ?? '') as string}
          onChangeAnswer={onChangeAnswer}
          renderLabel={renderLabel}
        />
      );
    case 'radio':
      return (
        <QuestionRadio
          showError={showError}
          question={question}
          answer={(answer ?? '') as string}
          onChangeAnswer={onChangeAnswer}
          renderLabel={renderLabel}
        />
      );
    case 'checkbox':
      return (
        <QuestionCheckbox
          showError={showError}
          question={question}
          answer={(answer ?? []) as string[]}
          onChangeAnswer={onChangeAnswer}
          renderLabel={renderLabel}
        />
      );
    case 'textarea':
      return (
        <QuestionTextarea
          showError={showError}
          question={question}
          answer={(answer ?? '') as string}
          onChangeAnswer={onChangeAnswer}
          renderLabel={renderLabel}
        />
      );
    default:
      return null;
  }
}
