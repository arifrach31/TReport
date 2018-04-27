import React, { Component } from 'react';
import { ImageBackground,StyleSheet,List,View,ListViewm,AsyncStorage } from 'react-native';
import axios from 'axios';
import {
    Card,CardItem,Left,
    Body,Right,Text,Button,
    Badge,ListItem,Spinner
} from 'native-base';
import {trelloConfigurations, backendlessConfigurations} from '../config';
import moment from '../assets/libs/moment'
import Chart from 'react-native-chartjs';

export default class Employees extends Component{

  state = {
    employeesData:[],
    employees:[],
    orgId:'',
    displayName:''
  }

  chartConfig = {}

  // Fetch all data to show
  fetchAll(data, orgId, displayName){

    const backendlessUri = 'https://api.backendless.com/CCAA6E46-DD53-D1AD-FFEB-C86025D08A00/CE02CAAB-5E67-4063-FF0F-E77165DC0A00/data/EmployeesPerformance'
    // Get employees data from Backendless Rest API
    axios.get(backendlessUri).then((result) => {
      // Set employees data to this.employeesData
      this.setState({
        employeesData: result.data
      })
      this.setState({
        displayName
      })
      const {trelloApiKey, trelloTokenKey} = data;
      const uri = `${trelloConfigurations.TRELLO_SERVER_URL}${'organizations'}${'/'}${orgId}${'/'}${'members'}${'?filter=normal&fields=fullName%2Cusername'}${'&key='}${trelloApiKey}${'&token='}${trelloTokenKey}`
      axios.get(uri).then((result) => {
        for (var i = 0; i < result.data.length; i++) {
          employees = this.state.employees
          employees.push(result.data[i].fullName)
          this.setState({
            employees
          })
          this.chartConfig = {
            type: 'bar',
            data: {
              labels:this.state.employees,
              datasets: [{
                label: 'Total Pending',
                data: [12,23,45,21],
                backgroundColor: 'rgba(255, 187, 15, 0.2)',
                borderColor: 'rgba(255, 187, 15, 1)',
                borderWidth: 1
              },{
                label: 'Total Done',
                data: [34,56,78,12],
                backgroundColor: 'rgba(5, 255, 59, 0.2)',
                borderColor: 'rgba(5, 255, 59, 1)',
                borderWidth: 1
              }]
            },
            options: {
              maintainAspectRatio : false,
              scales: {
                yAxes: [{
                  ticks: {
                    beginAtZero: true
                  }
                }]
              }
            }
          }
        }
      })
    })
  }

  // Fetch admin credential like trelloApiKey and telloaTokenKey
  // which will used to fetch response JSON from trello API
  fetchAdminCredentials(){
    AsyncStorage.multiGet(['objectID', 'orgId', 'displayName'], (error, result) => {
      if(result){
        const uri = backendlessConfigurations.USERS+result[0][1];
        axios.get(uri).then((res) => {
          this.fetchAll(res.data, result[1][1], result[2][1]);
        })
      }
    })
  }

  componentDidMount(){
    // Every component has been mounted this function will Executed
    this.fetchAdminCredentials()
  }

  render(){
    return(
        <Card>
          <CardItem>
            <Body style={styles.container}>
              <Text style={styles.employeesPerfomance}>Employees Perfomance</Text>
              <Text style={styles.companyName}>{this.state.displayName} - {moment().format('LL')}</Text>
            </Body>
          </CardItem>
          <CardItem cardBody>
            <ImageBackground source={require('../assets/images/logo.png')} style={{height: 230, width: null, flex: 1}}>
              <Chart chartConfiguration = {this.chartConfig} defaultFontSize={10}/>
            </ImageBackground>
          </CardItem>
          {this.state.employeesData.map((ed) => (
            <CardItem>
              {ed.grandTotalPending > ed.grandTotalDone ? (
                <Text note style={{color: '#d63031', alignItems: 'center', flex: 1, justifyContent: 'center', textAlign: 'center'}}>Bad</Text>
              ) : (
                <Text note style={{color: '#6ab04c', alignItems: 'center', flex: 1, justifyContent: 'center', textAlign: 'center'}}>Good</Text>
              )}
            </CardItem>
          ))}
          {this.state.employeesData.map((ed) => (
            <CardItem>
              <Badge warning><Text style={{paddingTop:3}}>{ed.grandTotalPending}</Text></Badge>
              <Text style={{color: '#636e72',paddingLeft: 10}}>Target pending</Text>
            </CardItem>
          ))}
          {this.state.employeesData.map((ed) => (
            <CardItem>
              <Badge success><Text style={{paddingTop:3}}>{ed.grandTotalDone}</Text></Badge>
              <Text style={{color: '#636e72',paddingLeft: 10}}>Target done</Text>
            </CardItem>
          ))}
        </Card>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  employeesPerfomance:{
    fontWeight: 'bold',
    color: '#0984e3'
  },
  companyName:{
    color: '#636e72'
  },
  chart: {
    height: 300,
    width: 300
  }
});