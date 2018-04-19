import React from 'react';
import { Component, TouchableHighlight,Navigator, StyleSheet, Text, View, ImageBackground, TextInput, TouchableOpacity, AsyncStorage, Alert} from 'react-native';



const ACCESS_TOKEN = 'access_token';

export default class App extends React.Component {

render() {
    return (
      <View style={styles.container}>
            <ImageBackground source={require('./app/img/ifrncn.png')} style={styles.backgroundImage}>
                  <View style={styles.content}>
                       <Text style={styles.logo}> ACESSAR </Text>
                             <View style={styles.inputContainer}>
                                  <TextInput underlineColorAndroid='transparent' style={styles.input} 
                                  onChangeText={(username) => this.setState({username})}
                                  value={this.state.username}>
                                  </TextInput>

                                  <TextInput secureTextEntry={true} underlineColorAndroid='transparent'  
                                  placeholder='password' 
                                  onChangeText={(password) => this.setState({password})}
                                  value={this.state.password}
                                  style={styles.input}>
                                  </TextInput>
                             </View>
                              <TouchableOpacity onPress={this.login.bind(this)} style={styles.buttonContainer}>
                                  <Text style={styles.buttonText}> LOGIN </Text>
                              </TouchableOpacity>
                  </View>
            </ImageBackground>
      </View>
    );
  }

   constructor(props){
          super(props);
          this.state = {username: "", password: "", error: ""};

        }

  componentDidMount() {
    this.getToken();
  }

  navigate(routeName){
    this.props.navigator.push({
      name: routeName
    })
   }

    verifyToken(token) {

   var token = token

    try {
     response = fetch('https://suap.ifrn.edu.br/api/v2/autenticacao/token/verify/'+token);
      
     res = response.text();

      if (response.token) {

      //Token confirmado significa que o usuário está logado, então o redirecionamos para home
      
        var token = response.token;
        console.log(token);
      
       // this.navigate('home');
      
      } else {
          // error
         error = res;
         throw error;
      }
    } catch(error) {
        console.log("error response: " + error);
    }
  }

      storeToken(responseData){
    AsyncStorage.setItem(ACCESS_TOKEN, responseData, (err)=> {
      if(err){
        console.log("Erros Existentes");
        throw err;
      }
      console.log("Logou com successo");
    
    }).catch((err)=> {
        console.log("O error é: " + err);
    });
  }

  getToken(){
      try {
         var token = AsyncStorage.getItem(ACCESS_TOKEN);
           if(!token) {
                        console.log("Token inexistente");
                        } else {
                  this.verifyToken(token)
              }

                  console.log("Ver token" + token);
    
    } catch(error) {  

    console.log("Erro");
  }

}

  removeToken(){
    try {
      AsyncStorage.removeItem(ACCESS_TOKEN);
      this.getToken();
    }catch(error) {
      console.log("erro");
    }
  }

  login = () => {
    try {
   // alert(this.state.username);
  fetch('https://suap.ifrn.edu.br/api/v2/autenticacao/token/', {
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
  },
            body: JSON.stringify({
              username: this.state.username,
              password: this.state.password
  })
})
    .then((response) => response.json())
    .then((response) => {
      //let res = await response.Text();
      if(response.token) {
        //sucesso
        var token = response.token;
        console.log(token);
        this.setState({error: ""});
        // Em caso de sucesso, vamos armazenar o access_token no AsyncStorage
        alert("token " + token);
        this.storeToken(token);
        //ERA PRA REDIRECIONAR PARA PASTA HOME - VER COM GUSTAVO
       // this.redirect('home');  
      } else {
        //caso de erro
        alert("Não foi possível autenticar!");
      }
    });
 
    } catch (error) {
      this.removeToken();
      this.setState({error: error});
      console.log("error " + error);
    }
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
   backgroundImage: {
    flex: 1,
    alignSelf: 'stretch',
    width: null,
    justifyContent: 'center',
  },
   content: {
    alignItems: 'center',
  },
   logo: {
    color: 'white',
    fontSize: 40,
    fontStyle: 'italic',
    fontWeight: 'bold',
    textShadowColor: '#252525',
    textShadowOffset: {width: 2, height: 2},
    textShadowRadius: 15,
    marginBottom: 20,
  },
   inputContainer: {
    margin: 20,
    marginBottom: 0,
    padding: 20,
    paddingBottom: 10,
    alignSelf: 'stretch',
    borderWidth: 1,
    borderColor: '#fff',
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  input: {
    textAlign: 'center',
    fontSize: 16,
    height: 40,
    padding: 10,
    marginBottom: 10,
    backgroundColor: 'rgba(255,255,255,0.6)',

  },
   buttonContainer: {
    alignSelf: 'stretch',
    margin: 20,
    padding: 20,
    backgroundColor: 'blue',
    borderWidth: 1,
    borderColor: '#fff',
    backgroundColor: 'rgba(255,255,255,0.6)',
  },
  buttonText: {
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
  },

});