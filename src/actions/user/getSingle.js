import reqwest from 'reqwest';
import routes from '../helpers/apiRoutes';

/**
 * Get Users Data
 * @param {*} id The Id to Select
 */
const getSingle = id => {
  return new Promise((resolve, reject) => {
    reqwest({
      method: 'GET',
      url: `${routes.users.get}/${id}`,
      type: 'json',
    })
      .then(result => {
        console.log(result);

        resolve();
      })
      .fail(reject);
  });
};

export default getSingle;
