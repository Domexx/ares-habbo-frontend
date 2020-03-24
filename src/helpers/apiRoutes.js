const routes = {};

// Base URL
const URL = `${window.location.origin}/api`;

// Authentification Routes
routes.auth = {
  login: `${URL}/login`,
  register: `${URL}/register`,
  refreshToken: `${URL}/token/refresh`,
};

// User Routes
routes.user = {
  me: `${URL}/user`,
  get: `${URL}/users`,
};

// News Routes
routes.news = {
  get: `${URL}/news`,
};

export default routes;
