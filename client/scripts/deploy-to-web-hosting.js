// Use CommonJS Syntax in Node.js script.
const firebase_tools = require('firebase-tools');
const fs = require('fs');

(async () => {
  try {
    var env;

    var args = process.argv.slice(2);
    if      (args[0] === '--prod') { env = 'PROD'; }
    else if (args[0] === '--staging') { env = 'STAGING'; }
    else if (args[0] === '--dev') { env = 'DEV'; }
    else {
      throw Error(
        'Please specify which env you are deploying for via --dev or' +
        ' --staging or --prod'
      );
    }

    var clientConfig = require(`../config/${env}/client/google-services.json`);

    var projectId = clientConfig.projectId;
    firebaseToken = fs.readFileSync(
      `config/${env}/devsecops/webhosting-token.txt`, 'utf8'
    );
    process.env.FIREBASE_TOKEN = firebaseToken;

    await firebase_tools.logout();
    await firebase_tools.deploy({
      project: projectId,
      token: firebaseToken,
      only: 'hosting',
      debug: true,
    });

    console.log('Successfully deployed to Web Hosting');
  } catch (err) {
    console.error(err);
  }
})();