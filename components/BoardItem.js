import React, {Component} from 'react';
import {List, ListItem, Text, Button, CardItem, Card} from 'native-base';
import {ImageBackground, TouchableOpacity,AsyncStorage, StyleSheet} from 'react-native'
import {trelloConfigurations, backendlessConfigurations} from '../config';
import axios from 'axios';

export default class TrelloBoards extends Component{

  state = {
    boards: []
  }

  allBoards(){
    axios.get(`https://api.trello.com/1/organizations/5ad3542add079f4549ce32ea/boards?key=0a5393e0cda60d506290ca411d6d7667&token=4158254e3c7ed15bc4d72b1e40987413de392255e7815d0ae07a74afce8ddcb1`).then((result)=>{
      this.setState({
        boards: result.data
      })
    })
  }

  componentDidMount(){
    this.allBoards()
  }

  //state = {
  //  boards:[]
  //}


  //fetchAll(data, orgId){
  //  const {trelloApiKey, trelloTokenKey} = data;
  //  const uri = `${trelloConfigurations.TRELLO_SERVER_URL}${'organizations'}${'/'}${orgId}${'/'}${'boards?filter=all&fields=all'}${'&key='}${trelloApiKey}${'&token='}${trelloTokenKey}`
  //  axios.get(uri).then((result) => {
  //    this.setState({
  //      boards: result.data
  //    })
  //  })
  //}
  // Fetch admin credential like trelloApiKey telloaTokenKey and orga
  // which will used to fetch response JSON from trello API
  //fetchAdminCredentials(){
  //  AsyncStorage.multiGet(['userToken', 'objectID', 'orgId'], (error, result) => {
  //    if(result){
  //      const uri = `${backendlessConfigurations.USERS}${'/'}${result[1][1]}`
  //      axios.get(uri).then((res) => {
  //        this.fetchAll(res.data, result[2][1]);
  //      })
  //    }
  //  })
  //} 

  render(){
    return(
      <List>
        {this.state.boards.map((board) => (
          <TouchableOpacity key={board.id} onPress={()=> this.props.navigation.navigate('ReportDetail',{id: board.id})}>
            <Card>
              <CardItem cardBody>
                {board.prefs.backgroundImage !== null?
                (<ImageBackground source={{uri: board.prefs.backgroundImage}} style={styles.boardImageBackground}>
                  <Text style={styles.boardFont}>{board.name}</Text>
                </ImageBackground>)
                :
                (<ImageBackground style={{height: 100, width: null, flex: 1, backgroundColor: board.prefs.backgroundTopColor}}>
                  <Text style={styles.boardFont}>{board.name}</Text>
                </ImageBackground>)}
              </CardItem>
            </Card>
          </TouchableOpacity>
        ))}
      </List>
    );
  }
}

const styles = StyleSheet.create({
  content: {
    padding: 20
  },
  boardImageBackground: {
    height: 100,
    width: null,
    flex: 1
  },
    boardFont: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 10
  }
})