import React, { Component } from "react";
//import React, {Component,BackHandler} from 'react-native';
import Login from "../components/login/Login";
import Keluar from "../components/login/Login";
import Home from "../components/modul/Home";
import Dashboard from "../components/modul/Dashboard";
import Cuti from "../components/modul/Cuti";
import Inputcuti from "../components/modul/Inputcuti";
import Absensi from "../components/modul/Absensi";
import Layanan from "../components/modul/Layanan";
import Inputlayanan from "../components/modul/Inputlayanan";
import Profile from "../components/modul/Profile";
import Notif from "../components/modul/Notif";
import Info from "../components/modul/Info";
import BlankPage from "../components/blankPage";
import HomeDrawerRouter from "./HomeDrawerRouter";
import { StackNavigator } from "react-navigation";
import { Header, Left, Button, Icon, Body, Title, Right } from "native-base";
HomeDrawerRouter.navigationOptions = ({ navigation }) => ({
  header: null
});
export default (StackNav = StackNavigator({
  Login: { screen: Login },
  Home: { screen: Home },
  Dashboard: { screen: Dashboard },
  Cuti: { screen: Cuti },
  Inputcuti: { screen: Inputcuti },
  Absensi: { screen: Absensi },
  Layanan: { screen: Layanan },
  Inputlayanan: { screen: Inputlayanan },
  Profile: { screen: Profile },
  Notifikasi: { screen: Notif },
  Informasi: { screen: Info },
  Keluar: { screen: Keluar }
}));
