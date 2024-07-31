import React, { useEffect } from 'react';
import { Answers } from '../form.type';
import { Question } from './Question';
import { formData } from './form.data';
import { useNavigate, useParams } from 'react-router-dom';
import { loadForm, saveForm } from './utils';
import * as styles from './style.css';

export const Form = () => {
  const { id: formID } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [sectionIndex, setSectionIndex] = React.useState(0);
  const [answers, setAnswers] = React.useState<Answers>({});

  const [showError, setShowError] = React.useState(false);

  const sectionData = formData.sections[sectionIndex];

  const handleAnswerChange = (
    questionID: string,
    answer: string | string[]
  ) => {
    setAnswers((prev) => {
      if (!formID) return prev;

      const newAnswers = { ...prev, [questionID]: answer };
      saveForm(formID, {
        id: formID,
        title: formData.title,
        answers: newAnswers,
      });

      return newAnswers;
    });
  };

  const handleClickNextButton = () => {
    const isInvalid = sectionData.questions.some((question) => {
      if (question.type === 'checkbox') {
        return (
          question.required &&
          (!answers[question.id] || answers[question.id].length === 0)
        );
      } else {
        return question.required && !answers[question.id];
      }
    });

    if (isInvalid) {
      setShowError(true);
      return;
    }

    if (sectionIndex < formData.sections.length - 1) {
      setSectionIndex(sectionIndex + 1);
    } else {
      // TODO: 제출
      // 저장하고
      // 페이지 `이동
      navigate(`/form/${formID}/submit`);
    }
  };

  const handleClickPreviousButton = () => {
    if (sectionIndex > 0) {
      setSectionIndex(sectionIndex - 1);
    }
  };

  useEffect(() => {
    if (!formID) return;

    const result = loadForm(formID);
    setAnswers(result.answers ?? []);
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
          showError={showError}
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
