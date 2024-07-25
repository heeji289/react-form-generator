import App from './App';

import { Form } from './form/Form';
import Router from './router';
import Temp from './Temp';

const routes = {
  '/': <App />,
  '/temp': <Temp />,
  '/form/:id': <Form />,
};

const router = new Router(routes);
