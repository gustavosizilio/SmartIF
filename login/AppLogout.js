/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import React, { Component } from 'react';
import { StyleSheet, Text, View, ImageBackground, TextInput, Button, TouchableOpacity, AsyncStorage, Alert, Dimensions } from 'react-native';
import { StackNavigator, TabNavigator, DrawerNavigator } from 'react-navigation';

const ACCESS_TOKEN = 'access_token';


class Logout extends Component {

    constructor(props) {
        super(props);
        try {
            AsyncStorage.removeItem(ACCESS_TOKEN);
        } catch(error) {
        }
        this.props.navigation.navigate('App');
    }

    render() {
        return null;
    }

}

export default Logout;
