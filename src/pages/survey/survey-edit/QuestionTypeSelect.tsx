import React from 'react';
import { SurveyQuestion } from '../../../app/survey/types/survey-question';
import * as styles from './styles.css';

interface QuestionTypeSelectProps {
  question: SurveyQuestion;
  onQuestionChange: (updatedQuestion: SurveyQuestion) => void;
}

const QUESTION_TYPES = [
  { value: 'text', label: '단답형' },
  { value: 'paragraph', label: '장문형' },
  { value: 'radio', label: '객관식 질문' },
  { value: 'checkbox', label: '체크박스' },
  { value: 'dropdown', label: '드롭다운' },
];

export function QuestionTypeSelect({
  question,
  onQuestionChange,
}: QuestionTypeSelectProps) {
  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onQuestionChange({
      ...question,
      type: e.target.value as SurveyQuestion['type'],
    });
  };

  return (
    <div className={styles.questionTypeSelect}>
      <select
        className={styles.select}
        value={question.type}
        onChange={handleTypeChange}
      >
        {QUESTION_TYPES.map(({ value, label }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
    </div>
  );
}
