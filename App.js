/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { Text, View, Alert, TouchableOpacity, Button } from 'react-native';
import MapView from 'react-native-maps';

export default class App extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    componentWillUnmount() {
    }

    onPress = () => {

    }

    render() {
        return (
                <View style={{height: 200, width: 200}}>
                    <MapView style={{height: 200, width: 200}} />
                </View>
              );

    }

}
