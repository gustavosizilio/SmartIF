/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { Button, Text } from 'react-native';
import { StackNavigator, TabNavigator, DrawerNavigator } from 'react-navigation';
import Mapa from './mapa/AppMapa';
import Home from './login/AppHome';
import Login from './login/AppLogin';

const MenuLogin = StackNavigator(
    {
        Login: { screen: Login },
        Home: { screen: Home },
        Mapa: { screen: Mapa }
    }
);

class App extends Component {
        
    constructor(props) {
        super(props);
    }
    
    render() {
        return <MenuLogin />;
    }
   
}

export default App;