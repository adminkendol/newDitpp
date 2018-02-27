import React, { Component } from "react";
import { TouchableOpacity,View,Image } from "react-native";
import { connect } from "react-redux";
import DrawBar from "../DrawBar";
import { DrawerNavigator, NavigationActions } from "react-navigation";
import {
  Container,
  Header,
  Title,
  Content,
  Text,
  Button,
  Icon,
  Left,Spinner,
  Body,Card, CardItem,
  Right,Badge
} from "native-base";
import { Grid, Row,Col } from "react-native-easy-grid";

import { setIndex } from "../../actions/list";
import { openDrawer } from "../../actions/drawer";
import styles from "./styles";

class Notif extends Component {
	static navigationOptions = {
		header: null
	};
	/*constructor(props) {
		super(props);
		this.state = {
			isLoading: true,
		};
		
	}*/
	/*componentWillMount() {
		fetch("http://ditpitalebar.com/api/v1/employee/count/all/", {
			method: 'GET',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',

			},
			
		})
		.then((response) => response.json())
		.then((responseJson) => {
			console.log(responseJson);
			var res=responseJson;
			this.setState({isLoading: false,hasil:res}, function() {
			});
		})
		.catch((error) => {
			console.error("ERROT==>",error);
		});
	}*/
	render() {
	//console.log("REST OK==>",this.state.hasil);
	//var count=this.state.hasil;
	/*if (this.state.isLoading) {
      return (
        <Container style={styles.bgpage}>
			<Header style={styles.head}>
				<Left>
					<Button transparent onPress={() => this.props.navigation.goBack()}>
						<Icon name="ios-arrow-back" />
					</Button>
				</Left>
				<Body>
					<Title>Dashboard</Title>
				</Body>
				<Right />
			</Header>
			<Content>
				<Grid style={{justifyContent: 'center', alignItems: 'center',backgroundColor:'#cbd4d7',marginTop:'50%'}}>
					<Col style={{width:100}}>
						<View style={{alignSelf: 'flex-end',}}>
							<Spinner color='#29166e' />
						</View>
					</Col>
					<Col>
						<View style={{alignSelf: 'flex-start',}}>
							<Text style={{color:'#29166e',fontSize:20}}>Please wait ... </Text>
						</View>
					</Col>
				</Grid>
			</Content>
        </Container>
      );
    }*/
	return (
		<Container style={styles.bgpage}>
			<Header style={styles.head}>
				<Left>
					<Button transparent onPress={() => this.props.navigation.goBack()}>
						<Icon name="ios-arrow-back" />
					</Button>
				</Left>
				<Body>
					<Title>Notifikasi</Title>
				</Body>
				<Right />
			</Header>
			<Content>
				
			</Content>
		</Container>
		);
	}
}
export default Notif;