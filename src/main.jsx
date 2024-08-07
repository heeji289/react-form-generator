import App from './App';

import { FormPreviewPage } from './app/form/form-preview/FormPreviewPage';
import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import FormSubmitPage from './app/form/form-submit/FormSubmitPage';
import { SurveyPage } from './pages/survey/survey-response/SurveyPage';
import { SurveyResultPage } from './pages/survey/survey-result/SurveyResultPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/form/:id',
    element: <FormPreviewPage />,
  },
  {
    path: '/form/:id/submit',
    element: <FormSubmitPage />,
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
