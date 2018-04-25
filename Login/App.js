import React from 'react';
import { Component } from 'react-native';
import { StackNavigator } from 'react-navigation';
import Login from './login';
import Home from './home';

const RootStack = StackNavigator(
  {
    Login: {
      screen: Login,
    },
    Home: {
      screen: Home,
    },
  },
  {
    initialRouteName: 'Login',
  }
);

export default class App extends React.Component {

  render() {
        return <RootStack />;
  }
}
