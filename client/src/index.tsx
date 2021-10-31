import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';

import * as config from './google-services';
import { FirebaseOptions, initializeApp } from 'firebase/app';

import exclude from './excludeLocations.json';
import include from './includeLocations.json';
import owners from './owners.json';

initializeApp(config as FirebaseOptions);

const excludeSet = new Set(exclude.exclude);

const includeMap = new Map(
  include.include.map((i): [string, {lat: number, lng: number}] => [
    i.location,
    {
      lat: Number.parseFloat(i.lat),
      lng: Number.parseFloat(i.lng),
    },
  ])
);

const ownersMap = new Map(
  owners.map((i): [string, string] => [
    i.owner,
    i.color,
  ])
);

ReactDOM.render(
  <App
    config={config.default}
    excludeSet={excludeSet}
    includeMap={includeMap}
    ownersMap={ownersMap}
  />,
  document.getElementById('root'),
);
