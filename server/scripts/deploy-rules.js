const firebase_tools = require('firebase-tools');
const fs = require('fs');

(async () => {
  try {
    var env;
  
    var args = process.argv.slice(2);
    if (args[0] === '--prod') { env = 'prod'; }
    else if (args[0] === '--staging') { env = 'staging'; }
    else if (args[0] === '--dev') { env = 'dev'; }
    else {
      throw Error(
        'Please specify which env you are deploying for via --dev or --staging '
        + 'or --prod'
      );
    }

    var clientConfig = require(`../config/${env}/client/google-services.json`);

    var projectId = clientConfig.projectId;
    firebaseToken = fs.readFileSync(
      `config/${env}/devsecops/firebase-token.txt`, 'utf8'
    );
    process.env.FIREBASE_TOKEN = firebaseToken;

    await firebase_tools.logout();
    await firebase_tools.deploy({
      project: projectId,
      token: firebaseToken,
      only: 'database',
      debug: true,
    });

    console.log('Successfully deployed Rules');

  } catch (err) {
    console.error(err);
  }
})();