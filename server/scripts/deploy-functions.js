const firebase_tools = require('firebase-tools');
const fs = require('fs');

function privateKeyStringFromJson(env, microserviceName) {
  var json = require(`../config/${env}/functions/${microserviceName}-key.json`);
  return json.private_key;
}

function publicKeyStringFromPem(env, microserviceName) {
  var pem = fs.readFileSync(`config/${env}/functions/${microserviceName}-cert.pem`, 'utf8'); 
  return pem;
}

(async () => {
  try {
    var env;
    
    var args = process.argv.slice(2);
    if (args[0] === '--prod') { env = 'prod'; }
    else if (args[0] === '--staging') { env = 'staging'; }
    else if (args[0] === '--dev' ) { env = 'dev'; }
    else {
      throw Error(
        'Please specify which env you are deploying for via --dev or --staging'
        + ' or --prod'
      );
    }

    var clientConfig = require(`../config/${env}/client/google-services.json`);
    var projectId = clientConfig.projectId;

    let helloworld_cert;
    let helloworld_key;

    let firebaseToken;

    helloworld_cert = publicKeyStringFromPem(env, 'helloworld');
    helloworld_key =  privateKeyStringFromJson(env, 'helloworld');

    firebaseToken = fs.readFileSync(
      `config/${env}/devsecops/firebase-token.txt`, 'utf8'
    );
    process.env.FIREBASE_TOKEN = firebaseToken;

    // firebase functions:delete myFunction --force

    await deployMicroservice(
      projectId,
      firebaseToken,
      'helloworld',
      helloworld_key,
      [
        // Microservice which calls this microservice
        // { name: 'observe', cert: observe_cert }
        // or /* Only called by Google Cloud Pub Sub */
        // or /* Only called Firebase Auth End Users */
      ]
    );
  } catch (err) {
    console.error(err);
  }
})();

async function deployMicroservice(projectId, token, microserviceName, privateKey, publicKeys) {
  console.log(`Deploying microservice ${microserviceName}`);

  let privateKeysAndCerts = [
    `${microserviceName.toLowerCase()}.key=${privateKey}`,
  ];
  
  for (let i = 0; i < publicKeys.length; i++) {
    privateKeysAndCerts.push(`${publicKeys[i].name.toLowerCase()}.cert=${publicKeys[i].cert}`);
  }
  
  let removeKeysAndCerts = [`${microserviceName.toLowerCase()}.key`];
  for (let i = 0; i < publicKeys.length; i++) {
    removeKeysAndCerts.push(`${publicKeys[i].name.toLowerCase()}.cert`);
  }

  await firebase_tools.logout();
  await firebase_tools.functions.config.set(privateKeysAndCerts, { project: projectId });
  await firebase_tools.deploy({
    project: projectId,
    token: token,
    only: `functions:${microserviceName}`,
    debug: true,
  });
  await firebase_tools.functions.config.unset(`${removeKeysAndCerts}`, { project: projectId });
  console.log(`Successfully deployed ${microserviceName}`);
}