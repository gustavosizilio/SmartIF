import React from 'react';
import { Component, StyleSheet, Text, View, ImageBackground, TextInput, TouchableOpacity, AsyncStorage, Alert} from 'react-native';
import { StackNavigator, TabNavigator, DrawerNavigator } from 'react-navigation';

const ACCESS_TOKEN = 'access_token';

//var STORAGE_KEY = ACCESS_TOKEN;

export default class Home extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      accessToken: "",

    }

    this.getTurmas();
  }

   getToken(){
      try {
         accessToken = AsyncStorage.getItem(ACCESS_TOKEN);
           if(!accessToken) {
                        this.props.navigation.navigate('Login');
                        } else {
                  this.setState({accessToken: accessToken})
                 // this.verifyToken(accessToken)
              }

                 // console.log("Ver token" + accessToken);
    
    } catch(error) {  

    console.log("Erro");
  }

}

 render() {

    return(
      <View style={styles.container}>
        <Text style={styles.title}> Bem Vindo </Text>

         
        <TouchableOpacity onPress={this.onLogout.bind(this)} style={styles.button}>
          <Text style={styles.buttonText}>
            Logout
          </Text>
        </TouchableOpacity>
       </View>
    );
  }

  deleteToken() {
    try {
        AsyncStorage.removeItem(ACCESS_TOKEN);
        console.log("Token removido");
        this.props.navigation.navigate('Login');
    } catch(error) {
        console.log("Erros...");
    }
  }

  onLogout(){
    
     this.deleteToken();
  
    }
  
  //Se o token for verificado, redirecionaremos o usuário para O HOME
  verifyToken(token) {

   var accessToken = token

    try {
     response = fetch('https://suap.ifrn.edu.br/api/v2/autenticacao/token/verify/'+accessToken);
        if (response.token) {
      //Token confirmado significa que o usuário está logado, então o redirecionamos para home
        var verToken = response.token;
        console.log(verToken);
        //accessToken: this.state.accessToken
        this.props.navigation.navigate('Login');
      
      } else {
          // error
         error = res;
         throw error;
      }
    } catch(error) {
        console.log("error response: " + error);
    }
  }

  getTurmas() {
    //var token = this.getToken();
   AsyncStorage.getItem(ACCESS_TOKEN).then((token) => {

      console.log("XXXXXX"+JSON.stringify(token));
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
        alert(JSON.stringify(response));
        console.log(JSON.stringify(response));  
      });

    });
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