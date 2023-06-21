import 'react-native-gesture-handler';
import * as React from 'react';
import { Provider } from 'react-redux';
import { store, persistor } from './src/store/store';
import { PersistGate } from 'redux-persist/integration/react';
import { NativeBaseProvider, Box } from 'native-base';

import Navigator from './src/navigator/Navigator';

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NativeBaseProvider>
          <Navigator />
        </NativeBaseProvider>
      </PersistGate>
    </Provider>
  );
}
