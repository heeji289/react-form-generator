import { SurveyQuestion } from '../../../app/survey/types/survey-question';
import * as styles from './styles.css';

interface QuestionOptionInputProps {
  question: SurveyQuestion;
  onQuestionChange: (updatedQuestion: SurveyQuestion) => void;
}

export function QuestionOptionInput({
  question,
  onQuestionChange,
}: QuestionOptionInputProps) {
  const handleChangeOption = (index: number, value: string) => {
    const newOptions = [...(question.options || [])];
    newOptions[index] = value;
    onQuestionChange({ ...question, options: newOptions });
  };

  const handleAddOption = () => {
    onQuestionChange({
      ...question,
      options: [...(question.options || []), ''],
    });
  };

  const handleDeleteOption = (index: number) => {
    const newOptions = question.options?.filter((_, i) => i !== index);
    onQuestionChange({ ...question, options: newOptions });
  };

  return (
    <div className={styles.optionsContainer}>
      <h4>옵션:</h4>

      {question.options?.map((option, index) => (
        <div key={index}>
          <input
            className={`${styles.input} ${styles.optionInput}`}
            type='text'
            value={option}
            onChange={(e) => handleChangeOption(index, e.target.value)}
          />
          <button
            className={styles.removeButton}
            type='button'
            onClick={() => handleDeleteOption(index)}
          >
            삭제
          </button>
        </div>
      ))}

      <button className={styles.button} type='button' onClick={handleAddOption}>
        옵션 추가
      </button>
    </div>
  );
}
