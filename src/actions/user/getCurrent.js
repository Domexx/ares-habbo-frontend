import reqwest from 'reqwest';
import routes from '../helpers/apiRoutes';

/**
 * Get current logged in Users Data
 */
const getCurrent = () => {
  return new Promise((resolve, reject) => {
    reqwest({
      method: 'GET',
      url: routes.users.me,
      type: 'json',
    })
      .then(result => {
        console.log(result);

        resolve();
      })
      .fail(reject);
  });
};

export default getCurrent;
