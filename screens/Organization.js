import React, {Component} from 'react'
import {View, StyleSheet,TouchableOpacity, AsyncStorage} from 'react-native'
import {trelloConfigurations} from '../config'
import {
  Container, Content, List, 
  ListItem, Text, Fab,
  Item, Label, Input, 
  Button, Icon, Card, 
  CardItem, Body
} from 'native-base'
import axios from 'axios'

export default class Organization extends Component{

  state = {
    organizations: [],
    displayName: ""
  }

  allOrganizations(){
    const uri = `${trelloConfigurations.TRELLO_SERVER_URL}${'members'}${'/'}${'azharrizkip'}${'/'}${'organizations?filter=all&fields=displayName'}${'&key='}${'0a5393e0cda60d506290ca411d6d7667'}${'&token='}${'4158254e3c7ed15bc4d72b1e40987413de392255e7815d0ae07a74afce8ddcb1'}`
    axios.get(uri).then((result)=>{
      this.setState({
        organizations: result.data,
        displayName: ""
      })
    })
  }

  handleSubmit(){
    axios.post(`https://api.trello.com/1/organizations?displayName=displayName&key=0a5393e0cda60d506290ca411d6d7667&token=4158254e3c7ed15bc4d72b1e40987413de392255e7815d0ae07a74afce8ddcb1`, {displayName: this.state.displayName}).then(result=>{
      if(result.data)
        this.allOrganizations()
    })
  }

  componentDidMount(){
    this.allOrganizations()
  }

  render(){
    return (
      <Container style={{backgroundColor: '#FFF'}}>
        <Content style={styles.content}>     
          <Content>
            <View>
              <Text style={styles.display}>Display Name</Text>
            </View>

            <Item regular style={styles.itemInputOrg}>
                <Input placeholder='Input Your Organization Name'placeholderTextColor="#dfe6e9" 
                  onChangeText={displayName=> this.setState({displayName})}
                  value={this.state.displayName} />
            </Item>

            <Button block style={styles.buttonNewOrg} onPress={()=> this.handleSubmit()}>
                <Text>Create New Organization</Text>
            </Button>
          </Content>
          <Content>
            <View style = {styles.lineStyleLeft} />
               <Text style={styles.or}>OR</Text>
            <View style = {styles.lineStyleRight} />

              <Text style={styles.choose}>Choose One</Text>
              <Card style={styles.card}>
                 {this.state.organizations.map((organization)=>(
                    <CardItem key={organization.id} button onPress={()=> this.props.navigation.navigate('Dashboard',{id: organization.id})}>
                        <TouchableOpacity onPress={()=>
                              AsyncStorage.getItem('orgId').then( data => {
                                AsyncStorage.setItem('orgId', organization.id)
                                AsyncStorage.setItem('displayName', organization.displayName)
                                this.props.navigation.navigate('Dashboard', {orgId: organization.id,displayName:organization.displayName})
                              })}>
                            <Text>{organization.displayName}</Text>
                        </TouchableOpacity>
                    </CardItem>
                 ))} 
              </Card>
          </Content>
        </Content>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
    display: {
        color: '#777777',
    },
    content: {
        padding: 20,
    },
    itemInputOrg: {
        marginTop: 15,
    },
    buttonNewOrg: {
        marginTop: 20,
        backgroundColor: '#026aa7'
    },
    or: {
        textAlign: 'center',
        marginTop: -20,
    },
    choose: {
        marginTop: 15,
    },
    card: {
        marginTop: 15,
    },
    lineStyleLeft: {
        marginTop: 35,
        borderWidth: 0.5,
        borderColor:'black',
        margin: 10,
        width: 120,
    },
    lineStyleRight: {
        marginLeft: 210,
        marginTop: -12,
        borderWidth: 0.5,
        borderColor:'black',
        margin: 10,
        width: 120,
    }
});