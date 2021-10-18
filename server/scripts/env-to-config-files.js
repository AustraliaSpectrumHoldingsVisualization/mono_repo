// Use CommonJS Syntax in Node.js script.
const fs = require('fs');

(async () => {
  try {
    var args = process.argv.slice(2);
  
    var env;
  
    if (args[0] === '--prod') {
      if (process.env.CI === undefined) {
        console.log(
          'This should only be run on CI. The config must already be in files.'
        );
        return;
      }
      env = 'prod';
    } else if (args[0] === '--staging') {
      if (process.env.CI === undefined) {
        console.log(
          'This should only be run on CI. The config must already be in files.'
        );
        return;
      }
      env = 'staging';
    } else if (args[0] === '--dev') {
      env = 'dev';
      console.log(
        'No need to store the dev config in env variables. Store in files.'
      );
      return;
    } else {
      throw Error(
        'Please specify whether creating the dev, staging or prod config files'
        + ' via --dev or --staging or --prod.'
      );
    }

    fs.writeFileSync(
      `config/${env}/functions/helloworld-key.json`,
      Buffer.from(process.env[`MICROSERVICE_HELLOWORLD_KEY_JSON_${env}`], 'base64')
    );
    fs.writeFileSync(
      `config/${env}/functions/helloworld-cert.json`,
      Buffer.from(process.env[`MICROSERVICE_HELLOWORLD_CERT_PFX_${env}`], 'base64')
    );

    fs.writeFileSync(
      `config/${env}/devsecops/firebase-token.txt`,
      Buffer.from(process.env[`FIREBASE_TOKEN_${env}`], 'base64')
    );
    fs.writeFileSync(
      `config/${env}/client/google-services.json`,
      Buffer.from(process.env[`CLIENT_GOOGLE_SERVICES_JSON_${env}`], 'base64')
    );
  } catch (err) {
    console.error(err);
  }
})();