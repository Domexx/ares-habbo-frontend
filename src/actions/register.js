import reqwest from 'reqwest';
import sha512 from 'sha512';
import routes from '../helpers/apiRoutes';

/**
 * Register functionality
 * - Registers the User if Username and Mail are avaliable
 * @param {string} mail The mail for the user
 * @param {string} username The Username for the user
 * @param {string} password The Password for the user
 * @param {string} password_confirmation The Password repeated
 * @returns {Promise} Resolves when successful, rejects on error
 */
const register = (mail, username, password, password_confirmation) => {
  return new Promise((resolve, reject) => {
    if (!mail) {
      reject();
    }

    if (!username) {
      reject();
    }

    if (!password) {
      reject();
    }

    if (!password_confirmation) {
      reject();
    }

    if (password !== password_confirmation) {
      reject();
    }

    password = sha512(password).toString('hex');
    password_confirmation = sha512(password_confirmation).toString('hex');

    reqwest({
      method: 'POST',
      url: routes.auth.register,
      type: 'json',
      data: {
        mail: mail,
        username: username,
        password: password,
        password_confirmation: password_confirmation,
      },
    })
      .then(result => {
        console.log(result);

        resolve();
      })
      .fail(reject);
  });
};

export default register;
