import React, { Component } from "react";
import { ActivityIndicator,TouchableOpacity,View,Image,Alert,BackHandler } from "react-native";
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
  Left,Spinner,
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

class Absensi extends Component {
	static navigationOptions = {
		header: null
	};
	constructor(props) {
		super(props);
		this.state = {
			showProgress: true,
		}
	}
	componentWillMount() {
		fetch("http://ditpitalebar.com/api/v1/employee/absensi/", {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',

			},
			body: JSON.stringify({"uid":this.props.navigation.state.params.id})
		})
		.then((response) => response.json())
		.then((responseJson) => {
			var itemsA =responseJson.data;
			var title;
			var col;
			var icon;
			var tgl;
			var msk;
			var out;
			var arr = [];
			for(var i=0;i<10;i++){
				title = itemsA[i].description;
				if(itemsA[i].flag=="X"){
					col ="red";
					icon="md-paper";
				}else if(itemsA[i].flag=="T"){
					col ="orange";
					icon="md-clock";
				}else if(itemsA[i].flag=="V"){
					col ="green";
					icon="md-paper";
				}else{
					col ="blue";
					icon="md-paper";
				}
				arr.push({'title':title,'col':col,'icon':icon,'tgl':itemsA[i].date,'msk':itemsA[i].in,'out':itemsA[i].out});
			}
			var datas =JSON.parse(JSON.stringify(arr));
			this.setState({showProgress: false,hasil:arr}, function() {
			});
		})
		.catch((error) => {
			console.error("ERROT==>",error);
		});
	}
	render() {
	console.log('render',this.state.hasil);
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
					<Title>Absensi</Title>
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
					<Title>Absensi</Title>
				</Body>
				<Right />
			</Header>
			<Content>
				<Grid style={{justifyContent: 'center', alignItems: 'center',backgroundColor:'#fff',marginBottom:10}}>
					<Col style={{padding:20}}>
						<List dataArray={this.state.hasil}
							renderRow={(item) =>
								<ListItem>
									<Grid>
										<Row>
											<Grid>
												<Col style={{width:30}}><Icon name={item.icon} style={{color:item.col,fontSize:30}}/></Col>
												<Col>
													<View style={{alignSelf: 'flex-start',}}>
														<Text style={{color:item.col,fontSize:20}}>-{item.title}</Text>
													</View>
												</Col>
											</Grid>
										</Row>
										<Row>
											<View style={{alignSelf: 'flex-start',}}>
												<Text>{item.tgl}</Text>
											</View>
										</Row>
										<Row>
											<View style={{alignSelf: 'flex-start',}}>
												<Text>Masuk:{item.msk}</Text>
											</View>
										</Row>
										<Row>
											<View style={{alignSelf: 'flex-start',}}>
												<Text>Keluar:{item.out}</Text>
											</View>
										</Row>
									</Grid>
								</ListItem>
							}>
						</List>
					</Col>
				</Grid>
			</Content>
		</Container>
		);
	
    
	}
}
export default Absensi;