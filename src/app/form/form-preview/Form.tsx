import React from 'react';
import { Form as FormType } from '../form.type';
import { Question } from './Question';
import { formData } from './form.data';

type Answers = {
  [questionID: string]: string | string[];
};

export const Form = () => {
  const [sectionIndex, setSectionIndex] = React.useState(0);
  const [answers, setAnswers] = React.useState<Answers>({});

  const sectionData = formData.sections[sectionIndex];

  const handleAnswerChange = (
    questionID: string,
    answer: string | string[]
  ) => {
    setAnswers((prev) => ({ ...prev, [questionID]: answer }));
  };

  const handleClickNextButton = () => {
    if (sectionIndex < formData.sections.length - 1) {
      setSectionIndex(sectionIndex + 1);
    } else {
      // TODO: 제출
    }
  };

  const handleClickPreviousButton = () => {
    if (sectionIndex > 0) {
      setSectionIndex(sectionIndex - 1);
    }
  };

  return (
    <div>
      <h1>{formData.title}</h1>
      <h2>{sectionData.title}</h2>

      {sectionData.questions.map((question) => (
        <Question
          key={question.id}
          question={question}
          answer={answers[question.id]}
          onChangeAnswer={(answer) => handleAnswerChange(question.id, answer)}
        />
      ))}

      <button onClick={handleClickPreviousButton} disabled={sectionIndex === 0}>
        이전
      </button>
      <button onClick={handleClickNextButton}>
        {sectionIndex === formData.sections.length - 1 ? '제출' : '다음'}
      </button>
    </div>
  );
};
