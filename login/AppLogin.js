import React, { Component } from 'react';
import { StyleSheet, Text, View, ImageBackground, TextInput, Button, TouchableOpacity, AsyncStorage, Alert, Dimensions } from 'react-native';
import { StackNavigator, TabNavigator, DrawerNavigator } from 'react-navigation';

const ACCESS_TOKEN = 'access_token';

export default class Login extends Component {

    constructor(props) {
        super(props);
        try {
            AsyncStorage.removeItem(ACCESS_TOKEN);
        } catch(error) {    
        }
        this.state = {username: "", password: "", error: ""};
    }
    
    login = () => {
        try {
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
                            if (response.token) {
                                var token = response.token;
                                this.setState({error: ""});
                                this.storeToken(token);
                                this.props.navigation.navigate('App2');
                            } else {
                                alert("Não foi possível autenticar!");
                            }
            });
        } catch (error) {
        }
    }
    
    storeToken(responseData) {
                AsyncStorage.setItem(ACCESS_TOKEN, responseData, (err) => {
                    if (err) {
                        throw err;
                    }
                }).catch((err) => {
                });
            }

    render() {
        return (
                <View style={styles.container}>
                    <View style={styles.content}>
                        <Text style={styles.logo}> ACESSAR </Text>
                        <View style={styles.inputContainer}>
                            <TextInput underlineColorAndroid='transparent' style={styles.input} 
                                       onChangeText={(username) => this.setState({username})}
                                       placeholder='login' 
                                       value={this.state.username}>
                            </TextInput>
                
                            <TextInput secureTextEntry={true} underlineColorAndroid='transparent'  
                                       placeholder='password' 
                                       onChangeText={(password) => this.setState({password})}
                                       value={this.state.password}
                                       style={styles.input}>
                            </TextInput>
                            <Button
                            onPress={this.login.bind(this)}
                            title="LOGIN"
                            style={styles.buttonContainer}
                          />
                        </View>
                        
                    </View>
                </View>
                        );
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