import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import {
    Container,
    Header,
    Content,
    Left,
    Body,
    Right,
    Title,
    Subtitle,
    Text,
    Button,
    Icon,
    Footer,
    Thumbnail,
    FooterTab,
    Card,
    CardItem,
    List,
    ListItem
} from 'native-base';
import axios from 'axios'

const uri = 'https://api.backendless.com/115DC970-7689-C50E-FF6B-5F94AFFFA900/0A3575C9-7BEF-4CBA-FF55-7C5806658300/data'

export default class Report extends Component{

    state = {
        boards: [],
        members: [],
        reports: [],
        lists: []
    }

    allReports(){
        axios.get(`${uri}/report`).then((result)=>{
            this.setState({
                reports: result.data
            })
        })
    }

    allBoards(){
        const {id} = this.props.navigation.state.params
        axios.get(`https://api.trello.com/1/boards/${id}?fields=id,name,idOrganization,dateLastActivity&lists=open&list_fields=id,name&key=0a5393e0cda60d506290ca411d6d7667&token=4158254e3c7ed15bc4d72b1e40987413de392255e7815d0ae07a74afce8ddcb1`).then((result)=>{
            this.setState({
                boards: result.data
            })
        })
    }

    boardMembers(){
        const {id} = this.props.navigation.state.params
        axios.get(`https://api.trello.com/1/boards/${id}/members?key=0a5393e0cda60d506290ca411d6d7667&token=4158254e3c7ed15bc4d72b1e40987413de392255e7815d0ae07a74afce8ddcb1`).then((result)=>{
            this.setState({
                members: result.data
            })
        })
    }

    boardLists(){
        const {id} = this.props.navigation.state.params
        axios.get(`https://api.trello.com/1/boards/${id}/lists?key=0a5393e0cda60d506290ca411d6d7667&token=4158254e3c7ed15bc4d72b1e40987413de392255e7815d0ae07a74afce8ddcb1`).then((result)=>{
            this.setState({
                lists: result.data
            })
        })
    }

    componentDidMount(){
        this.allBoards(),
        this.boardMembers(),
        this.allReports(),
        this.boardLists()
    }

    render(){
        const { name } = this.state.boards
        return(
            <Container style={{backgroundColor: '#FFF'}}>   
                <Header>
                    <Left/>
                    <Body>
                        <Title style={{alignSelf: 'center'}}>Member</Title>
                        <Subtitle style={{alignSelf: 'center'}}>Of {name}</Subtitle>
                    </Body>
                    <Right>
                        <Button transparent onPress={() => this.props.navigation.navigate('AddReport')}>
                            <Icon name='add'/>
                        </Button>
                    </Right>
                </Header>             
                <Content style={{padding: 20, paddingTop:-100}}>
                    <Text style={styles.dateTime}>Jan 2018</Text>
                    {this.state.lists.map((list)=> (
                        <Card key={list.id}>
                            <View style={{flex:1, flexDirection: 'row', padding: 20}}>
                                <CardItem style={{flex:5, flexDirection: 'column', padding: 30}} button onPress={()=> this.props.navigation.navigate('RouteFetchTrelloCard',{id: list.id})}>
                                    <Text>01 Monday, 10.00 AM</Text>
                                    <Text>{list.name}</Text>
                                </CardItem>
                                <CardItem style={{flex:1, flexDirection: 'column', padding: 30}}>
                                     <Icon style={{color: 'green'}} name='checkmark-circle'/>  
                                </CardItem>
                            </View>
                        </Card>
                    ))}
                    <View style={{marginTop: 40}}>
                        <Text>Total List : {this.state.lists.length}</Text>
                        <Text>Total Member : {this.state.members.length}</Text>
                        <Text>{name} Member</Text>
                    </View>
                    <Card> 
                        {this.state.members.map((member)=>(
                            <CardItem key={member.id}>
                                <Body>
                                    <Text>{member.fullName}</Text>
                                </Body>
                            </CardItem>
                        ))}
                    </Card>
                </Content>
                <Footer>
                    <FooterTab style={styles.footerTabsColor}>
                        <Button vertical onPress={() => this.props.navigation.navigate('Dashboard')}>
                            <Icon type="Entypo" name="area-graph" style={styles.footerInactiveTab}/>
                            <Text style={styles.footerInactiveTab}>Dashboard</Text>
                        </Button>
                        <Button active vertical onPress={() => this.props.navigation.navigate('Reports')}>
                            <Icon name="ios-aperture"/>
                            <Text>Report</Text>
                        </Button>
                        <Button vertical onPress={() => this.props.navigation.navigate('Settings')}>
                            <Icon name="settings" style={styles.footerInactiveTab}/>
                            <Text style={styles.footerInactiveTab}>Setting</Text>
                        </Button>
                    </FooterTab>
                </Footer>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    iconYellow: {
        color: '#f1c40f', 
        marginTop: -70, 
        marginLeft: 220, 
        fontSize: 45
    },
    iconGreen: {
        color: '#2ecc71', 
        marginTop: -70, 
        marginLeft: 220, 
        fontSize: 45,
    },
    dateTime: {
        padding: 10,
        alignSelf: 'center'
    },
    footerTabsColor:{
        backgroundColor: '#026aa7'
    },
    footerInactiveTab:{
        color: '#ffffff'
    }
})