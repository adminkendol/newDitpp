import React, { Component } from "react";
import { TouchableOpacity,View,Image } from "react-native";
import { connect } from "react-redux";
import BlankPage2 from "../blankPage2";
import Kampret from "../blankPage2";
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
import {
    Dialog,
    ProgressDialog,
    ConfirmDialog,
} from 'react-native-simple-dialogs'
import { setIndex } from "../../actions/list";
import { openDrawer } from "../../actions/drawer";
import styles from "./styles";
import Config from "../config/Base";

class Dashboard extends Component {
	static navigationOptions = {
		header: null
	};
	constructor(props) {
		super(props);
		this.state = {
			showProgress: true,
		};
		
	}
	componentWillMount() {
		fetch(Config.apiDash(), {
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
			this.setState({showProgress: false,hasil:res}, function() {
			});
		})
		.catch((error) => {
			console.error("ERROT==>",error);
		});
	}
	render() {
	console.log("REST OK==>",this.state.hasil);
	var count=this.state.hasil;
	if (this.state.showProgress) {
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
				<ProgressDialog
                    visible={this.state.showProgress}
                    title="Loading"
                    message="Please, wait..."
                    animationType="slide"
                    activityIndicatorSize="small"
                    activityIndicatorColor="blue"
                />
			</Content>
        </Container>
      );
    }
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
				<Grid style={styles.margin_bottom,styles.center}>
					<Col>
						<Card>
							<CardItem>
								<Left>
									<Icon name='ios-calendar-outline' style={{color:'#105870',fontSize:15}}/>
									<Body>
										<Text style={{color:'#105870',fontSize:12}}>Total Absensi Hari ini</Text>
									</Body>
								</Left>
							</CardItem>
							<CardItem>
								<Grid>
									<Col>
										<View style={styles.box_green}>
											<View style={styles.centerA}>
												<Text style={{fontSize:15,color:'white'}}>{count.kehadiran}</Text>
												<Text style={{fontSize:15,color:'white'}}>Masuk</Text>
											</View>
										</View>
									</Col>
									<Col>
										<View style={styles.box_blue}>
											<View style={styles.centerA}>
												<Text style={{fontSize:15,color:'white'}}>{count.telat}</Text>
												<Text style={{fontSize:15,color:'white'}}>Telat</Text>
											</View>
										</View>
									</Col>
									<Col>
										<View style={styles.box_red}>
											<View style={styles.centerA}>
												<Text style={{fontSize:15,color:'white'}}>{count.absen}</Text>
												<Text style={{fontSize:15,color:'white'}}>Tidak Masuk</Text>
											</View>
										</View>
									</Col>
								</Grid>
							</CardItem>
						</Card>
					</Col>
				</Grid>
			</Content>
		</Container>
		);
	}
}
export default Dashboard;