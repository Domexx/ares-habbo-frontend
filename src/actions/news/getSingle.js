import reqwest from 'reqwest';
import routes from '../helpers/apiRoutes';

/**
 * Get News by ID
 * @param {*} id The Id to Select
 */
const getSingle = () => {
  return new Promise((resolve, reject) => {
    if (!id) {
      reject();
    }

    reqwest({
      method: 'GET',
      url: `${routes.news.get}/${id}`,
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
