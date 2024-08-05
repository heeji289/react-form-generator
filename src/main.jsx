import App from './App';

import { FormPreviewPage } from './app/form/form-preview/FormPreviewPage';
import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import FormSubmitPage from './app/form/form-submit/FormSubmitPage';

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
]);

ReactDOM.createRoot(document.getElementById('app')).render(
  <RouterProvider router={router} />
);
