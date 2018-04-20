/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity, 
  Button,
  Alert
  } from 'react-native';
import MapView, { MAP_TYPES, Polygon, ProviderPropType } from 'react-native-maps';
import MyLocationMapMarker from './MyLocationMapMarker';

const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = -6.261601;
const LONGITUDE = -36.512239;
const LATITUDE_DELTA = 0.0050;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

class App extends Component {
        
    constructor(props) {
        super(props);
        this.state = {
            latitudeAl: null,
            longitudeAl: null,
            erro: null,
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
            latitudeAlc: LATITUDE,
            longitudeAlc: LONGITUDE,
            amount: 0,
            enableHack: false,
          };
    }
    
    componentDidMount() {
        this.watchId = navigator.geolocation.watchPosition(
                (position) => {
            this.setState({
                latitudeAl: position.coords.latitude,
                longitudeAl: position.coords.longitude,
                latitudeAlc: position.coords.latitude, 
                longitudeAlc: position.coords.longitude,
                error: null,
            });
        },
                (error) => this.setState({error: error.message, latitudeAlc: LATITUDE, longitudeAlc: LONGITUDE}),
                {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000, distanceFilter: 10},
                );
    }

    componentWillUnmount() {
        navigator.geolocation.clearWatch(this.watchId);
    }
    
    onPress = () => {
        this.watchId = navigator.geolocation.watchPosition(
                (position) => {
            this.setState(
            {
                latitudeAl: position.coords.latitude,
                longitudeAl: position.coords.longitude,
                latitudeAlc: position.coords.latitude, 
                longitudeAlc: position.coords.longitude,
                error: null,
            });
        },
                (error) => this.setState({error: error.message, coordinateAl: { latitudeAlc: LATITUDE, longitudeAlc: LONGITUDE }}),
                {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000, distanceFilter: 10},
                );
        var la = this.state.latitudeAl;
        var l = this.state.region.latitude;
        var loa = this.state.longitudeAl;
        var lo = this.state.region.longitude;
        if ((la > l - 0.004) && (la < l + 0.004)) {
            if ((loa > lo - 0.004) && (loa < lo + 0.004)) {
                Alert.alert('Você está no IFRN de Currais Novos');
            } else {
                Alert.alert('Você não está no IFRN de Currais Novos');
                Alert.alert(loa + '<' + lo + ' - 0.004' + ' ou ' + loa + '>' + lo + ' + 0.004');
            }
        } else {
            Alert.alert('Você não está no IFRN de Currais Novos');
            Alert.alert(la + '<' + l + ' - 0.004' + ' ou ' + la + '>' + l + ' + 0.004');
        }
    }
    
    getInitialState() {
        return {
          region: {
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          },
        };
      }

    onRegionChange(region) {
      this.setState({ region });
    }
    
    render() {
        return (
                <View style={styles.container}>
                    <Text>
                    Latitude(PB):{this.state.region.latitude}
                    </Text>
                    <Text>
                    Longitude(PB):{this.state.region.longitude}
                    </Text>
                    <Text>
                    Latitude(Aluno):{this.state.latitudeAl}
                    </Text>
                    <Text>
                    Longitude(Aluno):{this.state.longitudeAl}
                    </Text>
                    {this.state.error ? <Text>Error: {this.state.error}</Text> : null}
                    <Button
                        onPress={this.onPress}
                        title="Verificar se estou no IF"
                        color="#841584"
                        accessibilityLabel="Learn more about this purple button"
                        />
                    <MapView
                      provider={this.props.provider}
                      style={styles.map}
                      initialRegion={this.state.region}
                    >
                      <MyLocationMapMarker
                        coordinate={this.state.coordinate}
                        heading={this.state.amount}
                        enableHack={this.state.enableHack}
                      />
                      <MapView.Marker 
                        coordinate={{latitude: this.state.latitudeAlc, longitude: this.state.longitudeAlc}}
                        title={'Aluno'}
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
    height: '70%'
  },
  bubble: {
    backgroundColor: 'rgba(255,255,255,0.7)',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20,
  },

  
  });

export default App;