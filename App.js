import React from 'react';
import { StyleSheet } from 'react-native';
import { TabbedBottomNavigator } from 'screens';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import configureStore from './src/MyRedux/Store.js';

const myReduxStore = configureStore();

export default App = () => {
  return (
    <Provider store={myReduxStore}>
      <NavigationContainer>
        <TabbedBottomNavigator />
      </NavigationContainer>
    </Provider>
  );
};
