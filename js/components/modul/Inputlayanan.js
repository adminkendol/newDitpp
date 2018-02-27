import React, { Component } from "react";
import { TouchableOpacity,View,Image,Picker,Alert} from "react-native";
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
import Config from "../config/Base";

class Inputlayanan extends Component {
	static navigationOptions = {
		header: null
	};
	constructor(props) {
		super(props);
		this.state = {
			PickerValueHolder : '',
			date:"",
			showProgress: true,
			tgl:false,
			date_start:'',
			date_end:'',
			title:'',
			content:'',
			mess:'',
			emId:this.props.navigation.state.params.id
		};
		
	}
	GetSelectedPickerItem=()=>{
		Alert.alert(this.state.PickerValueHolder);
	}
	componentWillMount() {
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
			var res=responseJson.response;
			this.setState({showProgress: false,hasil:res}, function() {
			});
		})
		.catch((error) => {
			console.error("ERROT==>",error);
		});
	}
	showTgl(itemValue){
		this.setState({ PickerValueHolder: itemValue });
		if(itemValue=="4"){
			this.setState({tgl:true});
		}else{
			this.setState({tgl:false});
		}
	}
	render() {
	var visibletextA = null;
	var visibletextB = null;
	if (this.state.tgl) {
		visibletextA = (<DatePicker
							style={{width: 200}}
							date={this.state.date_start}
							mode="date"
							placeholder="Tanggal Mulai"
							format="YYYY-MM-DD"
							confirmBtnText="Confirm"
							cancelBtnText="Cancel"
							customStyles={{
								dateIcon: {
									position: 'absolute',
									left: 0,
									top: 4,
									marginLeft: 0
									},
								dateInput: {
									marginLeft: 36
									}
							}}
							onDateChange={(date) => {this.setState({date_start: date})}}
						/>);
		visibletextB = (<DatePicker
							style={{width: 200}}
							date={this.state.date_end}
							mode="date"
							placeholder="Tanggal Akhir"
							format="YYYY-MM-DD"
							confirmBtnText="Confirm"
							cancelBtnText="Cancel"
							customStyles={{
								dateIcon: {
									position: 'absolute',
									left: 0,
									top: 4,
									marginLeft: 0
									},
								dateInput: {
									marginLeft: 36
									}
							}}
							onDateChange={(date) => {this.setState({date_end: date})}}
						/>);
	} 
	console.log("REST OK==>",this.state.hasil);
	var listJenis=this.state.hasil;
	/*var listJenis=[{id:"1",name:"Peminjaman Aset Kendaraan",show_date:"0"},
			{id:"2",name:"ATK",show_date:"0"},{id:"3",name:"BMN",show_date:"0"},
			{id:"4",name:"Transportasi",show_date:"1"}];*/
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
					<Title>Request</Title>
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
					<Title>Request</Title>
				</Body>
				<Right />
			</Header>
			<Content>
				<Grid style={{marginBottom:20}}>
					<Col style={{padding:2}}>
						<View style={{justifyContent: 'center', alignItems: 'center',backgroundColor:'#fff',marginBottom:20,padding:10}}>
							<Grid>
								<Col>
									<Form>
										<Picker
											mode="dropdown"
											selectedValue={this.state.PickerValueHolder}
											onValueChange ={itemValue => this.showTgl(itemValue)}>
											<Picker.Item label='Jenis Request' value='0' />
											{listJenis.map((item, index) => {
												return (< Picker.Item label={item.name} value={item.id} key={index} />);
											})}
										</Picker>
										<Item floatingLabel last>
											<Label>Title</Label>
											<Input 
											onChangeText={(text) => this.setState({title: text})}
											value={this.state.title}/>
										</Item>
										<Item>{visibletextA}</Item>
										<Item>{visibletextB}</Item>
										<Item floatingLabel last>
											<Label>Content</Label>
											<Input 
											onChangeText={(text) => this.setState({content: text})}
											value={this.state.content}/>
										</Item>
										<Button medium rounded 
											style={{width: '100%',marginTop:20,flex: 1,justifyContent: 'center', alignItems: 'center'}}
											onPress={this.submit.bind(this)}>
											<Text>Submit</Text>
										</Button>
									</Form>
								</Col>
							</Grid>
						</View>
					</Col>
				</Grid>
				<Dialog
                    visible={this.state.showDialog}
                    onTouchOutside={() => this.setState({showDialog:false})}
                    contentStyle={{ justifyContent: 'center', alignItems: 'center', }}
                    animationType="fade">
                    <Text style={{ marginBottom: 10 }}>{this.state.mess}</Text>
                    <Button onPress={() => this.setState({showDialog:false})} style={{ marginTop: 10 }} >
						<Text>Tutup</Text>
					</Button>
                </Dialog>
			</Content>
		</Container>
		);
	}
	submit(){
		this.setState({ showProgress: true })
		if(this.state.PickerValueHolder==""){
			this.setState({ showProgress: false,showDialog:true,mess:'Jenis Request harus dipilih' });
		}else if((this.state.PickerValueHolder=="4")&&((this.state.date_start=="")||(this.state.date_end==""))){
			this.setState({ showProgress: false,showDialog:true,mess:'Tanggal mulai atau akhir cuti tidak boleh kosong' });
		}else if(this.state.title==""){
			this.setState({ showProgress: false,showDialog:true,mess:'Title tidak boleh kosong' });
		}else if(this.state.cintent==""){
			this.setState({ showProgress: false,showDialog:true,mess:'Content tidak boleh kosong' });
		}else{
			fetch(Config.apiInReq(), {
				method: 'POST',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({"uid":this.props.navigation.state.params.id,"type":this.state.PickerValueHolder,"title":this.state.title,"content":this.state.content,"date_start":this.state.date_start,"date_end":this.state.date_end})
			})
			.then((response) => response.json())
			.then((responseJson) => {
				console.log(responseJson);
				var res=responseJson;
				this.setState({showProgress: false,hasilLogin:res}, function() {
					if(res.status=="200"){
						console.log("BACK REQUEST",this.state.emId);
						this.props.navigation.navigate("Layanan",{id:this.state.emId});
					}else{
						Alert.alert(
							'Perhatian',
							'Parameter salah !',
							[
								{text: 'OK', onPress: () => console.log('OK Pressed')},
							],
							{ cancelable: false }
						)
					}
				});
			})
			.catch((error) => {
				console.error("ERROT SUBMIT==>",error);
			});
		}
    }
}
export default Inputlayanan;