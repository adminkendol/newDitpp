import React, { Component } from "react";
import { TouchableOpacity,View,Image,Picker } from "react-native";
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
  Button,SwipeRow,
  Icon,Label,Spinner,
  Left,Form,Input,Item,
  Body,Card, CardItem,
  Right,Badge,List,ListItem
} from "native-base";
import { Grid, Row,Col } from "react-native-easy-grid";
import LinearGradient from 'react-native-linear-gradient';
import DatePicker from 'react-native-datepicker'
import {
    Dialog,
    ProgressDialog,
    ConfirmDialog,
} from 'react-native-simple-dialogs'
import { setIndex } from "../../actions/list";
import { openDrawer } from "../../actions/drawer";
import styles from "./styles";

class Profile extends Component {
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
		fetch("http://ditpitalebar.com/api/v1/employee/Employee", {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',

			},
			body: JSON.stringify({"uid":"32"})
		})
		.then((response) => response.json())
		.then((responseJson) => {
			this.setState({showProgress: false,hasil:responseJson}, function() {
			});
		})
		.catch((error) => {
			console.error("ERROT==>",error);
		});
	}
	render() {
	console.log("REST OK==>",this.state.hasil);
	var listProfile=this.state.hasil;
	var name;var nip;
	for (var i in listProfile) {
		name=listProfile[i].realname;
		nip=listProfile[i].nip;
		email=listProfile[i].email;
		phone=listProfile[i].phone;
		photo=listProfile[i].photo;
		address=listProfile[i].address;
		
	}
	console.log("NAME==>",name);
	//var listProfile=[{"id":"32","jabatan_id":"76","pangkat_id":"20","employee_type":"1","username":"della01","password":"92eOAKU+GW+NQNSJQPlb4DbxsvkUGPtY6vHjSX4TbisV\/TM6Tmzof6iIPofk5zPNkOjBdFIrQsL0NsUXpz0HoQ==","realname":"Della Krisnasari","nip":"3909010110353","email":"test","phone":"08118902222","address":"","photo":"5a39676681cfa-banner.jpg","date_diangkat":"1900-01-01","date_tmt":"1900-01-01","pendidikan_id":"4","pendidikan_tahun_lulus":"0","pendidikan_name":"Manajemen Bisnis Telekomunikasi Informatika","tempat_lahir":"none","agama":"I","status_perkawinan":"none","gender":"P","dob":"1900-01-01","jadwal_pensiun":"2900-01-01","aset":"","date_created":"2017-12-20 02:24:22","date_modified":"2017-12-20 02:24:22","status":"1","sign_file":"0"}];
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
					<Title>Profile</Title>
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
					<Title>Profile</Title>
				</Body>
				<Right />
			</Header>
			<Content>
				<Grid style={{padding:20}}>
					<Row>
						<Card>
							<CardItem>
								<Left>
									<Body>
										<Text style={{fontSize:20}}>{name}</Text>
										<Text note>NIP:{nip}</Text>
									</Body>
								</Left>
							</CardItem>
							<CardItem cardBody>
								<Image source={{uri:"http://ditpitalebar.com/assets/uploads/employee/32/5a39676681cfa-banner.jpg"}} style={{height: 200, width: null, flex: 1}}/>
							</CardItem>
							
						</Card>
					</Row>
					<Row style={{backgroundColor:'white'}}>
						<Form>
							<Item stackedLabel>
								<Label>Password</Label>
								<Input value='******'/>
							</Item>
							<Item stackedLabel last>
								<Label>email</Label>
								<Input value={email}/>
							</Item>
							<Item stackedLabel last>
								<Label>Telepon</Label>
								<Input value={phone}/>
							</Item>
							<Item stackedLabel last>
								<Label>Alamat</Label>
								<Input value={address}/>
							</Item>
						</Form>
					</Row>
				</Grid>
				
			</Content>
		</Container>
		);
	}
}
export default Profile;