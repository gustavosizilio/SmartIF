
import React, {
  StyleSheet,
  TextInput,
  AsyncStorage,
  Text,
  View
} from 'react-native';

const ACCESS_TOKEN = 'access_token';

export default class Home extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      isLoggenIn: "",
      showProgress: false,
      token: "",
    }
  }
  
  componentDidMount() {
    this.getToken();
  }
  
  getToken() {
    try {
      token = AsyncStorage.getItem(ACCESS_TOKEN);
      if(!token) {
          this.redirect('app');
      } else {
          this.setState({token: token})
      }
    } catch(error) {
        console.log("....");
        this.redirect('app');
    }
  }
  
  /*
  redirect(routeName){
    this.props.navigator.push({
      name: routeName,
      passProps: {
        token: this.state.token
      }
    });
  }
 */
  render() {
    //We check to se if there is a flash message. It will be passed in user update.
    flashMessage;
    if (this.props.flash) {
       flashMessage = <Text style={styles.flash}>{this.props.flash}</Text>
    } else {
       flashMessage = null
    }
    return(
      <View style={styles.container}>
        {flashMessage}
        <Text style={styles.title}> Welcome User </Text>
        <Text style={styles.text}> Your new token is {this.state.token} </Text>

       </View>
    );
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
  flash: {
    height: 40,
    backgroundColor: '#00ff00',
    padding: 10,
    alignSelf: 'center',
  },
  loader: {
    marginTop: 20
  }
});
