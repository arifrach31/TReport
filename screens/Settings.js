import React,{Component} from 'react'
import {
    Container,
    Header,
    Content,
    Left,
    Body,
    Right,
    Text,
    Title,
    Form,
    Item,
    Input,
    Label,
    Button,
    Icon,
    Textarea,
    List,
    ListItem,
    Radio,
    Card,
    CardItem,
    Footer,
    FooterTab
} from 'native-base'
import {
    Image,
    View,
    StyleSheet
} from 'react-native'

import axios from 'axios'

import {backendlessConfigurations, trelloConfigurations} from '../config/index';

// Hardcode set idMember and idUser
const idMember = 'azharrizkip'
const idUser = '1F84DC29-1607-C88B-FFF8-4E7812127400'

export default class AddReport extends Component{

    state = {
        // Initial Local State
        user: {},
        organizations: [],
        button: 'Save',
        members: []
    }

    allSettings(){
        // GET single data user from API Backendless
        axios.get(`${backendlessConfigurations.BACKENDLESS_SERVER}/users/${idUser}`).then(result=>{
          this.setState({
            user: result.data,
          })
        })
    }

    getMember(){
        // GET single data member from API Trello
        axios.get(`${trelloConfigurations}/members/${idMember}`).then(result=>{
            // set state members to return result.data
            this.setState({
                members: result.data,
            })
        })
    }

    componentDidMount(){
        // GET method allSettings(), getMember()
        this.allSettings()
        this.getMember()

        // GET data All organizations from API Trello
        axios.get(`${trelloConfigurations.TRELLO_SERVER_URL}/members/${idMember}/organizations?filter=all&fields=displayName`).then(result=>{
            // set state organizations to return result.data
            this.setState({
              organizations: result.data
            })
          })
    }

    updateSettings(){
        // PUT data by id into API Trello
        axios
            .put(`${backendlessConfigurations.BACKENDLESS_SERVER}/users/${idUser}`, this.state.user)
            .then(result=>{

                // If success, get latest data from API
                if(result.data){
                    this.allSettings()
                    alert('sukses')
                }
            })
    }
    

    render(){
        return(
            <Container style={{backgroundColor: '#FFF'}}>
                <Header style={{backgroundColor: '#026aa7'}}>
                    <Left/>
                    <Body>
                        <Title style={{color: '#fff'}}>Settings</Title>
                    </Body>
                    <Right>
                        <Button transparent onPress={()=> this.updateSettings()}>
                            <Text style={{color: '#fff'}}>{this.state.button}</Text>
                        </Button>
                    </Right>
                </Header>
                <Content style={styles.container}>
                    <View style={styles.profile}>
                        <View style={styles.imageProfile}>
                            <Image source={{uri: 'https://cdn3.iconfinder.com/data/icons/black-easy/512/538642-user_512x512.png'}} style={{height: 50, width: 50, flex: 1}}/>
                        </View>
                        <View style={styles.accountProfile}>
                            <Text style={styles.accountName}>Trello Report</Text>
                            <Text style={styles.accountMail}>{this.state.members.email}</Text>
                        </View>
                    </View>
                    <Form>
                        <View style={styles.itemForm}>
                            <Label>Trello API Key</Label>
                            <Input 
                                // disabled={this.state.edit? true:false}
                                style={styles.inputForm}
                                onChangeText={
                                    trelloApiKey=> this.setState({ user: {...this.state.user, trelloApiKey} })
                                }
                                value={this.state.user.trelloApiKey}
                            />
                        </View>
                        <View style={styles.itemForm}>
                            <Label>Trello API Secret</Label>d
                            <Input 
                                // disabled={this.state.edit? true:false}
                                style={styles.inputForm}
                                onChangeText={
                                    trelloTokenKey=> this.setState({ user: {...this.state.user, trelloTokenKey} })
                                }
                                value={this.state.user.trelloTokenKey}
                            />
                        </View>
                        <View style={styles.itemForm}>
                            <Text style={styles.organizationName}>TrelloReport</Text>
                            <Label>Organization Member</Label>
                            <Card style={styles.card}>
                                {this.state.organizations.map((org)=> (
                                    <CardItem key={org.id} button onPress={() => this.props.navigation.navigate('Organization')}>
                                        <Body>
                                            <Text>{org.displayName}</Text>
                                        </Body>
                                    </CardItem>
                                ))}
                            </Card>
                        </View>
                    </Form>
                </Content>
                <Footer>
                    <FooterTab style={styles.footerTabsColor}>
                        <Button vertical onPress={() =>
                            this.props.navigation.navigate('Dashboard')}>
                            <Icon type="Entypo" name="area-graph" style={styles.footerInactiveTab} />
                            <Text style={styles.footerInactiveTab}>Dashboard</Text>
                        </Button>
                        <Button vertical onPress={() =>
                            this.props.navigation.navigate('Reports')}>
                            <Icon name="ios-aperture" style={styles.footerInactiveTab}/>
                            <Text style={styles.footerInactiveTab}>Report</Text>
                        </Button>
                        <Button active vertical onPress={() =>
                            this.props.navigation.navigate('Settings')}>
                            <Icon name="settings"/>
                            <Text >Setting</Text>
                        </Button>
                    </FooterTab>
                </Footer>
            </Container>
        )
    }
}
const styles = StyleSheet.create({
    profile: {
        margin: 20,
        flex: 1,
        flexDirection: 'row'
    },
    imageProfile: {
        borderColor: 'black',
        borderWidth: 1,
        marginRight: 15,
        padding: 5
    },
    accountName: {
        marginBottom: 10,
        fontWeight: 'bold'
    },
    itemForm: {
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10
    },
    inputForm: {
        borderColor: 'black',
        borderWidth: 1,
        marginTop: 10,
        marginRight: 20,
        padding: 0,
        height: 40
    },
    card: {
        marginTop: 10,
        marginRight: 20,
        borderColor: 'black',
        borderWidth: 1,
    },
    organizationName: {
        fontWeight: 'bold'
    },
    activeMember: {
        alignSelf: 'flex-end',
    },
    footerTabsColor:{
        backgroundColor: '#026aa7'
    },
    footerInactiveTab:{
        color: '#ffffff'
    }
})