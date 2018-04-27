import React, {Component} from 'react';
import {List, ListItem, Text, Button, CardItem, Card} from 'native-base';
import {ImageBackground, TouchableOpacity,AsyncStorage} from 'react-native'
import {trelloConfigurations, backendlessConfigurations} from '../config';
import axios from 'axios';

export default class TrelloBoards extends Component{

  state = {
    boards:[]
  }


  fetchAll(data, orgId){
    const {trelloApiKey, trelloTokenKey} = data;
    const uri = `${trelloConfigurations.TRELLO_SERVER_URL}${'organizations'}${'/'}${orgId}${'/'}${'boards?filter=all&fields=all'}${'&key='}${trelloApiKey}${'&token='}${trelloTokenKey}`
    axios.get(uri).then((result) => {
      this.setState({
        boards: result.data
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

  componentWillMount(){
    this.fetchAdminCredentials()
  }

  render(){
    return(
      <List>
        {this.state.boards.map((board) => (
          <TouchableOpacity key={board.id} onPress={()=>alert('You choose '+ board.name)}>
            <Card>
              <CardItem cardBody>
                {board.prefs.backgroundImage !== null?
                (<ImageBackground source={{uri: board.prefs.backgroundImage}} style={{height: 100, width: null, flex: 1}}>
                  <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 20}}>{board.name}</Text>
                </ImageBackground>)
                :
                (<ImageBackground style={{height: 100, width: null, flex: 1, backgroundColor: board.prefs.backgroundTopColor}}>
                  <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 20}}>{board.name}</Text>
                </ImageBackground>)}
              </CardItem>
            </Card>
          </TouchableOpacity>
        ))}
      </List>
    );
  }
}