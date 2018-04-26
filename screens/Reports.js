import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { 
    Container, 
    Header, 
    Content, 
    Footer, 
    FooterTab, 
    Button, 
    Icon, 
    Text, 
    Badge,
    Tabs,
    Tab,
    TabHeading
} from 'native-base';

import BoardItem from '../components/BoardItem'

export default class Home extends Component{
    
    render(){
        return(
            <Container>       
                <Content>
                    <BoardItem navigation={this.props.navigation}/>
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