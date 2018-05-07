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

const Menu = DrawerNavigator(
    {
        Login: { screen: Login },
        Home: { screen: Home },
        Mapa: { screen: Mapa }
    }
);

const MenuButton = StackNavigator(
    {
        DrawerStack: { screen: Menu }
    }, 
    {
        headerMode: 'float',
        navigationOptions: ({navigation}) => ({
            title: 'SmartIF',
            headerLeft: <Text onPress={() => navigation.navigate('DrawerOpen')}>Menu</Text>
        })
    }
);

class App extends Component {
        
    constructor(props) {
        super(props);
    }
    
    render() {
        return <MenuButton />;
    }
   
}

export default App;
