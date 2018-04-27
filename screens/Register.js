import React, { Component } from 'react';
import { View, StyleSheet,Image, AsyncStorage } from 'react-native';
import { backendlessConfigurations } from '../config'
import axios from 'axios'
import {
    Container,Content,Left,
    Body,Right,Form,Item,
    Input,Label,Button,
    Text,Icon,CardItem, Spinner
} from 'native-base';

export default class Register extends Component{

    // Require state
    state = {
        Email : '',
        ValidEmail : '',
        EmailColor: 'red',

        Password : '',
        ValidPassword : '',
        PasswordColor: 'red',

        Retype: '',
        ValidRetype: '',
        RetypeColor: 'red',

        fullName: '',
        isPressed: false
    }

    // Email validator function
    validateEmailAddress(EmailAddress){
        const regexs = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        return regexs.test(EmailAddress);
    }

    // Password validator function
    validatePassword(Password){
        if(Password.length >= 8 || Password >= 16){
            return true
        }else{
            return false
        }
    }

    // Retyped Password Validator function
    validateRetypedPassword(Password,Retype){
        if(Password === Retype){
            return true
        }else{
            return false
        }
    }

    componentDidMount(){
      AsyncStorage.getItem('userToken', (error, result) => {
        if(result){
          this.props.navigation.navigate('Organization')
        }
      });
    }

    // Register function
    register(){
      // Backendless api uri to store resgistration from user
      const backendlessApi = backendlessConfigurations.USERS;
      this.setState({isPressed : true})
      axios.post(backendlessApi,{"email" : this.state.Email, "password" : this.state.Password}).then((result) => {
        // If result data has data
        if(result.data){
          // Then redirect to login form to perform login
          alert("Registration successfully")
          this.setState({isPressed: false})
          this.props.navigation.navigate('Login')
        }
      })
    }

    render(){
        return(
          <Container style={{backgroundColor: '#ffffff'}}>
              <Content>
                  <View style={styles.logo}>
                      <Image
                          source={require('../assets/images/logo.png')}
                          style={{resizeMode: 'contain',height: 150,}}/>
                  </View>
                  <Form style={styles.lblform}>
                      <View style={styles.itemForm}>
                          <Label style={{paddingTop: 5}} >Email</Label>
                          <Item regular>
                              <Input onChangeText={(text) =>
                                this.validateEmailAddress(text) ?
                                this.setState({ValidEmail:'check',EmailColor:'green',Email:text}) :
                                this.setState({ValidEmail:'cross',EmailColor:'red',Email:text})}
                                placeholder="Input your email"
                                placeholderTextColor='#dfe6e9'/>
                            <Icon name={this.state.ValidEmail} type="Entypo" style={{color:this.state.EmailColor}}/>
                          </Item>
                      </View>
                      <View style={styles.itemForm}>
                          <Label style={{marginTop: 5}}>Password</Label>
                          <Item regular>
                              <Input secureTextEntry={true} onChangeText={(text) =>
                                this.validatePassword(text) ?
                                this.setState({ValidPassword:'check',PasswordColor:'green',Password:text}) :
                                this.setState({ValidPassword:'cross',PasswordColor:'red',Password:text})}
                                placeholder="Input your password"
                                placeholderTextColor='#dfe6e9'/>
                            <Icon name={this.state.ValidPassword} type="Entypo" style={{color:this.state.PasswordColor}}/>
                          </Item>
                      </View>
                      <View style={styles.itemForm}>
                          <Label style={{marginTop: 5}}>Confirm your password</Label>
                          <Item regular>
                              <Input secureTextEntry={true} onChangeText={(text) =>
                                this.validateRetypedPassword(this.state.Password,text) ?
                                this.setState({ValidRetype:'check',RetypeColor:'green',Retype:text}) :
                                this.setState({ValidRetype:'cross',RetypeColor:'red',Retype:text})}
                                placeholder="Input your password again"
                                placeholderTextColor='#dfe6e9'/>
                            <Icon name={this.state.ValidRetype} type="Entypo" style={{color:this.state.RetypeColor}}/>
                          </Item>
                      </View>
                      <View style={styles.itemForm}>
                          {this.state.isPressed ? (
                            <Spinner color="blue"/>
                          ) : (
                            <Button block style={styles.buttonStyle} onPress={()=> this.register()}>
                                <Text>Register</Text>
                            </Button>
                          )}
                          <Button transparent block info onPress={() => this.props.navigation.navigate('Login')} style={{margin:10}}>
                              <Text>Already have an account? Log in!</Text>
                          </Button>
                      </View>
                  </Form>
              </Content>
          </Container>
        );
    }
}

const styles = StyleSheet.create({
    imageStyle:{
      marginTop: 20,
      flex: 1,
      justifyContent: 'center',
      alignSelf:'center',
      backgroundColor:'transparent',
      height: 150,
      resizeMode: 'contain',
      backgroundColor: '#ffffff'
    },
    buttonStyle:{
      marginTop: 15,
      backgroundColor: '#026aa7'
    },
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
    inputForm: {
        flex: 1,
        borderColor: 'black',
        borderWidth: 1,
        marginTop: 10,
        padding: 0,
        height: 40
    },
})
