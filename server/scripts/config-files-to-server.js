// Use CommonJS Syntax in Node.js script.
const fs = require('fs');

function writeFirebaseToFunctions(env) {
  var firebaseConfig = require(`../config/${env}/client/google-services.json`);
  var packageJson = require('../functions/package.json')

  firebaseConfig.version = packageJson.version;
  
  fs.writeFileSync(
    'functions/src/firebaseConfigGenerated.json',
    JSON.stringify(firebaseConfig, null, 2),
    'utf8',
  );
}


(async () => {
  try {
    var args = process.argv.slice(2);
  
    var env;
  
    if (args[0] === '--prod') {
      if (process.env.CI === undefined) {
        throw Error('This should only be run on CI');
      }
      env = 'prod';
    } else if (args[0] === '--staging') {
      if (process.env.CI === undefined) {
        throw Error('This should only be run on CI');
      }
      env = 'staging';
    } else if (args[0] === '--dev') {
      env = 'dev';
    } else {
      throw Error(
        'Please specify whether creating the dev, staging or prod config via' +
        ' --dev or --staging or --prod'
      );
    }

    writeFirebaseToFunctions(env);
  } catch (err) {
    console.error(err);
  }
})();