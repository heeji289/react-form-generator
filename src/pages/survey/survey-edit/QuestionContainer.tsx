import React from 'react';
import { SurveyQuestion } from '../../../app/survey/types/survey-question';
import * as styles from './styles.css';
import { QuestionTypeSelect } from './QuestionTypeSelect';
import { QuestionOptionInput } from './QuestionOptionInput';
import { QuestionTitleInput } from './QuestionTitleInput';
import { QuestionRequiredInput } from './QuestionRequiredInput';

interface QuestionContainerProps {
  question: SurveyQuestion;
  onQuestionChange: (updatedQuestion: SurveyQuestion) => void;
}

const OPTION_NEED_TYPES = ['radio', 'checkbox'];

/**
 * 설문지 생성/수정 페이지 > 질문 컴포넌트
 */
export default function QuestionContainer({
  question,
  onQuestionChange,
}: QuestionContainerProps) {
  return (
    <div className={styles.questionContainer}>
      <QuestionTitleInput
        question={question}
        onQuestionChange={onQuestionChange}
      />

      <QuestionTypeSelect
        question={question}
        onQuestionChange={onQuestionChange}
      />

      <QuestionRequiredInput
        question={question}
        onQuestionChange={onQuestionChange}
      />

      {OPTION_NEED_TYPES.includes(question.type) && (
        <QuestionOptionInput
          question={question}
          onQuestionChange={onQuestionChange}
        />
      )}
    </div>
  );
}
