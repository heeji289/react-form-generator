import React from 'react';
import { Question } from './Question';
import { Form as FormType } from './form.type';

// 폼 데이터 (서버에서 받아온 것으로 가정)
const formData: FormType = {
  id: 'form1',
  title: '제목 없는 설문지',
  sections: [
    {
      id: 'section1',
      title: '섹션1',
      questions: [
        {
          id: 'question1',
          type: 'text',
          title: '성함을 입력해주세요.',
          required: true,
        },
        {
          id: 'question2',
          type: 'radio',
          title: '성별',
          options: ['남자', '여자', '기타'],
          required: true,
        },
        {
          id: 'question3',
          type: 'checkbox',
          title: '좋아하는 색상을 선택해주세요.',
          options: ['빨간색', '주황', '노랑'],
          required: true,
        },
      ],
    },
    {
      id: 'section2',
      title: '섹션2',
      questions: [
        {
          id: 'question3',
          type: 'textarea',
          title: '자기소개 입력란',
          required: false,
        },
      ],
    },
  ],
};

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
