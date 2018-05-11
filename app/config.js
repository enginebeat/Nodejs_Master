/*
* Create and export configuration variables
*
*/

/* Container for all the environments */
var environments = {};

/* Staging (default) environment */

environments.staging = {
    'port' : 3000,
    'envName' : 'staging'
};

/* Production environment */
environments.production = {
    'port' : 5000,
    'envName' : 'production'
};

/* Determine which environment was passed as a command-line argument */
console.log (process.env.Node_ENV);
var currentEnvironment = typeof(process.env.Node_ENV) == 'string' ? process.env.Node_ENV.toLowerCase(): '';

/* check that the current environment is one of the environments above, if not, default to staging */
var environementToExport = typeof(environments[currentEnvironment]) == 'object' ? environments[currentEnvironment] : environments.staging;

/* Export the module */
module.exports = environementToExport;