import React from 'react';
import {StyleSheet} from 'react-native';
import {TabbedBottomNavigator} from 'screens';
import {View} from 'react-native';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';

class App extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <TabbedBottomNavigator/>
      </NavigationContainer>
    );
  }
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
  },
});

export default App;
