import React,{Component} from 'react'
import {
    Picker,
    Button,
    Text,
    Icon
} from 'native-base'
import {
    View,
    StyleSheet
} from 'react-native'
import axios from 'axios'

const uri = 'https://api.trello.com/1/lists/5ad35eb50850d4e675ece39d/cards?key=0a5393e0cda60d506290ca411d6d7667&token=4158254e3c7ed15bc4d72b1e40987413de392255e7815d0ae07a74afce8ddcb1'

export default class CardTrello extends Component{
        
    state = {
        cards: [],
        name: ""
    }

    allCards(){
        axios.get(`${uri}`).then((result)=>{
            this.setState({
                cards: result.data
            })
        })
    }

    componentDidMount(){
        this.allCards()
    }

    render(){
        return(
            <View>
                <Picker
                    iosHeader="Select one"
                    mode="dropdown"
                    placeholder="Card Trello API"
                    style={styles.pickerForm}
                    selectedValue={this.state.language}
                    onValueChange={(itemValue, itemIndex) => this.setState({language: itemValue})} >
                    {this.state.cards.map((card)=>(
                        <Picker.Item label={card.name} value={card.name} key={card.id}/>
                    ))}
                </Picker>
                <Button iconRight transparent style={styles.btnAdd}>
                    <Text>Add Card</Text>
                    <Icon name='add-circle' />
                </Button>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    pickerForm: {
        flex: 1,
        borderColor: 'black',
        borderWidth: 1,
        marginTop: 10,
        marginRight: 20,
        padding: 0,
        height: 40,
        alignSelf: 'stretch'
    },
    btnAdd: {
        alignSelf: 'flex-end',
    }
})