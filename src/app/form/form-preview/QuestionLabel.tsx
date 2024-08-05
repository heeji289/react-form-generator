import { Question } from '../form.type';
import * as styles from './style.css';

interface QuestionLabelProps {
  question: Question;
}

export function QuestionLabel({ question }: QuestionLabelProps) {
  return (
    <label className={styles.questionTitle}>
      {question.title}
      {question.required && <span style={{ color: 'red' }}> *</span>}
    </label>
  );
}
