import React, { Component } from "react";
import { TouchableOpacity,View,Image,BackHandler } from "react-native";
import { connect } from "react-redux";
import RNExitApp from 'react-native-exit-app';
import BlankPage2 from "../blankPage2";
import Kampret from "../blankPage2";
import DrawBar from "../DrawBar";
import Dashboard from "./Dashboard";
import Cuti from "./Cuti";
import Layanan from "./Layanan";
import Profile from "./Profile";
import Absensi from "./Absensi";
import Notifikasi from "./Notif";
import Informasi from "./Info";
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

class Home extends Component {
	static navigationOptions = {
		header: null
	};
	constructor(props) {
		super(props);
		this.state = {
			showProgress: true,
			hasil:'',
			id:''
		};
	}
	componentWillMount() {
		console.log("ID Login",this.props.navigation.state.params.res.id);
		fetch(Config.apiHome(), {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',

			},
			body: JSON.stringify({"uid":this.props.navigation.state.params.res.id})
		})
		.then((response) => response.json())
		.then((responseJson) => {
			console.log(responseJson);
			var res=responseJson;
			this.setState({showProgress: false,hasil:res,id:this.props.navigation.state.params.res.id}, function() {
			});
		})
		.catch((error) => {
			console.error("ERROT==>",error);
		});
		this.backHandler =BackHandler.addEventListener('hardwareBackPress', this.onExitPress.bind(this));
	}
	componentWillUnmount() {
		this.backHandler.remove();
	}
	onExitPress () {
		RNExitApp.exitApp();
	}
	render() {
	console.log("REST OK==>",this.state.hasil);
	var count=this.state.hasil;
	return (
		<Container style={styles.bgpage}>
			<Header style={styles.head}>
				<Left>
					<Button
						transparent
						onPress={() => DrawerNav.navigate("DrawerOpen")}>
						<Icon active name="menu" />
					</Button>
				</Left>
				<Body>
					<Title>Home</Title>
				</Body>
				<Right />
			</Header>
			<Content>
				<Grid>
					<Row>
						<View style={styles.form_logo}>
							<Image source={require("../../../images/logo.png")} style={{width:100,height:100}}/>
						</View>
					</Row>
					
				</Grid>
				<Grid style={{marginBottom:20}}>
					<Row>
						<View style={styles.release}>
							<Text style={{color:'#000',fontSize:15}}>Release Date 1 Maret 2018</Text>
						</View>
					</Row>
				</Grid>
				<Grid>
					<Col style={{marginRight:5}}>
						<TouchableOpacity style={styles.win_white_m} onPress={() => this.props.navigation.navigate("Informasi", {id:this.state.id})}>
							<Grid style={{flex: 1,  justifyContent: 'center', alignItems: 'center'}}>
								<Col>
									<Icon name='md-information-circle' style={{color:'#105870',fontSize:38}}/>
								</Col>
								<Col><Text style={{color:'#000',fontSize:15}}>Info</Text></Col>
								<Col>
									<View style={{backgroundColor:'#3f51b5',alignSelf: 'flex-end',padding:2,width:30}}>
										<Text style={{color:'white',textAlign:'center'}}>{count.informasi}</Text>
									</View>
								</Col>
							</Grid>
						</TouchableOpacity>
					</Col>
					<Col style={{marginLeft:5}}>
						<TouchableOpacity style={styles.win_white_m} onPress={() => this.props.navigation.navigate("Notifikasi", {id:this.state.id})}>
							<Grid style={{flex: 1,  justifyContent: 'center', alignItems: 'center'}}>
								<Col>
									<Icon name='md-phone-portrait' style={{color:'#105870',fontSize:38}}/>
								</Col>
								<Col><Text style={{color:'#000',fontSize:15}}>Notif</Text></Col>
								<Col>
									<View style={{backgroundColor:'#3f51b5',alignSelf: 'flex-end',padding:2,width:30}}>
										<Text style={{color:'white',textAlign:'center'}}>{count.notifikasi}</Text>
									</View>
								</Col>
							</Grid>
						</TouchableOpacity>
					</Col>
				</Grid>
				<Grid>
					<Col>
						<TouchableOpacity onPress={() => this.props.navigation.navigate("Cuti", {id:this.state.id})}>
							<Card>
								<CardItem>
									<Left>
										<Icon name='ios-calendar-outline' style={{color:'#105870',fontSize:15}}/>
										<Body>
											<Text style={{color:'#105870',fontSize:12}}>Cuti</Text>
										</Body>
									</Left>
								</CardItem>
								<CardItem>
									<Grid>
										<Col>
											<View style={styles.box_green}>
												<View style={styles.centerA}>
													<Text style={{fontSize:15,color:'white'}}>{count.totalCuti}</Text>
													<Text style={{fontSize:15,color:'white'}}>Total</Text>
												</View>
											</View>
										</Col>
										<Col>
											<View style={styles.box_blue}>
												<View style={styles.centerA}>
													<Text style={{fontSize:15,color:'white'}}>{count.cutiTerpakai}</Text>
													<Text style={{fontSize:15,color:'white'}}>Terpakai</Text>
												</View>
											</View>
										</Col>
										<Col>
											<View style={styles.box_red}>
												<View style={styles.centerA}>
													<Text style={{fontSize:15,color:'white'}}>{count.sisaCuti}</Text>
													<Text style={{fontSize:15,color:'white'}}>Sisa</Text>
												</View>
											</View>
										</Col>
									</Grid>
								</CardItem>
							</Card>
						</TouchableOpacity>
					</Col>
				</Grid>
				<Grid>
					<Col>
						<TouchableOpacity onPress={() => this.props.navigation.navigate("Absensi", {id:this.state.id})}>
							<Card>
								<CardItem>
									<Left>
										<Icon name='ios-calendar-outline' style={{color:'#105870',fontSize:15}}/>
										<Body>
											<Text style={{color:'#105870',fontSize:12}}>Kehadiran</Text>
										</Body>
									</Left>
								</CardItem>
								<CardItem>
									<Grid>
										<Col>
											<View style={styles.box_green}>
												<View style={styles.centerA}>
													<Text style={{fontSize:15,color:'white'}}>{count.kehadiran}</Text>
													<Text style={{fontSize:15,color:'white'}}>Hadir</Text>
												</View>
											</View>
										</Col>
										<Col>
											<View style={styles.box_green_a}>
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
													<Text style={{fontSize:15,color:'white'}}>Tidak hadir</Text>
												</View>
											</View>
										</Col>
									</Grid>
								</CardItem>
							</Card>
						</TouchableOpacity>
					</Col>
				</Grid>
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
}
	
function bindAction(dispatch) {
  return {
    setIndex: index => dispatch(setIndex(index)),
    openDrawer: () => dispatch(openDrawer())
  };
}
const mapStateToProps = state => ({
  name: state.user.name,
  list: state.list.list
});
const HomeSwagger = connect(mapStateToProps, bindAction)(Home);
const DrawNav = DrawerNavigator(
  {
    Home: { screen: HomeSwagger },
    Dashboard: { screen: Dashboard },
	Cuti: { screen: Cuti },
	Layanan: { screen: Layanan },
	Profile: { screen: Profile },
	Absensi: { screen: Absensi },
	Notifikasi: { screen: Notifikasi },
	Informasi: { screen: Informasi },
  },
  {
    contentComponent: props => <DrawBar {...props} />
  }
);
const DrawerNav = null;
DrawNav.navigationOptions = ({ navigation }) => {
  DrawerNav = navigation;
  console.log("DRAWNAV",DrawerNav);
  return {
    header: null
  };
  
};
export default DrawNav;