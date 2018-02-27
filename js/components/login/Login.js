import React, { Component } from 'react';
import { Image,View,Alert,ActivityIndicator,BackAndroid } from "react-native";
import { 
	Container, Content, Header,
	Form, Item, Input, Label,
	Body,Card, CardItem,
	Button,Text,H1,H2,H3 
	} from 'native-base';
import { Col, Row, Grid } from "react-native-easy-grid";
import {
    Dialog,
    ProgressDialog,
    ConfirmDialog,
} from 'react-native-simple-dialogs'
import styles from "./style_login";
import Config from "../config/Base";
import { Field, reduxForm } from "redux-form";
class Login extends Component {
	constructor(props){
		super(props);
		this.state = {
			showProgress: false,
			username: '',
			password: '',
			hasilLogin:''
		}
	}
	render() {
		return (
			<Container style={styles.bgpage}>
				<Content>
					<View style={styles.form_logo}>
						<Image source={require("../../../images/logo.png")} style={{width:150,height:150}}/>
					</View>
					<Form style={styles.form_input}>
						<Card>
							<CardItem style={styles.form_card}>
								<Body>
									<Text style={styles.text_title}>Welcome, please login</Text>
									<Item  style={styles.input_text}>
										<Input
										autoCorrect={false} 
										ref={component => this.username = component}
										onChangeText={(text) => this.setState({username: text})}
										value={this.state.username}
										placeholder='Username'/>
									</Item>
									<Item  style={styles.input_text}>
										<Input
										autoCorrect={false} 
										ref={component => this.password = component}
										onChangeText={(text) => this.setState({password: text})}
										value={this.state.password}
										secureTextEntry={true}
										placeholder='Password'/>
									</Item>
									<Text style={{color:'white',marginBottom:10}}>Forgot password</Text>
									<Button medium  
										style={styles.form_button}
										onPress={this.login.bind(this)}>
										<Text>Login</Text>
									</Button>
								</Body>
							</CardItem>
						</Card>
					</Form>
					<ProgressDialog
						visible={this.state.showProgress}
						title="Loading"
						message="Please, wait..."
						animationType="slide"
						activityIndicatorSize="large"
						activityIndicatorColor="blue"
					/>
				</Content>
			</Container>
		);
	}
	login(){
	this.setState({ showProgress: true })
    fetch(Config.apiLogin(), {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',

			},
			body: JSON.stringify({"username":this.state.username,"password":this.state.password})
		})
		.then((response) => response.json())
		.then((responseJson) => {
			console.log(responseJson);
			var res=responseJson;
			this.setState({showProgress: false,hasilLogin:res}, function() {
				if(res.responseStatus=="200"){
					this.setState = {
						username: '',
						password: ''
					};
					this.props.navigation.navigate("Home",{ res });
				}else{
					Alert.alert(
						'Perhatian',
						'Username atau password anda salah !',
							[
								{text: 'OK', onPress: () => console.log('OK Pressed')},
							],
						{ cancelable: false }
					)
				}
			});
		})
		.catch((error) => {
			console.error("ERROTabc==>",error);
		});
    
	}
}

const LoginSwag = reduxForm(
  {
    form: "test"
  }
)(Login);
LoginSwag.navigationOptions = {
  header: null
};
export default LoginSwag;