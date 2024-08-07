import React from 'react';
import { useLocation } from 'react-router-dom';

export function SurveyResultPage() {
  const location = useLocation();
  const { values } = location.state || {};

  return <div>{JSON.stringify(values, null, 2)}</div>;
}
