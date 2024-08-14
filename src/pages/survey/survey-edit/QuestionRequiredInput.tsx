import React from 'react';
import { SurveyQuestion } from '../../../app/survey/types/survey-question';
import * as styles from './styles.css';

interface QuestionRequiredInputProps {
  question: SurveyQuestion;
  onQuestionChange: (updatedQuestion: SurveyQuestion) => void;
}

export function QuestionRequiredInput({
  question,
  onQuestionChange,
}: QuestionRequiredInputProps) {
  const handleRequiredChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onQuestionChange({ ...question, required: e.target.checked });
  };

  return (
    <label>
      <input
        className={styles.checkbox}
        type='checkbox'
        checked={question.required}
        onChange={handleRequiredChange}
      />
      필수 질문
    </label>
  );
}
