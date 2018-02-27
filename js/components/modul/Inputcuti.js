import React, { Component } from "react";
import { TouchableOpacity,View,Image,Picker,Alert } from "react-native";
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
} from 'react-native-simple-dialogs';
import { setIndex } from "../../actions/list";
import { openDrawer } from "../../actions/drawer";
import Config from "../config/Base";
import styles from "./styles";

class Inputcuti extends Component {
	static navigationOptions = {
		header: null
	};
	constructor(props) {
		super(props);
		this.state = {
			hasil:'',
			count:'',
			PickerValueHolder : '',
			showProgress: true,
			date_start:'',
			date_end:'',
			hari:'',
			ket:'',
			mess:'',
			showDialog:false,
			emId:this.props.navigation.state.params.id
		};
		
	}
	
	/*GetSelectedPickerItem=()=>{
		Alert.alert(this.state.PickerValueHolder);
	}*/
	componentWillMount() {
		fetch(Config.apiCutiList(), {
			method: 'GET',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',

			},
		})
		.then((response) => response.json())
		.then((responseJson) => {
			console.log(responseJson);
			var res=responseJson.data;
			this.setState({hasil:res}, function() {
				fetch(Config.apiCutiSisa(), {
					method: 'POST',
					headers: {
						'Accept': 'application/json',
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({"uid":this.props.navigation.state.params.id})
				}).then((response) => response.json())
				.then((responseJson) => {
					console.log(responseJson);
					var resA=responseJson.data[0].sisa_cuti;
					this.setState({showProgress: false,count:resA}, function() {
					});
				})
				.catch((error) => {
					console.error("ERROT==>",error);
				});
			});
		})
		.catch((error) => {
			console.error("ERROT==>",error);
		});
		
		
	}
	render() {
	//var listCuti=[{"id":"1","nama_cuti":"Cuti Tahunan","pengurangan":"1"},{"id":"2","nama_cuti":"Cuti Besar","pengurangan":"0"},{"id":"3","nama_cuti":"Cuti Sakit","pengurangan":"0"},{"id":"4","nama_cuti":"Cuti Bersalin","pengurangan":"0"},{"id":"5","nama_cuti":"Cuti Karena Alasan Penting","pengurangan":"0"},{"id":"6","nama_cuti":"Keterangan Lain-lain","pengurangan":"0"}];
	console.log("REST LIST==>",this.state.hasil);
	console.log("REST SISA==>",this.state.count);
	var listCuti=this.state.hasil;
	var counts = this.state.count;
	if(this.state.showProgress){
		return (
		<Container style={styles.bgpage}>
			<Header style={styles.head}>
				<Left>
					<Button transparent onPress={() => this.props.navigation.goBack()}>
						<Icon name="ios-arrow-back" />
					</Button>
				</Left>
				<Body>
					<Title>Pengajuan Cuti</Title>
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
					<Title>Pengajuan Cuti</Title>
				</Body>
				<Right />
			</Header>
			<Content>
				<Grid style={styles.margin_bottom}>
					<Col style={{padding:10}}>
						<View style={{justifyContent: 'center', alignItems: 'center',backgroundColor:'#fff',marginBottom:20,padding:10}}>
							<Grid>
								<Col style={{width:35}}><Icon name='md-warning' style={{color:'orange',fontSize:20}}/></Col>
								<Col><Text style={{fontSize:15}}>Remaining</Text></Col>
								<Col>
									<View style={{alignSelf: 'flex-end',}}>
										<Button small primary><Text style={{fontSize:15}}>{counts}</Text></Button>
									</View>
								</Col>
							</Grid>
						</View>
						<View style={{justifyContent: 'center', alignItems: 'center',backgroundColor:'#fff',marginBottom:20,padding:10}}>
							<Grid>
								<Col>
									<Form>
										<Picker
											mode="dropdown"
											selectedValue={this.state.PickerValueHolder}
											onValueChange ={itemValue => this.setState({ PickerValueHolder: itemValue })}>
											<Picker.Item label='Jenis cuti' value='0' />
											{listCuti.map((item, index) => {
												return (< Picker.Item label={item.nama_cuti} value={item.id} key={index} />);
											})}
											
										</Picker>
										<Grid style={{padding:10}}>
											<Col><Text style={{fontSize:15}}>Mulai</Text></Col>
											<Col>
												<View style={{alignSelf: 'flex-end',}}>
													<DatePicker
														style={{width: 200}}
														date={this.state.date_start}
														mode="date"
														placeholder="select date"
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
													/>
												</View>
											</Col>
										</Grid>
										<Grid style={{padding:10}}>
											<Col><Text style={{fontSize:15}}>Selesai</Text></Col>
											<Col>
												<View style={{alignSelf: 'flex-end',}}>
													<DatePicker
														style={{width: 200}}
														date={this.state.date_end}
														mode="date"
														placeholder="select date"
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
														onDateChange={(date) => {
															this.setState({date_end: date}),
															this.getDays();
														}}
													/>
												</View>
											</Col>
										</Grid>
										<Item floatingLabel last>
											<Label>Alamat</Label>
											<Input 
											onChangeText={(text) => this.setState({ket: text})}
											value={this.state.ket}/>
										</Item>
										<Item>
											<Label>Days</Label>
											<Text>{this.state.hari}</Text>
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
	catat(id){
		console.log("PICKER",id);
		return id;
	}
	submit(){
		this.setState({ showProgress: true })
		if(this.state.PickerValueHolder==""){
			this.setState({ showProgress: false,showDialog:true,mess:'Jenis cuti harus dipilih' });
		}else if((this.state.date_start=="")||(this.state.date_end=="")){
			this.setState({ showProgress: false,showDialog:true,mess:'Tanggal mulai atau akhir cuti tidak boleh kosong' });
		}else if(this.state.ket==""){
			this.setState({ showProgress: false,showDialog:true,mess:'Alamat tidak boleh kosong' });
		}else{
			fetch(Config.apiCutiSubmit(), {
				method: 'POST',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({"uid":this.props.navigation.state.params.id,"title":"annual leave","keterangan":this.state.ket,"days":this.state.hari,"date_start":this.state.date_start,"date_end":this.state.date_end,"jenis_cuti":this.state.PickerValueHolder})
			})
			.then((response) => response.json())
			.then((responseJson) => {
				console.log(responseJson);
				var res=responseJson;
				this.setState({showProgress: false,hasilLogin:res}, function() {
					if(res.status=="200"){
						console.log("BACK CUTI",this.state.emId);
						this.props.navigation.navigate("Cuti",{id:this.state.emId});
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
	getDays() {
		console.log("DAYS 1",this.state.date_start);
		var d1 = new Date(this.state.date_start);
		var d2 = new Date(this.state.date_end);
		var one_day=1000*60*60*24;
		var d1_days = parseInt(d1.getTime()/one_day) - 1;
		var d2_days = parseInt(d2.getTime()/one_day);
		var days = (d2_days - d1_days);
		var weeks = (d2_days - d1_days) / 7;
		var day1 = d1.getDay();
		var day2 = d2.getDay();
		if (day1 == 0) {
			days--;
		} else if (day1 == 6) {
			days-=2;
		}
		if (day2 == 0) {
			days-=2;
		} else if (day2 == 6) {
			days--;
		}
		days -= parseInt(weeks) * 2;
		console.log("DAYS",days);
		this.setState({hari:days});
	}
}
export default Inputcuti;