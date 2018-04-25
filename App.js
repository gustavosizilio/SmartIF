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
  Alert,
  StackNavigator
  } from 'react-native';

const App = StackNavigator({
  Home: { screen: ./Mapa/App.js },
});

export default class App extends Component {
        
    constructor(props) {
        super(props);
    }
	
    static navigationOptions = {
    	title: 'Welcome',
    };
       
    render() {
        const { navigate } = this.props.navigation;
        return (
        	<Button
        		title="Go to Jane's profile"
        		onPress={() =>navigate('Home')}
      		/>
    	);
    }
   
}
