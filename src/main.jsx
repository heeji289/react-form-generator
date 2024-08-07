import App from './App';

import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { SurveyPage } from './pages/survey/survey-response/SurveyPage';
import { SurveyResultPage } from './pages/survey/survey-result/SurveyResultPage';

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
]);

ReactDOM.createRoot(document.getElementById('app')).render(
  <RouterProvider router={router} />
);
