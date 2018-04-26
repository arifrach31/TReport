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

} from 'native-base';

export default class ReportDetail extends Component{
    
    reports = [
        {
            id: 1,
            date: '01 Monday, 10:00 AM',
            title: 'Bug Solving',
            status: 'Done',
            icon: 'checkmark-circle',
            color: 'green'
        },
        {
            id: 2,
            date: '01 Monday, 10:00 AM',
            title: 'Bug Solving',
            status: 'Pending',
            icon: 'alert',
            color: 'yellow'
        },
        {
            id: 3,
            date: '01 Monday, 10:00 AM',
            title: 'Bug Solving',
            status: 'Done',
            icon: 'checkmark-circle',
            color: 'green'
        },
        {
            id: 4,
            date: '01 Monday, 10:00 AM',
            title: 'Bug Solving',
            status: 'Pending',
            icon: 'alert',
            color: 'yellow'
        },
    ]

    render(){
        return(
            <Container style={{backgroundColor: '#FFF'}}>   
                <Header>
                    <Left/>
                    <Body>
                        <Title>Report</Title>
                        <Subtitle>On Project 1</Subtitle>
                    </Body>
                    <Right>
                        <Button transparent onPress={() => this.props.navigation.navigate('AddReport')}>
                            <Icon name='add'/>
                        </Button>
                    </Right>
                </Header>             
                <Content style={{padding: 20, paddingTop:-100}}>
                    <Text style={styles.dateTime}>Jan 2018</Text>
                    {this.reports.map((report)=> (
                        <Card key={report.id}>
                            <View style={{flex:1, flexDirection: 'row', padding: 20}}>
                                <CardItem style={{flex:5, flexDirection: 'column', alignItems: 'flex-start', padding: 30}}>
                                    <Text>{report.date}</Text>
                                    <Text>{report.title}</Text>
                                </CardItem>
                                <CardItem style={{flex:1, flexDirection: 'column', alignItems: 'flex-start', padding: 30}}>
                                    <Icon style={{color: report.color}} name={report.icon}/>
                                </CardItem>
                            </View>
                        </Card>
                    ))}
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