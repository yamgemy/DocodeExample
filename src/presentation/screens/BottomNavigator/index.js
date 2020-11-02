import React from 'react';
import { Home, Send, Scan, TopUp, More } from 'screens';
import { Image, SafeAreaView, StatusBar} from 'react-native';
import * as Assets from 'assets';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const BottomNavigator = createMaterialBottomTabNavigator();

const Icon = (name, params) => (
  <Image
    source={name}
    resizeMode="contain"
    tintColor={params.tintColor}
    style={[params.size, {
      tintColor: params.tintColor,
      height: params.size,
      width: params.size }]}
  />
);

const middleIconSize = 45;
const avgIconSize = 22;
const navBarHeight = 60;

const TabbedBottomNavigator = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar translucent backgroundColor={'transparent'} />
      <BottomNavigator.Navigator
        shifting={false}
        labeled
        initialRouteName="Home"
        activeColor="#FD3A6C"
        inactiveColor="#000"
        barStyle={{ backgroundColor: '#FFFFFF', height: navBarHeight }}
      >
        <BottomNavigator.Screen
          name="Home"
          component={Home}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="home" color={color} size={avgIconSize} />
            ),
            tabBarOptions: { activeTintColor: 'blue' },
          }}
        />
        <BottomNavigator.Screen
          name="Send"
          component={Send}
          options={{
            tabBarLabel: 'Send',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="telegram" color={color} size={avgIconSize} />
            ),
            tabBarOptions: { activeTintColor: 'blue' },
          }}
        />
        <BottomNavigator.Screen
          name="Scan"
          component={Scan}
          options={{
            tabBarLabel: '',
            focused: true,
            tabBarIcon: ({ params }) => (
              Icon(Assets.pinkScan, { size: middleIconSize })
            ),
            tabBarOptions: { activeTintColor: 'blue' },
          }}
        />
        <BottomNavigator.Screen
          name="Top Up"
          component={TopUp}
          options={{
            tabBarLabel: 'Top Up',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="piggy-bank" color={color} size={avgIconSize} />
            ),
            tabBarOptions: { activeTintColor: 'blue' },
          }}
        />
        <BottomNavigator.Screen
          name="More"
          component={More}
          options={{
            tabBarLabel: 'More',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="menu" color={color} size={avgIconSize} />
            ),
          }}
        />
      </BottomNavigator.Navigator>
    </SafeAreaView>
  );
};

export default TabbedBottomNavigator;
