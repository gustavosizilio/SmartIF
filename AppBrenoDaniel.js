import React from 'react';
import { StyleSheet, 
  Text, 
  View, 
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
} from 'react-native';

import Login from './app/Login';
import Profile from './app/Profile';

const Application = StackNavigator({
  Home: { screen: Login },
  Profile: { screen: Profile },
}, {
  navigationOptions: {
    header: false,
  }
});


export default class App extends React.Component {
  render() {
    return (
     <Application />     
    );
  }
}

