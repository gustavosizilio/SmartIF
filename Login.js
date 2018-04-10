import React from 'react';
import { StyleSheet, 
		 Text, 
		 View, 
		 TextInput, 
		 KeyboardAvoidingView, 
		 TouchableOpacity, 
		 AsyncStorage,
		} from 'react-native';

export default class Login extends React.Component {
  
	constructor(props){
		super(props);
		this.state {
			username: '',
			password: '',
		}
	}

	componentDidMount(){
		this._loadInitialState().done();
	}

	_loadInitialState = async () => {
		var value = await AsyncStorage.getItem('user');
		if(value !== null) {
	this.props.navigation.navigate('Profile');
		}
	}

  render() {
    return (
		
    <KeyboardAvoidingView behavior='padding' style={styles.wrapper}>

			<View style={styles.container}>

			<Text style={styles.header}> | Login | </Text>
                        
            <TextInput style={styles.textInput} placeholder='Username'
            onChangeText={ (username) => this.setState({username}) } 
                underlineColorAndroid='transparent' />
                
            <TextInput style={styles.textInput} placeholder='Password'
            onChangeText={ (password) => this.setState({password}) } 
                underlineColorAndroid='transparent' />
                
            <TouchableOpacity
                style={styles.btn}
                onPress={this.login}>
                <Text> log In</Text>
            </TouchableOpacity>

            </View>
    </KeyboardAvoidingView>
    );
  }
  
  login = () => {
 
 		fetch('https://suap.ifrn.edu.br/api/v2/autenticacao/token/', {
  		method: 'POST',
  		headers: {
    			'Accept': 'application/json',
    			'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    username: this.state.username,
    password: this.state.password,
  })
})
 		.then((response) => response.json())
 		.then((res => {
 			if (res.sucess === true) {
 				AsyncStorage.setItem('user', res.user);
 				this.props.navigation.navigate('Profile');
 			} else {
 				alert(res.message);
 			}
 		})
 		.done();

		}
}


	const styles = StyleSheet.create({
		wrapper: {
			flex: 1,
		}
	container: {
			flex: 1;
			alignItems: 'center',
			justifyContent: 'center',
			backgroundColor: '#7FFFD4',
			paddingLeft: 40,
			paddingRight: 40,
	},
	header: { 
		fontSize: 24,
		marginBottom: 60,
		color: '#fff',
		fontWeight: 'bold',
	},
	textInput: {
		alignSelf: 'stretch',
		padding: 16,
		marginBottom: 20,
		backgroundColor: '#fff',
	},
	btn: {
		alignSelf: 'stretch',
		backgroundColor: '#EEDD82',
		padding: 20,
		alignItems: 'center'
	}	

	});
