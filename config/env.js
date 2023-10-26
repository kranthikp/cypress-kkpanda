module.exports.geturl = function (env) {
  let env = Cypress.env('fpurl');
  return env == "stg" ? (apiBaseUrl = 'https://reqres.in') : baseUrl = Cypress.config("apiBaseUrl");
};
// can be customized based on application for test, nature, protocols, behaviour
