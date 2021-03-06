// Use CommonJS Syntax in Node.js script.
const fs = require('fs');

(async () => {
  try {
    const args = process.argv.slice(2);
  
    let env;
  
    if (args[0] === '--prod') {
      if (process.env.CI === undefined) {
        console.log(
          'This should only be run on CI. The config must already be in files.'
        );
        return;
      }
      env = 'PROD';
    } else if (args[0] === '--staging') {
      if (process.env.CI === undefined) {
        console.log(
          'This should only be run on CI. The config must already be in files.'
        );
        return;
      }
      env = 'STAGING';
    } else if (args[0] === '--dev') {
      env = 'DEV';
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
      `config/${env.toLowerCase()}/devsecops/webhosting-token.txt`,
      Buffer.from(process.env[`WEB_HOSTING_TOKEN_${env}`], 'base64')
    );
    fs.writeFileSync(
      `config/${env.toLowerCase()}/client/google-services.json`,
      Buffer.from(process.env[`CLIENT_GOOGLE_SERVICES_JSON_${env}`], 'base64')
    );
  } catch (err) {
    console.error(err);
  }
})();