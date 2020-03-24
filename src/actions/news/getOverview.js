import reqwest from 'reqwest';
import routes from '../helpers/apiRoutes';

/**
 * Get all News
 */
const getOverview = () => {
  return new Promise((resolve, reject) => {
    reqwest({
      method: 'GET',
      url: routes.news.get,
      type: 'json',
    })
      .then(result => {
        console.log(result);

        resolve();
      })
      .fail(reject);
  });
};

export default getOverview;
