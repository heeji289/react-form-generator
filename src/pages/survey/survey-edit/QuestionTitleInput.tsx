import React from 'react';
import { SurveyQuestion } from '../../../app/survey/types/survey-question';
import * as styles from './styles.css';

interface QuestionTitleInputProps {
  question: SurveyQuestion;
  onQuestionChange: (updatedQuestion: SurveyQuestion) => void;
}

export function QuestionTitleInput({
  question,
  onQuestionChange,
}: QuestionTitleInputProps) {
  return (
    <input
      className={styles.input}
      type='text'
      value={question.title}
      onChange={(e) =>
        onQuestionChange({
          ...question,
          title: e.target.value,
        })
      }
      placeholder='질문을 입력해주세요.'
    />
  );
}
