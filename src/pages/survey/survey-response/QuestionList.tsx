import React from 'react';
import { SurveyQuestion } from '../../../app/survey/types/survey-question';
import * as styles from './styles.css';

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
  return (
    <>
      {questions.map((question) => (
        <div key={question.id} className={styles.questionContainer}>
          <label htmlFor={question.id} className={styles.questionTitle}>
            {question.title}
            {question.required && (
              <span className={styles.requiredStar}>*</span>
            )}
          </label>
          {question.type === 'text' && (
            <input
              {...getFieldProps(question.id, { type: 'text' })}
              className={styles.textInput}
            />
          )}
          {question.type === 'textarea' && (
            <textarea
              {...getFieldProps(question.id, { type: 'textarea' })}
              className={styles.textarea}
            />
          )}
          {question.type === 'radio' && question.options && (
            <div className={styles.radioContainer}>
              {question.options.map((option) => (
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
          )}
          {question.type === 'checkbox' && question.options && (
            <div>
              {question.options.map((option) => (
                <label key={option}>
                  <input
                    type='checkbox'
                    {...getFieldProps(question.id, {
                      type: 'checkbox',
                      value: option,
                    })}
                    checked={(values[question.id] as string[])?.includes(
                      option
                    )}
                  />
                  {option}
                </label>
              ))}
            </div>
          )}

          {touched[question.id] && errors[question.id] && (
            <p className={styles.errorText}>{errors[question.id]}</p>
          )}
        </div>
      ))}
    </>
  );
}
