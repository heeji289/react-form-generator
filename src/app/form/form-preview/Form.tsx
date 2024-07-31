import React, { useEffect } from 'react';
import { Answers } from '../form.type';
import { Question } from './Question';
import { formData } from './form.data';
import { useParams } from 'react-router-dom';
import { loadForm, saveForm } from './utils';
import * as styles from './style.css';

export const Form = () => {
  const { id: formID } = useParams<{ id: string }>();

  const [sectionIndex, setSectionIndex] = React.useState(0);
  const [answers, setAnswers] = React.useState<Answers>({});

  const sectionData = formData.sections[sectionIndex];

  const handleAnswerChange = (
    questionID: string,
    answer: string | string[]
  ) => {
    setAnswers((prev) => {
      if (!formID) return prev;

      const newAnswers = { ...prev, [questionID]: answer };
      saveForm(formID, newAnswers);

      return newAnswers;
    });
  };

  const handleClickNextButton = () => {
    if (sectionIndex < formData.sections.length - 1) {
      setSectionIndex(sectionIndex + 1);
    } else {
      // TODO: 제출
      // 저장하고
      // 페이지 이동
    }
  };

  const handleClickPreviousButton = () => {
    if (sectionIndex > 0) {
      setSectionIndex(sectionIndex - 1);
    }
  };

  useEffect(() => {
    if (!formID) return;

    setAnswers(loadForm(formID));
  }, [formID]);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{formData.title}</h1>
      <h2>{sectionData.title}</h2>

      {sectionData.questions.map((question) => (
        <Question
          key={question.id}
          question={question}
          answer={answers[question.id]}
          onChangeAnswer={(answer) => handleAnswerChange(question.id, answer)}
        />
      ))}

      <div className={styles.navigationContainer}>
        <button
          onClick={handleClickPreviousButton}
          disabled={sectionIndex === 0}
          className={styles.navigationButton}
        >
          이전
        </button>
        <button
          onClick={handleClickNextButton}
          className={styles.navigationButton}
        >
          {sectionIndex === formData.sections.length - 1 ? '제출' : '다음'}
        </button>
      </div>
    </div>
  );
};
