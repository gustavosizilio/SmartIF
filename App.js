/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { StyleSheet,
  View,
  Text,
  StackNavigator,
  Dimensions,
  TouchableOpacity, 
  Button,
  Alert
  } from 'react-native';
  import Mapa from "./mapa/AppMapa.js";

const Navegacao = StackNavigator({
  Mapa: { screen: Mapa },
});

class App extends Component {
        
    constructor(props) {
        super(props);
    }
    
    static navigationOptions = {
        title: 'Welcome',
    };
    
    render() {
        return <Navegacao/>;
    }
   
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  });

export default App;