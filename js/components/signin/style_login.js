
const React = require('react-native');

const { StyleSheet, Dimensions } = React;
const deviceWdith = Dimensions.get('window').width;

export default {
	bgpage: {
		backgroundColor: '#3e626e',
	},
	form_input: {
		padding: 50,
	},
	form_button: {
		width: '100%',
		flex: 1,  justifyContent: 'center', alignItems: 'center'
	},
	input_text:{
		marginBottom:10,
		backgroundColor:'white'
	},
	text_label:{
		textAlign:'center'
	},
	form_card:{
		backgroundColor:'#46545f'
	},
	text_title:{
		color:'white',
		marginBottom:20
	}
};
