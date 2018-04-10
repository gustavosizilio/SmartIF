import React from 'react';
import { StyleSheet, 
		 Text, 
		 View, 
		 
		} from 'react-native';

export default class Profile extends React.Component {
  

  render() {
    return (
		
   

			<View style={styles.container}>

			<Text style={styles.header}> PÁGINA A SER ACESSADA </Text>
                       
            </View>

    );
  }
}


	const styles = StyleSheet.create({
		container: {
			flex: 1;
			alignItems: 'center',
			justifyContent: 'center',
			backgroundColor: '#7FFFD4'
		},
		Text: {
			color: '#fff'
		}
	});
