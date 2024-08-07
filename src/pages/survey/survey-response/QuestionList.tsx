import React from 'react';
import { SurveyQuestion } from '../../../app/survey/types/survey-question';
import * as styles from './styles.css';

export function QuestionList({
  questions,
  getFieldProps,
  values,
}: {
  questions: SurveyQuestion[];
  getFieldProps: any;
  values: Record<string, string | string[]>;
}) {
  return (
    <>
      {questions.map((question) => (
        <div key={question.id} className={styles.questionContainer}>
          <label htmlFor={question.id} className={styles.questionTitle}>
            {question.title}
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
        </div>
      ))}
    </>
  );
}
