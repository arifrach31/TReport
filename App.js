import React, {Component} from 'react';
import { StackNavigator } from 'react-navigation';
import { Button, Icon,View,Text } from 'native-base';
import { TouchableOpacity,StyleSheet } from 'react-native'

import Dashboard from './screens/Dashboard';
import Reports from './screens/Reports';
import Login from './screens/Login';
import Register from './screens/Register';
import ReportDetail from './screens/ReportDetail';
import AddReport from './screens/AddReport'
import Settings from './screens/Settings'
import Organization from './screens/Organization'
import EditReport from './screens/EditReport'

const Styles = StyleSheet.create({
    headerTitle:{
      color: '#ffffff',
      fontWeight: 'bold'
    },
    headerSubtitle:{
      color: '#ffffff',
    },
    headerWrapper:{
      alignItems: 'center',
      flex: 1
    }
});

const App = StackNavigator({
  Login:{
    screen: Login,
    navigationOptions:{
      header: null
    }
  },
  Register:{
    screen: Register,
    navigationOptions:{
      header: null
    }
  },
  Dashboard:{
    screen: Dashboard,
    navigationOptions:{
      header: null
    }
  },
  Reports:{
    screen: Reports,
    navigationOptions:{
      headerTintColor: '#fff',
      headerTitle:(
        <View style={Styles.headerWrapper}>
          <Text style={Styles.headerTitle}>Report</Text>
          <Text style={Styles.headerSubtitle}>Board List</Text>
        </View>),
      headerStyle: {
        backgroundColor: '#026aa7'
      },
      headerRight: (<TouchableOpacity/>),
    }
  },
  ReportDetail:{
    screen: ReportDetail,
  },
  AddReport: {
    screen: AddReport,
  },
  Settings: {
    screen: Settings,
  },
  RouteFetchTrelloEditReport: {
    screen: EditReport,
  },
  Organization: {
    screen: Organization,
    navigationOptions:{
      headerTintColor: '#fff',
      headerTitle:(
        <View style={Styles.headerWrapper}>
          <Text style={Styles.headerTitle}>Edit Organization</Text>
        </View>),
      headerStyle: {
        backgroundColor: '#026aa7'
      },
      headerRight: (<TouchableOpacity/>),
    }
  },
}, {
  initialRouteName: 'ReportDetail',
})

export default App;