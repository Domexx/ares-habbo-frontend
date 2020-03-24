import reqwest from 'reqwest';
import routes from '../helpers/apiRoutes';

/**
 * Get Users Data
 * @param {*} id optional - The Id to Select if none given, it returns self
 */
const getUser = id => {
  // Defaults to the ME Route
  let getRoute = routes.user.me;

  if (id) {
    getRoute = `${routes.users.get}/${id}`;
  }

  return new Promise((resolve, reject) => {
    reqwest({
      method: 'GET',
      url: getRoute,
      type: 'json',
    })
      .then(result => {
        console.log(result);

        resolve();
      })
      .fail(reject);
  });
};

export default getUser;
