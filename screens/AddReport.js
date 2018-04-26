import React,{Component} from 'react'
import {
    Container,
    Header,
    Content,
    Left,
    Body,
    Right,
    Title,
    Text,
    Button,
    Form,
    Label,
    Input,
    Textarea,
    Icon,
    Footer,
    FooterTab
} from 'native-base'

import {
    View,
    StyleSheet
} from 'react-native'

import CardTrello from '../components/CardTrello'

export default class AddReport extends Component{
    
    render(){
        return(
        <Container style={{backgroundColor: '#FFF'}}>
            <Header>
                <Left>
                    <Button transparent>
                        <Icon name='arrow-back' />
                    </Button>
                </Left>
                <Body>
                    <Title>Add Report</Title>
                </Body>
                <Right>
                    <Button transparent onPress={() =>
                        this.props.navigation.navigate('ReportDetail')}>
                        <Text>Save</Text>
                    </Button>
                </Right>
            </Header>
            <Content style={styles.container}>
                <Form>
                    <View style={styles.itemForm}>
                        <Label>Title *</Label>
                        <Input style={styles.inputForm}></Input>
                    </View>
                    <View style={styles.itemForm}>
                        <Label>What did you do yesterday ? *</Label>
                        <CardTrello/>
                    </View>
                    <View style={styles.itemForm}>
                        <Label>What did you do today ? *</Label>
                        <CardTrello/>
                    </View>
                    <View style={styles.itemForm}>
                        <Label>Note</Label>
                        <Textarea rowSpan={5} bordered style={styles.textareaForm}/>
                    </View>
                </Form>
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
    container: {
        marginTop: 15
    },
    itemForm: {
        marginTop: 5,
        marginLeft: 10,
        marginRight: 10
    },
    inputForm: {
        flex: 1,
        borderColor: 'black',
        borderWidth: 1,
        marginTop: 10,
        marginRight: 20,
        padding: 0,
        height: 40
    },
    textareaForm: {
        borderColor: 'black',
        borderWidth: 1
    },
    footerTabsColor:{
        backgroundColor: '#026aa7'
    },
    footerInactiveTab:{
        color: '#ffffff'
    }
})