import React, { Component } from "react";
import { TouchableOpacity,View,Image } from "react-native";
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
  Left,
  Body,Card, CardItem,
  Right,Badge,List,ListItem
} from "native-base";
import { Grid, Row,Col } from "react-native-easy-grid";
import LinearGradient from 'react-native-linear-gradient';
import {
    Dialog,
    ProgressDialog,
    ConfirmDialog,
} from 'react-native-simple-dialogs'
import { setIndex } from "../../actions/list";
import { openDrawer } from "../../actions/drawer";
import styles from "./styles";
import Config from "../config/Base";

class Layanan extends Component {
	static navigationOptions = {
		header: null
	};
	constructor(props) {
		super(props);
		this.state = {
			showProgress: true,
			listResEmp:'',
			listRes:''
		};
	}
	componentDidMount() {
		fetch(Config.apiListSar(), {
			method: 'GET',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			},
		})
		.then((response) => response.json())
		.then((responseJson) => {
			console.log(responseJson.response);
			var resA=responseJson.response;
			this.setState({listRes:resA}, function() {
				fetch(Config.apiListReq(), {
					method: 'POST',
					headers: {
						'Accept': 'application/json',
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({"id":this.props.navigation.state.params.id})
				})
				.then((response) => response.json())
				.then((responseJson) => {
					console.log("RES",responseJson);
					if(responseJson.response==""){
						var resB=[{id:"",
						employee_id:"",
						sar_request_id:"0",
						title:"Tidak Ada Request",
						content:"-",
						date_start:"",
						date_end:"",
						id_read:"",
						date_read:"",
						date_do:"",
						date_created:"",
						date_request:"",
						status:"0"}];
					}else{
						//var resB=responseJson.response;
						var itemsA =responseJson.response;
						var status;
						var col;
						var resB = [];
						for(var i=0;i<itemsA.length;i++){
							if(itemsA[i].status=="0"){
								col ="orange";
								status="Pending";
							}else if(itemsA[i].status=="1"){
								col ="green";
								status="Done";
							}
							resB.push({'id':itemsA[i].id,
							'employee_id':itemsA[i].employee_id,
							'sar_request_id':itemsA[i].sar_request_id,
							'title':itemsA[i].title,
							'content':itemsA[i].content,
							'date_start':itemsA[i].date_start,
							'date_end':itemsA[i].date_end,
							'id_read':itemsA[i].id_read,
							'date_read':itemsA[i].date_read,
							'date_do':itemsA[i].date_do,
							'date_created':itemsA[i].date_created,
							'date_request':itemsA[i].date_request,
							'status':status,
							'col':col});
						}
					}
					this.setState({showProgress: false,listResEmp:resB}, function() {
					});
				})
				.catch((error) => {
					console.error("ERROT2==>",error);
				});
			});
		})
		.catch((error) => {
			console.error("ERROT1==>",error);
		});
	}
	getType(id){
		var data = this.state.listRes;
		var res = "";
		for (var i =0; i < data.length; i++){
			if(id==data[i].id){
				res = data[i].name;
			}
		}
		return res;
	}	
	render() {
	//var items =[{"id":"1","employee_id":"16","sar_request_id":"1","title":"Ballpen","content":"Minta 1 balliner","date_start":"0000-00-00 00:00:00","date_end":"0000-00-00 00:00:00","id_read":"0","date_read":"0000-00-00 00:00:00","date_do":"0000-00-00","date_created":"2017-12-27 18:41:11","date_request":"2017-12-27","status":"0"},{"id":"2","employee_id":"16","sar_request_id":"1","title":"Ballpen","content":"Minta 1 balliner","date_start":"0000-00-00 00:00:00","date_end":"0000-00-00 00:00:00","id_read":"0","date_read":"0000-00-00 00:00:00","date_do":"0000-00-00","date_created":"2017-12-27 18:41:11","date_request":"2017-12-27","status":"0"},{"id":"3","employee_id":"16","sar_request_id":"1","title":"Laptop","content":"Yoga thinkpad","date_start":"0000-00-00 00:00:00","date_end":"0000-00-00 00:00:00","id_read":"0","date_read":"0000-00-00 00:00:00","date_do":"0000-00-00","date_created":"2018-01-04 20:53:38","date_request":"2018-01-04","status":"0"},{"id":"4","employee_id":"16","sar_request_id":"1","title":"Mobil","content":"Kodel","date_start":"0000-00-00 00:00:00","date_end":"0000-00-00 00:00:00","id_read":"0","date_read":"0000-00-00 00:00:00","date_do":"0000-00-00","date_created":"2018-01-04 20:55:45","date_request":"2018-01-04","status":"0"}];
    var items = this.state.listResEmp
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
					<Title>Layanan Umum</Title>
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
					<Title>Layanan Umum</Title>
				</Body>
				<Right />
			</Header>
			<Content>
				<Grid style={{justifyContent: 'center', alignItems: 'center',backgroundColor:'#fff',marginBottom:10}}>
					<Col style={{padding:20}}>
						<List dataArray={items}
							renderRow={(item) =>
								<ListItem>
									<Grid>
										<Row>
											<Grid>
												<Col>
													<View style={{alignSelf: 'flex-start',}}>
														<Text style={{fontSize:20}}>{this.getType(item.sar_request_id)}</Text>
													</View>
												</Col>
											</Grid>
										</Row>
										<Row>
											<View style={{alignSelf: 'flex-start',}}>
												<Text>Title:{item.title}</Text>
											</View>
										</Row>
										<Row>
											<View style={{alignSelf: 'flex-start',}}>
												<Text>Content:{item.content}</Text>
											</View>
										</Row>
										<Row>
											<View style={{alignSelf: 'flex-start',}}>
												<View style={{backgroundColor:item.col,alignSelf: 'flex-end',padding:2}}>
													<Text style={{color:'white',textAlign:'center'}}>{item.status}</Text>
												</View>
											</View>
										</Row>
									</Grid>
								</ListItem>
							}>
						</List>
					</Col>
				</Grid>
			</Content>
			<Footer style={styles.head}>
				<Body style={{alignSelf: 'flex-start',padding:15}}>
					<Title style={{fontSize:15}}>Pengajuan</Title>
				</Body>
				<Right>
					<Button transparent onPress={() => this.props.navigation.navigate("Inputlayanan",{id:this.props.navigation.state.params.res.id})}>
						<Icon name="ios-arrow-forward" style={{color:'white',fontSize:40}}/>
					</Button>
				</Right>
			</Footer>
		</Container>
		);
	}
}
export default Layanan;