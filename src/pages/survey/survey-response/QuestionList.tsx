import React from 'react';
import { SurveyQuestion } from '../../../app/survey/types/survey-question';

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
        <div key={question.id}>
          <label htmlFor={question.id}>{question.title}</label>
          {question.type === 'text' && (
            <input {...getFieldProps(question.id, { type: 'text' })} />
          )}
          {question.type === 'textarea' && (
            <textarea {...getFieldProps(question.id, { type: 'textarea' })} />
          )}
          {question.type === 'radio' && question.options && (
            <div>
              {question.options.map((option) => (
                <label key={option}>
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
