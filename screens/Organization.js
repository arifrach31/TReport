import React, { Component } from 'react';
import {View, StyleSheet,TouchableOpacity, AsyncStorage} from 'react-native';
import {trelloConfigurations} from '../config';
import axios from 'axios';
import {
    Container,Header,Title,Content,
    Left,Body,Right,Text,Form,Input,
    Item,Button,Icon,Card,CardItem,Radio
} from 'native-base';

export default class Organization extends Component{

    state = {
      organizations:[]
    }

    componentWillMount(){
      const uri = `${trelloConfigurations.TRELLO_SERVER_URL}${'members'}${'/'}${'m_isawk'}${'/'}${'organizations?filter=all&fields=displayName'}${'&key='}${'d165dbe9aca376e0a7c43ff550d3c203'}${'&token='}${'38d947dcfec87883f36dc6b182722930a1dbe72fc3a5671a7c34835e3b464b61'}`
      axios.get(uri).then((result) => {
        this.setState({
          organizations: result.data
        })
      })
    }

    handleCreateOrganization(displayName){
      const uri = `${'https://api.trello.com/1/organizations?displayName='}${displayName}`
      axios.post(uri).then((result) => {
        if(result){
          alert("Organization successfully created")
        }
      })
    }

    render(){
        return(
            <Container style={{backgroundColor: '#FFF'}}>
                <Content style={styles.content}>
                    <View>
                        <Text style={styles.display}>Display Name</Text>
                    </View>
                    <Item regular style={styles.item1}>
                        <Input placeholder='Input Your Organization Name'placeholderTextColor="#dfe6e9" />
                    </Item>
                    <Button block style={styles.button1} style={{backgroundColor: '#026aa7'}} onPress={this.handleCreateOrganization()}>
                        <Text>Create New Organization</Text>
                    </Button>
                    <View style = {styles.lineStyleLeft} />
                    <Text style={styles.or}>OR</Text>
                    <View style = {styles.lineStyleRight} />
                    <Text style={styles.choose}>Choose One</Text>
                    <Card>
                      {this.state.organizations.map((organization) => (
                        <CardItem key={organization.id}>
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
    item1: {
        marginTop: 15,
    },
    button1: {
        padding: 20,
        marginTop: 20,
        backgroundColor: '#74b9ff'
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
    },
    activeMember: {
        alignSelf: 'flex-end',
    },
    btnAdd: {
        alignSelf: 'flex-end',
    }
});
