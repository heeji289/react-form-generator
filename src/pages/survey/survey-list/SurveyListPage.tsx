import React from 'react';
import { Link } from 'react-router-dom';

export default function SurveyListPage() {
  return (
    <div>
      <Link to={'/surveys/edit'}>새로 만들기</Link>
    </div>
  );
}
