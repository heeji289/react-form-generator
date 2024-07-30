import React from 'react';

export function Question({ question, answer = '', onChangeAnswer }) {
  switch (question.type) {
    case 'text':
      return (
        <div>
          <label>{question.title}</label>
          <input
            type='text'
            value={answer}
            onChange={(e) => onChangeAnswer(e.target.value)}
            required={question.required}
          />
        </div>
      );
    case 'radio':
      return (
        <div>
          <label>{question.title}</label>
          {question.options.map((option) => (
            <div key={option}>
              <input
                type='radio'
                id={`${question.id}-${option}`}
                name={question.id}
                value={option}
                checked={answer === option}
                onChange={() => onChangeAnswer(option)}
                required={question.required}
              />
              <label htmlFor={`${question.id}-${option}`}>{option}</label>
            </div>
          ))}
        </div>
      );
    case 'checkbox':
      return (
        <div>
          <label>{question.title}</label>
          {question.options.map((option) => (
            <div key={option}>
              <input
                type='checkbox'
                id={`${question.id}-${option}`}
                name={question.id}
                value={option}
                checked={answer.includes(option)}
                onChange={(e) => {
                  const newAnswer = [...answer];
                  if (e.target.checked) {
                    newAnswer.push(option);
                  } else {
                    const index = newAnswer.indexOf(option);
                    if (index > -1) newAnswer.splice(index, 1);
                  }
                  onChangeAnswer(newAnswer);
                }}
              />
              <label htmlFor={`${question.id}-${option}`}>{option}</label>
            </div>
          ))}
        </div>
      );
    case 'textarea':
      return (
        <div>
          <label>{question.title}</label>
          <textarea
            value={answer}
            onChange={(e) => onChangeAnswer(e.target.value)}
            required={question.required}
          />
        </div>
      );
    default:
      return null;
  }
}
