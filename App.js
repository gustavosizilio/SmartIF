/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { Button } from 'react-native';
import { TabNavigator  } from 'react-navigation';
import Mapa from './mapa/AppMapa';
import Home from './Home';

const RootStack = TabNavigator (
  {
    Mapa: {
      screen: Mapa,
    },
    Home: {
      screen: Home,
    },
  },
  {
    initialRouteName: 'Home',
  }
);


class App extends Component {
        
    constructor(props) {
        super(props);
    }
    
    render() {
        return <RootStack />;
    }
   
}

export default App;