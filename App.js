/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { Text, View, Alert, TouchableOpacity, Button } from 'react-native';

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
        this.watchId = navigator.geolocation.watchPosition(
                (position) => {
            this.setState({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                error: null,
            });
        },
                (error) => this.setState({error: error.message}),
                {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000, distanceFilter: 10},
                );
    }

    componentWillUnmount() {
        navigator.geolocation.clearWatch(this.watchId);
    }

    onPress = () => {
        this.watchId = navigator.geolocation.watchPosition(
                (position) => {
            this.setState({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                error: null,
            });
        },
                (error) => this.setState({error: error.message}),
                {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000, distanceFilter: 10},
                );
        if ((this.state.latitude > this.state.latitudeif - 0.03) && (this.state.latitude < this.state.latitudeif + 0.03)) {
            if ((this.state.longitude > this.state.longitudeif - 0.03) && (this.state.longitude < this.state.longitudeif + 0.03)) {
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
                    <Button
                        onPress={this.onPress}
                        title="Verificar se estou no IF"
                        color="#841584"
                        accessibilityLabel="Learn more about this purple button"
                        />
                </View>
                );

    }

}
