import React, {Component} from 'react';
import {List, ListItem, Text, Button, CardItem, Card, Body, Badge,Left,Right} from 'native-base';
import {TouchableOpacity, StyleSheet, Image,AsyncStorage} from 'react-native';
import { trelloConfigurations, backendlessConfigurations } from '../config';
import moment from '../assets/libs/moment';
import axios from 'axios';

export default class Individual extends Component{

  state = {
    employees:[],
    objectId:'',
    tp: 30,
    td: 20
  }

  // Fetch all data to show
  fetchAll(data, orgId){
    const {trelloApiKey, trelloTokenKey} = data;
    const uri = `${trelloConfigurations.TRELLO_SERVER_URL}${'organizations'}${'/'}${orgId}${'/'}${'members'}${'/'}${'normal?key='}${trelloApiKey}${'&token='}${trelloTokenKey}`
    axios.get(uri).then((result) => {
      this.setState({
        employees:result.data
      })
    })
  }

  // Fetch admin credential like trelloApiKey telloaTokenKey and orga
  // which will used to fetch response JSON from trello API
  fetchAdminCredentials(){
    AsyncStorage.multiGet(['userToken', 'objectID', 'orgId'], (error, result) => {
      if(result){
        const uri = `${backendlessConfigurations.USERS}${'/'}${result[1][1]}`
        axios.get(uri).then((res) => {
          this.fetchAll(res.data, result[2][1]);
        })
      }
    })
  }

  componentDidMount(){
    this.fetchAdminCredentials()
  }

  render(){
    return(
      <Card>
        <CardItem>
          <Body style={styles.container}>
            <Text style={styles.title}>Individuals Performance</Text>
            <Text style={styles.subtitle}>{moment().format('LL')}</Text>
          </Body>
        </CardItem>
        {this.state.employees.map((individual)=> (
        <List key={individual.id}>
          <ListItem>
            <Left style={{flex: 1, flexDirection: 'column', alignItems: 'center'}}>
              <Image source={require('../assets/images/logo.png')} style={{height: 50, width: 50, flex: 1,resizeMode: 'contain'}}/>
              <Text style={{fontWeight:'bold',marginBottom:10}}>{individual.fullName}</Text>
              <Right>
                {this.state.tp > this.state.td ? (
                  <Text note style={{color: '#d63031'}}>Bad</Text>
                ) : (
                  <Text note style={{color: '#6ab04c'}}>Good</Text>
                )}
              </Right>
            </Left>
            <Body>
              <CardItem>
                <Badge warning><Text style={{paddingTop:3}}>{this.state.tp}</Text></Badge>
                <Text style={{color: '#636e72',paddingLeft: 10,fontSize:15}}>Target pending</Text>
              </CardItem>
              <CardItem>
                <Badge success><Text style={{paddingTop:3}}>{this.state.td}</Text></Badge>
                <Text style={{color: '#636e72',paddingLeft: 10,fontSize:15}}>Target done</Text>
              </CardItem>
            </Body>
          </ListItem>
        </List>
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
  title:{
    fontWeight: 'bold',
    color: '#0984e3'
  },
  subtitle:{
    color: '#636e72'
  }
});
