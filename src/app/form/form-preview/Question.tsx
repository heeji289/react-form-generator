import React from 'react';
import { Question as QuestionType } from '../form.type';
import { QuestionText } from './QuestionText';
import { QuestionRadio } from './QuestionRadio';
import { QuestionCheckbox } from './QuestionCheckbox';
import { QuestionTextarea } from './QuestionTextArea';
import * as styles from './style.css';

interface QuestionProps {
  question: QuestionType;
  answer: string | string[];
  onChangeAnswer: (answer: string | string[]) => void;
}

export function Question({ question, answer, onChangeAnswer }: QuestionProps) {
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
          question={question}
          answer={(answer ?? '') as string}
          onChangeAnswer={onChangeAnswer}
          renderLabel={renderLabel}
        />
      );
    case 'radio':
      return (
        <QuestionRadio
          question={question}
          answer={(answer ?? '') as string}
          onChangeAnswer={onChangeAnswer}
          renderLabel={renderLabel}
        />
      );
    case 'checkbox':
      return (
        <QuestionCheckbox
          question={question}
          answer={(answer ?? []) as string[]}
          onChangeAnswer={onChangeAnswer}
          renderLabel={renderLabel}
        />
      );
    case 'textarea':
      return (
        <QuestionTextarea
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
