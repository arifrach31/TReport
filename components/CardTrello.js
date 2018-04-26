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

export default class CardTrello extends Component{
    
    render(){
        return(
            <View>
                <Picker
                    iosHeader="Select one"
                    mode="dropdown"
                    placeholder="Card Trello API"
                    style={styles.pickerForm}
                    >
                    <Picker.Item label="Wallet" value="key0" />
                    <Picker.Item label="ATM Card" value="key1" />
                </Picker>
                <Picker
                    iosHeader="Select one"
                    mode="dropdown"
                    placeholder="Card Trello API"
                    style={styles.pickerForm}
                    >
                    <Picker.Item label="Wallet" value="key0" />
                    <Picker.Item label="ATM Card" value="key1" />
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