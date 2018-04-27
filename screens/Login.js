import React, { Component } from 'react';
import {View, StyleSheet, Image, AsyncStorage} from 'react-native';
import {
    Container,
    Content,
    Text,
    Form,
    Label,
    Input,
    Button,
    Item,
    Spinner
} from 'native-base';

import axios from 'axios';

const loginuri = 'https://api.backendless.com/954ED070-DAB6-29F9-FFC1-65B7C3AA0300/29456C43-95C4-0639-FFD1-D80284025400'

export default class Login extends Component{

     
    state = {
        entry: [],
        txtEmail: '',
        txtPass: '',
        loading: false
    }

    componentDidMount(){

        AsyncStorage.multiGet(['userToken', 'objectID', 'email'], (error, result) => {
            if (result) {

                if(result[0][1] !== null){
                    this.props.navigation.navigate('Organization')
                }

            }
        });

    }

    LoginNow(){
        let email = this.state.txtEmail
        let pass = this.state.txtPass
        // let token = this.state.userToken


        this.setState({
            loading:true
        })
        
        axios.post(`${loginuri}/users/login`, {
         "login":email,
         "password":pass
            } ).then(result => {

                AsyncStorage.multiSet([['userToken', result.data['user-token']],['objectID', result.data.objectId],['email', email]])

               
                this.setState({
                    loading: false
                })

                this.props.navigation.navigate('Organization')
                    

            }).catch((e)=>{
                alert(e.response.data.message)
                this.setState({
                        loading: false
                    })
            })
    }

    render(){
        return(
            <Container style={{backgroundColor: '#ffffff'}}>
                <Content>
                    <View style={styles.logo}>
                        <Image 
                            source={require('../assets/images/logo.png')} 
                            style={{resizeMode: 'contain',height: 250,}}
                        />
                    </View>
                    <Form>
                        <View style={styles.itemForm}>
                            <Label style={{marginTop:5}}>Email</Label>
                            <Item regular>
                                <Input 
                                placeholder="Input Your Email" 
                                placeholderTextColor='#D0D0D0'
                                onChangeText={(txtEmail) => this.setState({txtEmail})}
                                />
                            </Item>
                        </View>
                        <View style={styles.itemForm}>
                            <Label style={{marginTop:5}}>Password</Label>
                            <Item regular>
                                <Input 
                                style={styles.inputForm}
                                secureTextEntry={true} 
                                placeholder="Input your password" 
                                placeholderTextColor='#D0D0D0' 
                                onChangeText={(txtPass) => this.setState({txtPass})}
                                />
                            </Item>
                        </View>
                        <View style={styles.itemForm}>
                            {this.state.loading == true  ? (<Spinner color='blue' />) : null}
                            {this.state.loading == !true ? (
                                <Button block onPress={() => this.LoginNow()} style={{backgroundColor: '#026aa7'}}>
                                    <Text>Login</Text>
                                </Button>
                            ): null}
                            <Button transparent info block onPress={() => this.props.navigation.navigate('Register')}>
                                <Text>Don't have account ? Register</Text>
                            </Button>
                        </View>
                    </Form>
                </Content>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    logo: {
        marginTop: 20,
        flex: 1,
        justifyContent: 'center',
        alignSelf: 'center',
        backgroundColor: '#ffffff'
    },
    itemForm: {
        marginTop: 15,
        marginLeft: 30,
        marginRight: 30
    },
})