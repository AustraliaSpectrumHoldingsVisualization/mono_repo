import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './app';

import * as config from './google-services';
import { FirebaseOptions, initializeApp } from 'firebase/app';

const firebaseApp = initializeApp(config as FirebaseOptions);
console.log(firebaseApp);

ReactDOM.render(
  <App
    userName='liam'
    lang='awd'
  />,
  document.getElementById('root'),
);
