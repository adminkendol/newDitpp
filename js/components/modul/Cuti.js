import React, { Component } from "react";
import { TouchableOpacity,View,Image,BackHandler } from "react-native";
import { connect } from "react-redux";
import DrawBar from "../DrawBar";
import { DrawerNavigator, NavigationActions } from "react-navigation";
import {
  Container,
  Header,
  Footer,
  Title,
  Content,
  Text,
  Button,
  Icon,
  Left,Fab,Spinner,
  Body,Card, CardItem,
  Right,Badge,List,ListItem
} from "native-base";
import {
    Dialog,
    ProgressDialog,
    ConfirmDialog,
} from 'react-native-simple-dialogs';
import { Grid, Row,Col } from "react-native-easy-grid";
import LinearGradient from 'react-native-linear-gradient';
import RNExitApp from 'react-native-exit-app';
import { setIndex } from "../../actions/list";
import { openDrawer } from "../../actions/drawer";
import Config from "../config/Base";
import styles from "./styles";

class Cuti extends Component {
	static navigationOptions = {
		header: null
	};
	constructor(props) {
		super(props);
		this.state = {
			showProgress: true,
			hasil:'',
			count:'',
			emId:this.props.navigation.state.params.id
		};
		
	}
	componentWillMount() {
		fetch(Config.apiCutiHistory(), {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',

			},
			body: JSON.stringify({"uid":this.props.navigation.state.params.id})
		})
		.then((response) => response.json())
		.then((responseJson) => {
			console.log(responseJson);
			//var res=responseJson.data;
			var itemsA =responseJson.data;
			var date_start;
			var date_end;
			var keterangan;
			var status;
			var days;
			var col;
			var arr = [];
			for(var i=0;i<itemsA.length;i++){
				date_start = itemsA[i].date_start;
				date_end = itemsA[i].date_end;
				keterangan = itemsA[i].keterangan;
				days = itemsA[i].days;
				if(itemsA[i].status=="0"){
					col ="orange";
					status="Pending";
				}else if(itemsA[i].status=="1"){
					col ="green";
					status="Approve";
				}
				arr.push({'keterangan':keterangan,'col':col,'date_start':date_start,'date_end':date_end,'days':days,'status':status});
			}
			
			this.setState({hasil:arr}, function() {
				fetch(Config.apiCutiCount(), {
					method: 'POST',
					headers: {
						'Accept': 'application/json',
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({"uid":this.props.navigation.state.params.id})
				})
				.then((response) => response.json())
				.then((responseJson) => {
					console.log(responseJson);
					var resA=responseJson;
					this.setState({showProgress: false,count:resA}, function() {
					});
				})
				.catch((error) => {
					console.error("ERROT1==>",error);
				});
			});
		})
		.catch((error) => {
			console.error("ERROT2==>",error);
		});
	}
	render() {
	console.log("REST OK==>",this.state.hasil);
	var items = this.state.hasil;
	var counts = this.state.count;
	//var items =[{"id":"2","cuti_id":"6","title":"annual leave","keterangan":"Ciamis jawa barat","cuti_list_id":"1","date_start":"2018-01-15","date_end":"2018-01-19","days":"5","status":"0","date_created":"2018-01-12 10:54:25"}]
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
					<Title>Cuti</Title>
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
					<Title>Cuti</Title>
				</Body>
				<Right />
			</Header>
			<Content>
				<Grid style={styles.margin_bottom}>
					<Col style={{padding:20}}>
						<Card>
							<CardItem style={styles.head}>
								<Body>
									<View style={{flex: 1,  justifyContent: 'center', alignItems: 'center',backgroundColor:'#fff',marginBottom:20,padding:20}}>
									<Grid style={{justifyContent: 'center', alignItems: 'center',backgroundColor:'#fff',marginBottom:10}}>
										<Col><Text style={{fontSize:15}}>Jatah cuti</Text></Col>
										<Col>
											<View style={{backgroundColor:'#3f51b5',alignSelf: 'flex-end',padding:2,width:30}}>
												<Text style={{color:'white',textAlign:'center'}}>{counts.totalCuti}</Text>
											</View>
										</Col>
									</Grid>
									<Grid style={{justifyContent: 'center', alignItems: 'center',backgroundColor:'#fff'}}>
										<Col><Text style={{fontSize:15}}>Cuti diambil</Text></Col>
										<Col>
											<View style={{backgroundColor:'#3f51b5',alignSelf: 'flex-end',padding:2,width:30}}>
												<Text style={{color:'white',textAlign:'center'}}>{counts.cutiTerpakai}</Text>
											</View>
										</Col>
									</Grid>
									</View>
									<View style={{flex: 1,  justifyContent: 'center', alignItems: 'center',padding:20}}>
										<Grid style={{justifyContent: 'center', alignItems: 'center'}}>
											<Col><Text style={{fontSize:15,color:'white'}}>Sisa cuti</Text></Col>
											<Col>
												<View style={{backgroundColor:'#3f51b5',alignSelf: 'flex-end',padding:2,width:30}}>
													<Text style={{color:'white',textAlign:'center'}}>{counts.sisaCuti}</Text>
												</View>
											</Col>
										</Grid>
									</View>
								</Body>
							</CardItem>
						</Card>
					</Col>
				</Grid>
				<Grid style={{justifyContent: 'center', alignItems: 'center',backgroundColor:'#fff',marginBottom:10}}>
					<Col style={{padding:20}}>
						<Text>Riwayat</Text>
						<List dataArray={items}
							renderRow={(item) =>
								<ListItem>
									<Grid style={{justifyContent: 'center', alignItems: 'center'}}>
										<Col>
											<Grid>
												<Row><Text style={{fontSize:10}}>Terhitung {item.date_start} sampai {item.date_end}</Text></Row>
												<Row>
													<View style={{backgroundColor:item.col,alignSelf: 'flex-end',padding:2}}>
														<Text style={{color:'white',textAlign:'center'}}>{item.status}</Text>
													</View>
												</Row>
												<Row><Text>{item.keterangan}</Text></Row>
											</Grid>
										</Col>
										<Col>
											<View style={{backgroundColor:'#3f51b5',alignSelf: 'flex-end',padding:2,width:70}}>
												<Text style={{color:'white'}}>{item.days} Hari</Text>
											</View>
										</Col>
									</Grid>
								</ListItem>
							}>
						</List>
					</Col>
				</Grid>
			</Content>
			<Footer style={styles.head}>
				<Body style={{alignSelf: 'flex-start',padding:15}}>
					<Title>Pengajuan Cuti</Title>
				</Body>
				<Right>
					<Button transparent onPress={() => this.props.navigation.navigate("Inputcuti",{id:this.props.navigation.state.params.res.id})}>
						<Icon name="ios-arrow-forward" style={{color:'white',fontSize:40}}/>
					</Button>
				</Right>
			</Footer>
		</Container>
		);
	}
}

export default Cuti;