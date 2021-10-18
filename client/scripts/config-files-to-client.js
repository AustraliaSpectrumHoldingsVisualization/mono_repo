// Use CommonJS Syntax in Node.js script.
const fs = require('fs');

function writeFirebaseToClient(env) {
  var firebaseConfig = require(
    `../config/${env}/client/google-services.json`
  );

  var newLines = [];

  newLines.push('export default {');
  newLines.push(`  apiKey: "${firebaseConfig.apiKey}",`);
  newLines.push(`  authDomain: "${firebaseConfig.authDomain}",`);
  newLines.push(`  databaseURL: "${firebaseConfig.databaseURL}",`);
  newLines.push(`  projectId: "${firebaseConfig.projectId}",`);
  newLines.push(`  storageBucket: "${firebaseConfig.storageBucket}",`);
  newLines.push(`  messagingSenderId: "${firebaseConfig.messagingSenderId}",`);
  newLines.push(`  appId: "${firebaseConfig.appId}",`);
  newLines.push(`  measurementId: "${firebaseConfig.measurementId}"`);
  newLines.push('};');

  var newGoogleServicesJs = '';
  for (const line of newLines) {
    newGoogleServicesJs = newGoogleServicesJs + line + '\n';
  }

  fs.writeFileSync('src/google-services.js', newGoogleServicesJs, 'utf8');
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

    // Firebase client config
    writeFirebaseToClient(env);

    // Web, SSL and DNS are handled via Firebase Hosting
  } catch (err) {
    console.error(err);
  }
})();