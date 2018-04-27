import React, { Component } from 'react';
import { SectionList, View, Text,StyleSheet, TouchableOpacity} from 'react-native';
import {
    Container,
    Header,
    Content,
    Left,
    Body,
    Right,
    Title,
    Subtitle,
    Button,
    Icon,
    Footer,
    Thumbnail,
    FooterTab,
    Card,
    CardItem
} from 'native-base';


import axios from 'axios';
import moment from 'moment';
import { trelloConfigurations, backendlessConfigurations } from '../config';

import getDateSections from './getDateSections'

export default class Test extends Component {
    
    state = {
        section: [],
        boards: []
    }


    Boards(){
        axios.get(`${trelloConfigurations.TRELLO_SERVER_URL}/boards/bD5pFONf?fields=id,name,idOrganization,dateLastActivity&lists=open&list_fields=id,name&key=0a5393e0cda60d506290ca411d6d7667&token=4158254e3c7ed15bc4d72b1e40987413de392255e7815d0ae07a74afce8ddcb1`).then((result)=>{
            this.setState({
                boards: result.data
            })
        })
    }

    Reports(){
        axios.get(`${backendlessConfigurations.REPORTS}?sortBy=created%20desc`).then((reports) => {
           this.setState({ 
                section: getDateSections(reports.data, ['updated', 'created', 'objectId'])
            })
       })
    }

    componentDidMount(){
        this.Boards()
        this.Reports()
    }

    render(){

        const { name } = this.state.boards

        return(
            <Container>             
                <Content style={{padding: 20, paddingTop:-100}}>
                  <SectionList
                        renderSectionHeader={({ section: {created}}) => (
                        <Text style={styles.dateTime}>{moment(created).format('MMMM YYYY')}</Text>
                        )}
                        renderItem={({item, index, section}) => (
                        <TouchableOpacity button onPress={()=> this.props.navigation.navigate('RouteFetchTrelloEditReport',{id: item.objectId})}>
                            <Card key={item.objectId}>
                                <View>
                                    <CardItem>
                                        <Text>{moment(item.created).format('ll, LT')}</Text>
                                    </CardItem>
                                    <CardItem header>
                                       <Text>{item.title}</Text>
                                    </CardItem>
                                    <Right>
                                        <View>
                                            {item.isDone == true ? (

                                            <Icon style={styles.iconGreen} name='ios-checkmark-circle'/>

                                            ):(

                                            <Icon style={styles.iconYellow} name='md-alert'/>

                                            )}
                                        </View>
                                    </Right>
                                </View>
                            </Card>
                        </TouchableOpacity>
                        )}
                        sections={this.state.section}
                        keyExtractor={(item, index) => item + index }
                    />
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
        fontSize: 45 
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
