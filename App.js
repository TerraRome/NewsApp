import React from 'react'
import Routes from './src/routing/routes'
import { NativeBaseProvider } from "native-base";

import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from './src/store/store'

import FlashMessage from 'react-native-flash-message'

import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignor

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <NativeBaseProvider>
          <Routes />
          <FlashMessage position="top" />
        </NativeBaseProvider>
      </PersistGate>
    </Provider>
  )
}
