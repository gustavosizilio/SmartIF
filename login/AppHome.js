import React, { Component } from 'react';
import { StyleSheet, Text, View, ImageBackground, TextInput, Button, TouchableOpacity, AsyncStorage, Alert, Dimensions } from 'react-native';
import { StackNavigator, TabNavigator, DrawerNavigator } from 'react-navigation';

const ACCESS_TOKEN = 'access_token';

export default class Home extends Component {
  
constructor(props){
    super(props);
    this.state = {
      accessToken: "",
      turma: "",
    }
    this.getTurmas();
}
  
getToken(){
    try {
        accessToken = AsyncStorage.getItem(ACCESS_TOKEN);
            if(!accessToken) {
            } else {
                this.setState({accessToken: accessToken})
            }
    } catch(error) {  
    }
}

getTurmas() {
    //var token = this.getToken();
    AsyncStorage.getItem(ACCESS_TOKEN).then((token) => {
    fetch('https://suap.ifrn.edu.br/api/v2/minhas-informacoes/turmas-virtuais/2018/1/', {
          method: 'GET',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': 'JWT '+token,
              //'Authorization': 'JWT' +token,
          }
      })
      .then((response) => response.json())
      .then((response) => {
           this.setState(
           {
               turma: JSON.stringify(response)
           }
           );
      });

    });
}

  
render() {
    return(
        <View style={styles.container}>
            <Text style={styles.title}> Bem Vindo: </Text>
            <Text style={styles.title}> {this.state.turma} </Text>
        </View>
    );
}

onLogout() {
    try {
        AsyncStorage.removeItem(ACCESS_TOKEN);
        this.props.navigation.navigate('App');
    } catch(error) {    
    }
}
  
verifyToken(token) {
    var accessToken = token
    try {
        response = fetch('https://suap.ifrn.edu.br/api/v2/autenticacao/token/verify/'+accessToken);
        if (response.token) {
            var verToken = response.token;
            //this.props.navigation.navigate('Login');
        } else {
            error = res;
            throw error;
        }
    } catch(error) {    
    }
}

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    padding: 10,
  },
  title: {
    fontSize: 25,
    marginTop: 15,
    marginBottom: 15
  },
  text: {
    marginBottom: 30
  },
  button: {
    height: 50,
    backgroundColor: 'red',
    alignSelf: 'stretch',
    marginTop: 10,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 22,
    color: '#FFF',
    alignSelf: 'center'
  },
});