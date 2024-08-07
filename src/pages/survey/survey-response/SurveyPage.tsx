import React from 'react';
import { useSurveyData } from '../../../app/survey/hooks/useSurveyData';
import { useForm } from '../../../shared/hooks/useForm';
import { SurveyQuestion } from '../../../app/survey/types/survey-question';
import { useNavigateItems } from '../../../shared/hooks/useNavigateItems';
import { QuestionList } from './QuestionList';
import { SurveyFooter } from './SurveyFooter';
import { useNavigate } from 'react-router-dom';
import * as styles from './styles.css';
import {
  getSessionItem,
  removeSessionItem,
} from '../../../shared/utils/session-storage';

export function SurveyPage() {
  const navigate = useNavigate();

  // 1. 서버로부터 설문 데이터를 가져온다.
  const { data } = useSurveyData();

  const [sessionValues, _] = React.useState(() => {
    const initialValue = getInitialValues(
      data.sections.flatMap((s) => s.questions)
    );
    return getSessionItem('surveyResponses', initialValue);
  });

  // 2. 섹션 간 이동을 위한 훅
  const {
    currentIndex: currentSectionIndex,
    isFirst: isFirstSection,
    isLast: isLastSection,
    handlePrev,
    handleNext,
  } = useNavigateItems({ length: data.sections.length });
  const currentSurveySection = data.sections[currentSectionIndex];

  // 3. 사용자 응답 데이터를 관리하기 위한 폼 훅
  const { values, errors, touched, getFieldProps, handleSubmit, resetForm } =
    useForm({
      initialValues: sessionValues,
      validate: (values) => {
        const errors: Record<string, string> = {};
        currentSurveySection.questions.forEach((question) => {
          if (
            question.required &&
            (question.type === 'checkbox'
              ? values[question.id].length === 0
              : !values[question.id])
          ) {
            errors[question.id] = '이 질문은 필수입니다.';
          }
        });
        return errors;
      },
      onSubmit: (values) => {
        if (Object.values(errors).some((error) => error)) {
          return;
        }

        navigate(`/survey/${data.id}/result`, { state: { values } });
      },
    });

  const onClickNextButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (Object.values(errors).some((error) => error)) {
      return;
    }

    handleNext(e);
  };

  const onClearForm = () => {
    resetForm();
    removeSessionItem('surveyResponses');
  };

  // 응답 변경 시 세션 스토리지에 저장
  React.useEffect(() => {
    sessionStorage.setItem('surveyResponses', JSON.stringify(values));
  }, [values]);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{data.title}</h1>
      <h2>{currentSurveySection.title}</h2>

      <form onSubmit={handleSubmit}>
        <QuestionList
          questions={currentSurveySection.questions}
          getFieldProps={getFieldProps}
          values={values}
          errors={errors}
          touched={touched}
        />
        <SurveyFooter
          isFirstSection={isFirstSection}
          isLastSection={isLastSection}
          handlePrev={handlePrev}
          handleNext={onClickNextButton}
          handleClearForm={onClearForm}
        />
      </form>
    </div>
  );
}

const getInitialValues = (questions: SurveyQuestion[]) => {
  const initial: Record<string, string | string[]> = {};

  questions.forEach((question) => {
    initial[question.id] = question.type === 'checkbox' ? [] : '';
  });

  return initial;
};
