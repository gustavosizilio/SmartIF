/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import React, { Component } from 'react';
import { 
    StyleSheet,
    Button,
    Image,
    View,
    Text,
    Navigator,
    TouchableHighlight,
    TouchableOpacity, 
    DrawerLayoutAndroid,
    ScrollView,
    ListView,
    FlatList
} from 'react-native';
import {
  StackNavigator,
} from 'react-navigation';
import Mapa from './mapa/AppMapa';
import Home from './login/AppHome';
import Config from './login/AppConfig'
import Logout from './login/AppLogin';
import Login from './login/AppLogin';
import App from './App';

class App3 extends Component {

    constructor(props) {
        super(props);
        this.openDrawer = this.openDrawer.bind(this);
    }
    
    openDrawer() {
        this.drawer.openDrawer();
    }

    render() {
        var navigationView = (
            <View style={{flex: 1, backgroundColor: '#fff'}}>
              <Button title="Mapa" onPress={() => {this.props.navigation.navigate('Mapa')}} style={{margin: 10, fontSize: 15, textAlign: 'left', backgroundColor: '#fff'}} />
              <Button title="Configuração" style={{margin: 10, fontSize: 15, textAlign: 'left'}} />
              <Button title="Sair" style={{margin: 10, fontSize: 15, textAlign: 'left'}} />
            </View>
          );
        
        return (
            <DrawerLayoutAndroid
                drawerWidth={300}
                ref={(_drawer) => this.drawer = _drawer}
                drawerPosition={DrawerLayoutAndroid.positions.Left}
                renderNavigationView={() => navigationView}>
                <View style={{flex: 1, textAlign: 'right'}}>
                    <TouchableHighlight onPress={this.openDrawer} style={{backgroundColor: '#000000'}}>
                        <Image source={require('./menu-icon.png')} style={{margin: 10, width: 30, height: 30}} />
                    </TouchableHighlight>
                </View>
              </DrawerLayoutAndroid>
        );
    }

}

export default App3;


