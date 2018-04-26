import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import {
    Container,Header,Content,
    Footer,FooterTab,Button,
    Icon,Text,Badge,Tabs,
    Tab,TabHeading
} from 'native-base';

import Employees from '../components/Employees';
import Individual from '../components/Individual';

export default class Dashboard extends Component{

    render(){
        return(
            <Container>
                <Content>
                    <Employees {...this.props}/>
                    <Individual {...this.props}/>
                </Content>
                <Footer>
                    <FooterTab style={styles.footerTabsColor}>
                        <Button active vertical onPress={() => this.props.navigation.navigate('Dashboard')}>
                            <Icon type="Entypo" name="area-graph" />
                            <Text>Dashboard</Text>
                        </Button>
                        <Button vertical onPress={() => this.props.navigation.navigate('Reports')}>
                            <Icon name="ios-aperture" style={styles.footerInactiveTab}/>
                            <Text style={styles.footerInactiveTab}>Report</Text>
                        </Button>
                        <Button vertical onPress={() => this.props.navigation.navigate('Settings')}>
                            <Icon name="settings" style={styles.footerInactiveTab}/>
                            <Text style={styles.footerInactiveTab}>Setting</Text>
                        </Button>
                    </FooterTab>
                </Footer>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    footerTabsColor:{
        backgroundColor: '#026aa7'
    },
    footerInactiveTab:{
        color: '#ffffff'
    }
});
