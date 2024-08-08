import App from './App';

import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { SurveyPage } from './pages/survey/survey-response/SurveyPage';
import { SurveyResultPage } from './pages/survey/survey-result/SurveyResultPage';
import SurveyListPage from './pages/survey/survey-list/SurveyListPage';
import SurveyEditPage from './pages/survey/survey-edit/SurveyEditPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/survey/:id',
    element: <SurveyPage />,
  },
  {
    path: '/survey/:id/result',
    element: <SurveyResultPage />,
  },
  {
    path: '/surveys',
    element: <SurveyListPage />,
  },
  {
    path: '/surveys/edit/:id?',
    element: <SurveyEditPage />,
  },
]);

ReactDOM.createRoot(document.getElementById('app')).render(
  <RouterProvider router={router} />
);
