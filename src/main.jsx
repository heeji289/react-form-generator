import App from './App';

import { Form } from './app/form/form-preview/Form';
import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/form/:id',
    element: <Form />,
  },
]);

ReactDOM.createRoot(document.getElementById('app')).render(
  <RouterProvider router={router} />
);
