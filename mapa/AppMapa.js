/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import React, { Component } from 'react';
import { StyleSheet, Text, View, ImageBackground, TextInput, Button, TouchableOpacity, AsyncStorage, Alert, Dimensions } from 'react-native';
import {
  StackNavigator,
  DrawerNavigator,
  SwitchNavigator,
  DrawerActions,
} from 'react-navigation';
import MapView, { MAP_TYPES, Polygon, ProviderPropType } from 'react-native-maps';

const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = -6.252939;
const LONGITUDE = -36.534274;
const LATITUDE_DELTA = 0.0050;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const USERNAME = 'username';

class AppMapa extends Component {

    constructor(props) {
        super(props);
        try {
            this.state = {
                matricula: "AsyncStorage.getItem(USERNAME, (error) => {})",
                professoresString: "",
                professoresJson: {},
                professorString: "",
                professorJson: {},
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
      } catch (error) {
          
      }
    }

  consultarPosicao() {
        fetch("https://smartif-96d6d.firebaseio.com/professor.json",
        {
            method: 'GET',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            }
        })
        .then((response) => response.json())
        .then((responseJson) => {
            this.setState({
                professoresString: JSON.stringify(responseJson),
                professoresJson: JSON.parse(JSON.stringify(responseJson)),
            });
        })
        .catch((error) => {
            console.error(error);
        });
    }
    
    
    consultarPosicaoMatricula(matricula) {
        fetch("https://smartif-96d6d.firebaseio.com/professor/" + matricula + ".json",
        {
            method: 'GET',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            }
        })
        .then((response) => response.json())
        .then((responseJson) => {
            this.setState({
                professorString: JSON.stringify(responseJson),
                professorJson: JSON.parse(JSON.stringify(responseJson)),
            });
        })
        .catch((error) => {
            console.error(error);
        });
    }

  enviarPosicao(matricula, latitude, longitude) {
        fetch("https://smartif-96d6d.firebaseio.com/professor/"+matricula+".json",
        {
            method: 'PUT',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({latitude: latitude, longitude: longitude, matricula: matricula})
        });
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
    
    conferirirPosicaoAlunoString(latitudeAl, longitudeAl) {
        if (this.conferirirPosicaoAluno(latitudeAl, longitudeAl)) {
          return "Está no IFRN de Currais Novos";
        } else {
          return "Não está no IFRN de Currais Novos";
        }
    }

  componentDidMount() {
        this.watchId = navigator.geolocation.watchPosition(
                (position) => {
                    let estaNoIFRN = this.conferirirPosicaoAluno(position.coords.latitude, position.coords.longitude);
                    this.setState({
                        marca: this.gerarMarker(),
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
                    this.enviarPosicao("celular1", this.state.latitudeAl, this.state.longitudeAl);
                    //this.enviarPosicao("celular2", this.state.latitudeAl+0.001, this.state.longitudeAl);
                    this.consultarPosicao();
                    this.consultarPosicaoMatricula("12345");
                },
                (error) => this.setState({error: error.message, latitudeAl: 0.0, longitudeAl: 0.0}),
                {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000, distanceFilter: 10},
        );
    }

    componentWillUnmount() {
        navigator.geolocation.clearWatch(this.watchId);
    }

    onRegionChange(region) {
      this.setState({ region });
    }
    
    gerarPontos(position) {
	return (<MapView.Marker coordinate={{latitude: position.latitude, longitude: position.longitude}} />);
    }
    
    gerarMarker() {
	professoresIds = Object.keys(this.state.professoresJson);
        var result = [];
	for (i = 0; i < professoresIds.length; i++) {
	    //this.gerarPontos(this.state.professoresJson[professoresIds[i]]);
            //Alert.alert("oi:" + professoresIds[i]);
	}
    }
    
    render() {
        return (
                <View>
                    <Text>
                        Firebase (Conexões): {this.state.professoresString}
                    </Text>
                    <MapView
                      provider={this.props.provider}
                      style={styles.map}
                      region={this.state.region}
                    >
                        {Object.keys(this.state.professoresJson).map((key) => (
                                <MapView.Marker 
                                    coordinate={{latitude: this.state.professoresJson[key].latitude, longitude: this.state.professoresJson[key].longitude}} 
                                    title={JSON.stringify(key)} 
                                    description={JSON.stringify(this.conferirirPosicaoAlunoString(this.state.professoresJson[key].latitude, this.state.professoresJson[key].longitude))}
                                />
                        ))}
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


