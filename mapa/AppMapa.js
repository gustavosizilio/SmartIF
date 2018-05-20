/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { StyleSheet, Text, View, ImageBackground, TextInput, Button, TouchableOpacity, AsyncStorage, Alert, Dimensions } from 'react-native';
import { StackNavigator, TabNavigator, DrawerNavigator } from 'react-navigation';
import MapView, { MAP_TYPES, Polygon, ProviderPropType } from 'react-native-maps';
//import MyLocationMapMarker from './mapa/MyLocationMapMarker';

const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = -6.252939;
const LONGITUDE = -36.534274;
const LATITUDE_DELTA = 0.0050;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

class AppMapa extends Component {
        
    constructor(props) {
        super(props);
        this.state = {
            figura: './ifrnicon.png',
            infoPosicaoAl: null,
            latitudeAl: 0.0,
            longitudeAl: 0.0,
            erro: null,
            amount: 0,
            enableHack: false,
            region: {
              latitude: LATITUDE,
              longitude: LONGITUDE,
              latitudeDelta: LATITUDE_DELTA,
              longitudeDelta: LONGITUDE_DELTA,
            },
            coordinate: {
              latitude: LATITUDE,
              longitude: LONGITUDE,
            },
          };
    }
    
    componentDidMount() {
        this.watchId = navigator.geolocation.watchPosition(
                (position) => {
                    let estaNoIFRN = this.conferirirPosicaoAluno(position.coords.latitude, position.coords.longitude);
                    this.setState({
                        figura: './ifrnicon2.png',
                        region: {
                            latitude: position.coords.latitude,
                            longitude: position.coords.longitude,
                            latitudeDelta: LATITUDE_DELTA,
                            longitudeDelta: LONGITUDE_DELTA,
                        },
                        latitudeAl: position.coords.latitude,
                        longitudeAl: position.coords.longitude,
                        infoPosicaoAl: (estaNoIFRN) ? 'Você está no IFRN de Currais Novos' : 'Você não está no IFRN de Currais Novos',
                        error: null,
                    });
                },
                (error) => this.setState({error: error.message, latitudeAl: 0.0, longitudeAl: 0.0}),
                {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000, distanceFilter: 10},
        );

    }
    
    conferirirPosicaoAluno(latitudeAl, longitudeAl) {
        var la = latitudeAl;
        var l = this.state.coordinate.latitude;
        var loa = longitudeAl;
        var lo = this.state.coordinate.longitude;
        if ((la > l - 0.004) && (la < l + 0.004) && (loa > lo - 0.004) && (loa < lo + 0.004)) {
          return true;
        } else {
          return false;
        }
    }

    componentWillUnmount() {
        navigator.geolocation.clearWatch(this.watchId);
    }
    
    onRegionChange(region) {
      this.setState({ region });
    }
    
    render() {
        return (
                <View>
                    <MapView
                      provider={this.props.provider}
                      style={styles.map}
                      initialRegion={this.state.region}
                    >
                        <MapView.Marker 
                            coordinate={{latitude: this.state.latitudeAl, longitude: this.state.longitudeAl}}
                            title={'Aluno'}
                            description={this.state.infoPosicaoAl}
                        />
                        <MapView.Marker 
                            coordinate={this.state.coordinate}
                            title={'IFRN'}
                            image={require('./ifrnicon.png')}
                        />
                    </MapView>
                </View>
	);
    }
   
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    width: '100%',
    height: '100%'
  },
  bubble: {
    backgroundColor: 'rgba(255,255,255,0.7)',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20,
  },

  
  });

export default AppMapa;