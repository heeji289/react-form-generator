import React from 'react';
import { useSurveyData } from '../../../app/survey/hooks/useSurveyData';
import { useForm } from '../../../shared/useForm';
import { SurveyQuestion } from '../../../app/survey/types/survey-question';
import { useNavigateItems } from '../../../shared/useNavigateItems';
import { QuestionList } from './QuestionList';
import { SurveyFooter } from './SurveyFooter';

export function SurveyPage() {
  // 1. 서버로부터 설문 데이터를 가져온다.
  const { data } = useSurveyData();

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
  const { values, getFieldProps, handleSubmit } = useForm({
    initialValues: getInitialValues(data.sections.flatMap((s) => s.questions)),
    validate: () => ({}),
    onSubmit: (values) => console.log('제출!', values),
  });

  return (
    <div>
      <div>
        <h1>{data.title}</h1>
        <h2>{currentSurveySection.title}</h2>
      </div>

      <form onSubmit={handleSubmit}>
        <QuestionList
          questions={currentSurveySection.questions}
          getFieldProps={getFieldProps}
          values={values}
        />
        <SurveyFooter
          isFirstSection={isFirstSection}
          isLastSection={isLastSection}
          handlePrev={handlePrev}
          handleNext={handleNext}
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
