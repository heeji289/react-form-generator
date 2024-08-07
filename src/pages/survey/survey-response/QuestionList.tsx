import React from 'react';
import * as styles from './styles.css';
import { SurveyQuestion } from '../../../app/survey/types/survey-question';

interface QuestionListProps {
  questions: SurveyQuestion[];
  getFieldProps: any;
  values: Record<string, string | string[]>;
  touched: Record<string, boolean>;
  errors: Record<string, string>;
}

export function QuestionList({
  questions,
  getFieldProps,
  values,
  touched,
  errors,
}: QuestionListProps) {
  const renderQuestion = (question: SurveyQuestion) => {
    const props = { question, getFieldProps, values, touched, errors };
    switch (question.type) {
      case 'text':
        return <TextQuestion {...props} />;
      case 'textarea':
        return <TextareaQuestion {...props} />;
      case 'radio':
        return <RadioQuestion {...props} />;
      case 'checkbox':
        return <CheckboxQuestion {...props} />;
      default:
        return null;
    }
  };

  return questions.map((question) => (
    <div key={question.id} className={styles.questionContainer}>
      <label htmlFor={question.id} className={styles.questionTitle}>
        {question.title}
        {question.required && <span className={styles.requiredStar}>*</span>}
      </label>
      {renderQuestion(question)}
      {touched[question.id] && errors[question.id] && (
        <p className={styles.errorText}>{errors[question.id]}</p>
      )}
    </div>
  ));
}

// ******

interface QuestionProps {
  question: SurveyQuestion;
  getFieldProps: any;
  values: Record<string, string | string[]>;
  touched: Record<string, boolean>;
  errors: Record<string, string>;
}

function TextQuestion({ question, getFieldProps }: QuestionProps) {
  return (
    <input
      {...getFieldProps(question.id, { type: 'text' })}
      className={styles.textInput}
    />
  );
}

function TextareaQuestion({ question, getFieldProps }: QuestionProps) {
  return (
    <textarea
      {...getFieldProps(question.id, { type: 'textarea' })}
      className={styles.textarea}
    />
  );
}

function RadioQuestion({ question, getFieldProps }: QuestionProps) {
  return (
    <div className={styles.radioContainer}>
      {question.options?.map((option) => (
        <label key={option} className={styles.radioLabel}>
          <input
            {...getFieldProps(question.id, {
              type: 'radio',
              value: option,
            })}
          />
          {option}
        </label>
      ))}
    </div>
  );
}

function CheckboxQuestion({ question, getFieldProps, values }: QuestionProps) {
  return (
    <div className={styles.radioContainer}>
      {question.options?.map((option) => (
        <label key={option} className={styles.radioLabel}>
          <input
            type='checkbox'
            {...getFieldProps(question.id, {
              type: 'checkbox',
              value: option,
            })}
            checked={(values[question.id] as string[])?.includes(option)}
          />
          {option}
        </label>
      ))}
    </div>
  );
}
