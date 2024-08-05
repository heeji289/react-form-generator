import React from 'react';
import { Question as QuestionType } from '../form.type';
import { QuestionText } from './QuestionText';
import { QuestionRadio } from './QuestionRadio';
import { QuestionCheckbox } from './QuestionCheckbox';
import { QuestionTextarea } from './QuestionTextArea';

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
  switch (question.type) {
    case 'text':
      return (
        <QuestionText
          showError={showError}
          question={question}
          answer={(answer ?? '') as string}
          onChangeAnswer={onChangeAnswer}
        />
      );
    case 'radio':
      return (
        <QuestionRadio
          showError={showError}
          question={question}
          answer={(answer ?? '') as string}
          onChangeAnswer={onChangeAnswer}
        />
      );
    case 'checkbox':
      return (
        <QuestionCheckbox
          showError={showError}
          question={question}
          answer={(answer ?? []) as string[]}
          onChangeAnswer={onChangeAnswer}
        />
      );
    case 'textarea':
      return (
        <QuestionTextarea
          showError={showError}
          question={question}
          answer={(answer ?? '') as string}
          onChangeAnswer={onChangeAnswer}
        />
      );
    default:
      return null;
  }
}
