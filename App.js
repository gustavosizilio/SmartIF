/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { StyleSheet, Text, View, ImageBackground, TextInput, Button, TouchableOpacity, AsyncStorage, Alert, Dimensions } from 'react-native';
import { StackNavigator, TabNavigator, DrawerNavigator } from 'react-navigation';
import Login from './login/AppLogin';
import App2 from './App2';

const Menu = StackNavigator (
        {
            Login: { screen: Login },
            App2: { screen: App2 },
        }
);

class App extends Component {
        
    constructor(props) {
        super(props);
    }
    
    render() {
        return <Menu />;
    }
   
}

export default App;