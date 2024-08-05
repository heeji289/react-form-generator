import { useState } from 'react';
import { Question } from './Question';
import { formData } from './form.data';
import { useNavigate, useParams } from 'react-router-dom';
import { saveForm } from './utils';
import * as styles from './style.css';
import { useForm } from './useForm';
import { Answers, Section } from '../form.type';

function checkRequiredFieldFilled(sectionData: Section, answers: Answers) {
  return sectionData.questions.some((question) => {
    if (question.type === 'checkbox') {
      return (
        question.required &&
        (!answers[question.id] || answers[question.id].length === 0)
      );
    } else {
      return question.required && !answers[question.id];
    }
  });
}

export const FormPreviewPage = () => {
  const { id: formID } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { answers, onChangeAnswer, onClearForm, showError, setShowError } =
    useForm();

  const [sectionIndex, setSectionIndex] = useState(0);
  const sectionData = formData.sections[sectionIndex];

  const handleClickNextButton = () => {
    if (checkRequiredFieldFilled(sectionData, answers)) {
      setShowError(true);
      return;
    }

    if (sectionIndex < formData.sections.length - 1) {
      setSectionIndex(sectionIndex + 1);
    } else {
      saveForm(formID ?? '', {
        id: formID ?? '',
        title: formData.title,
        answers,
      });
      navigate(`/form/${formID}/submit`);
    }
  };

  const handleClickPreviousButton = () => {
    if (sectionIndex < 1) return;

    setSectionIndex(sectionIndex - 1);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{formData.title}</h1>
      <h2>{sectionData.title}</h2>

      <button onClick={onClearForm}>양식 지우기</button>

      {sectionData.questions.map((question) => (
        <Question
          key={question.id}
          question={question}
          answer={answers[question.id]}
          onChangeAnswer={(answer) => onChangeAnswer(question.id, answer)}
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
