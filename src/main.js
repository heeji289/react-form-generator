import App from './App';

import Router from './router';
import Temp from './Temp';

const routes = {
  '/': App(),
  '/temp': Temp(),
};

const router = new Router(routes);
