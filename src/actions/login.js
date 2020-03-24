import reqwest from 'reqwest';
import sha512 from 'sha512';
import routes from '../helpers/apiRoutes';

/**
 * Login functionality
 * @param {string} username The Username to try to login to
 * @param {string} password The Password for the user
 * @returns {Promise} Resolves when successful, rejects on error
 */
const login = (username, password) => {
  return new Promise((resolve, reject) => {
    if (!username) {
      reject();
    }

    if (!password) {
      reject();
    }

    password = sha512(password).toString('hex');

    reqwest({
      method: 'GET',
      url: routes.auth.login,
      type: 'json',
      data: {
        username: username,
        password: password,
      },
    })
      .then(result => {
        console.log(result);

        resolve();
      })
      .fail(reject);
  });
};

export default login;
