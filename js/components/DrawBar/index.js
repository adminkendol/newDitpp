import React from "react";
import { AppRegistry, Image, TouchableOpacity } from "react-native";
import {
  Button,
  Text,
  Container,
  List,
  ListItem,
  Content,
  Icon
} from "native-base";

const routes = [
	{name: 'Home',icon: 'home',ref:'Home'},
	{name: 'Dashboard',icon: 'md-grid',ref:'Dashboard'},
	{name: 'Notifikasi',icon: 'md-phone-portrait',ref:'Notifikasi'},
	{name: 'Layanan Umum',icon: 'md-document',ref:'Layanan'},
	{name: 'Cuti',icon: 'md-calendar',ref:'Cuti'},
	{name: 'Profil',icon: 'md-person',ref:'Profile'},
	{name: 'Keluar',icon: 'md-exit',ref:'Keluar'}
]	
export default class DrawBar extends React.Component {
  static navigationOptions = {
    header: null
  };
  render() {
    return (
      <Container>
        <Content>
            <TouchableOpacity
              style={{
				backgroundColor: '#3d616d',
                height: 120,
                alignSelf: "stretch",
                justifyContent: "center",
                alignItems: "center"
              }}
              onPress={() => this.props.navigation.navigate("DrawerClose")}>
              <Text style={{color:'#ffffff',fontSize:20}}>{this.props.navigation.state.params.res.realname}</Text>
            </TouchableOpacity>
          <List
            dataArray={routes}
            renderRow={data => {
              return (
                <ListItem
                  button
                  onPress={() => this.props.navigation.navigate(data.ref, {id:this.props.navigation.state.params.res.id})}>
					<Icon name={data.icon} style={{ marginRight: 30}}/>
					<Text>{data.name}</Text>
                </ListItem>
              );
            }}
          />
		  
        </Content>
      </Container>
    );
  }
}
