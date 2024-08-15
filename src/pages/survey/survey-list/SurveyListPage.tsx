import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '../../../shared/hooks/useQuery';

export default function SurveyListPage() {
  const {
    data: surveys,
    isLoading,
    error,
  } = useQuery({
    queryFn: async () => {
      return fetch('/surveys').then((res) => res.json());
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!surveys) {
    return <div>Empty</div>;
  }

  return (
    <div>
      <h1>설문지 목록</h1>
      <Link to={'/surveys/edit'}>설문지 만들기</Link>
      <ul>
        {surveys.map((survey: any) => (
          <li key={survey.id}>
            <Link to={`/surveys/edit/${survey.id}`}>{survey.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
