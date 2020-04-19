import React from 'react';
import 'react-native-gesture-handler';
import { Provider } from 'react-redux';

import './config/ReactotronConfig';

import App from './App';

import { store } from './store';

export default function Index() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}
