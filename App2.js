/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, ImageBackground, TextInput, Button, TouchableOpacity, TouchableHighlight, AsyncStorage, Alert, Dimensions } from 'react-native';
import {
  StackNavigator,
  DrawerNavigator,
  SwitchNavigator,
  //DrawerActions,
} from 'react-navigation';
import Mapa from './mapa/AppMapa';
import Home from './login/AppHome';
import Config from './login/AppConfig'
import Logout from './login/AppLogout';
import Login from './login/AppLogin';
import App from './App';

const MenuDrawer = DrawerNavigator(
    {
        Mapa: { screen: Mapa },
        Usuários: { screen: Home },
        Configuração: { screen: Config },
        Logout: { screen: Logout},
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
            headerLeft: <TouchableHighlight onPress={() => navigation.toggleDrawer()}><Image source={require('./menu-icon.png')} style={{margin: 10, width: 30, height: 30}} /></TouchableHighlight>
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


