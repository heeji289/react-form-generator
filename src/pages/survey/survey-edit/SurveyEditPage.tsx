import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '../../../shared/hooks/useQuery';
import { Survey } from '../../../app/survey/types/survey';
import { SurveyQuestion } from '../../../app/survey/types/survey-question';
import * as styles from './styles.css';
import QuestionContainer from './QuestionContainer';

export default function SurveyEditPage() {
  const { id } = useParams<{ id?: string }>();
  const [survey, setSurvey] = React.useState<Survey>({
    id: '',
    title: '',
    sections: [
      {
        id: '',
        title: '',
        questions: [],
      },
    ],
  });

  const { data, isLoading, error } = useQuery({
    queryFn: async () => fetch(`/surveys/${id}`).then((res) => res.json()),
    onSuccess: (data: Survey) => setSurvey(data),
  });

  const handleChangeSurvey = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setSurvey((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddQuestion = () => {
    const newQuestion: SurveyQuestion = {
      id: Date.now().toString(),
      title: '',
      type: 'text',
      required: false,
    };

    // TODO: immer
    setSurvey((prev) => ({
      ...prev,
      sections: [
        {
          ...prev.sections[0],
          questions: [...prev.sections[0].questions, newQuestion],
        },
      ],
    }));
  };

  const handleChangeQuestion = (updatedQuestion: SurveyQuestion) => {
    const newQuestions = [...survey.sections[0].questions];
    const index = newQuestions.findIndex(
      (question) => question.id === updatedQuestion.id
    );
    newQuestions[index] = updatedQuestion;
    setSurvey((prev) => ({
      ...prev,
      sections: [{ ...prev.sections[0], questions: newQuestions }],
    }));
  };

  // TODO: Suspense
  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>에러</div>;

  if (!survey) {
    return <div>Empty</div>;
  }

  return (
    <div className={styles.container}>
      <form className={styles.form}>
        <div className={styles.inputGroup}>
          <input
            className={styles.input}
            type='text'
            id='title'
            name='title'
            value={survey.title}
            onChange={handleChangeSurvey}
          />
        </div>

        {/* NOTE: 현재 섹션 관련 제어는 고려하지 않음 */}
        {survey.sections[0].questions.map((question) => (
          <QuestionContainer
            key={question.id}
            question={question}
            onQuestionChange={handleChangeQuestion}
          />
        ))}

        <button
          className={styles.button}
          type='button'
          onClick={handleAddQuestion}
        >
          질문 추가
        </button>
        <button className={styles.button} type='submit'>
          저장
        </button>
      </form>
    </div>
  );
}
