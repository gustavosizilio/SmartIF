/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { Text, View, Alert, TouchableOpacity } from 'react-native';

export default class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            latitudeif: 37.421998333333335,
            longitudeif: -122.08400000000002,
            latitude: null,
            longitude: null,
            error: null,
        };
    }

    componentDidMount() {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                this.setState(
                    {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                        error: null,
                    }
                );
            },
            (error) => this.setState(
                    {
                        error: error.message
                    }),
                    {
                        enableHighAccuracy: true, timeout: 20000, maximumAge: 1000
                    },
        );
    }
    
    
    
    onPress = () => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                this.setState(
                    {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                        error: null,
                    }
                );
            },
            (error) => this.setState(
                    {
                        error: error.message
                    }),
                    {
                        enableHighAccuracy: true, timeout: 20000, maximumAge: 1000
                    },
        );
        if ((this.state.latitude > this.state.latitudeif - 10) && (this.state.latitude < this.state.latitudeif + 10)) {
            if ((this.state.longitude > this.state.longitudeif - 10) && (this.state.longitude < this.state.longitudeif + 10)) {
                Alert.alert('Você está no IFRN de Currais Novos');
            } else {
                Alert.alert('Você não está no IFRN de Currais Novos');
            }
        } else {
            Alert.alert('Você não está no IFRN de Currais Novos');
        }
    }

    render() {
        return (
                <View>
                    <Text>
                    Welcome to React Native!
                    </Text>
                    <Text>
                        Latitude: {this.state.latitude}
                    </Text>
                    <Text>
                        Longitude: {this.state.longitude}
                    </Text>
                    {this.state.error ? <Text>Error: {this.state.error}</Text> : null}
                    <TouchableOpacity
                        onPress={this.onPress}
                    >
                    <Text> Touch Here </Text>
                    </TouchableOpacity>
                </View>
                );

    }

}


