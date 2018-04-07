import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import MapView, { MAP_TYPES, Polygon, ProviderPropType } from 'react-native-maps';
import MyLocationMapMarker from './MyLocationMapMarker';

const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = -6.253380;
const LONGITUDE = -36.53454;
const LATITUDE_DELTA = 0.0050;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

class BugMarkerWontUpdate extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
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
      amount: 0,
      enableHack: false,
    };
  }



  render() {
    return (
      <View style={styles.container}>
        <MapView
          provider={this.props.provider}
          style={styles.map}
          mapType={MAP_TYPES.HYBRID}
          initialRegion={this.state.region}
          
        >
          <MyLocationMapMarker
            coordinate={this.state.coordinate}
            heading={this.state.amount}
            enableHack={this.state.enableHack}
          />
        </MapView>
      
        
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  bubble: {
    backgroundColor: 'rgba(255,255,255,0.7)',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20,
  },

  
  });

export default BugMarkerWontUpdate;
