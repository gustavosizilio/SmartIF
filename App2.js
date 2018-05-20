/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { StyleSheet, Text, View, ImageBackground, TextInput, Button, TouchableOpacity, AsyncStorage, Alert, Dimensions } from 'react-native';
import { StackNavigator, TabNavigator, DrawerNavigator } from 'react-navigation';
import Mapa from './mapa/AppMapa';
import Home from './login/AppHome';
import Logout from './login/AppLogout';
import App from './App';

const MenuDrawer = DrawerNavigator(
    {
        Home: { screen: Home },
        Mapa: { screen: Mapa },
        Logout: { screen: Logout },
    }
);

const Menu = StackNavigator(
    {
        DrawerStack: { screen: MenuDrawer },
    }, 
    {
        headerMode: 'float',
        navigationOptions: ({navigation}) => ({
            title: 'SmartIF',
            headerLeft: <Text onPress={() => navigation.navigate('DrawerOpen')}>Menu</Text>
        })
    }
);

class App2 extends Component {
        
    constructor(props) {
        super(props);
    }
    
    render() {
        return <Menu />;
    }
   
}

export default App2;