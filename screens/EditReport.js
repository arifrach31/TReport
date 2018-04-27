import React,{Component} from 'react'
import {
    Container, Header, Content,
    Left, Body, Right,
    Title, Text, Button,
    Form, Label, Input,
    Textarea, Icon, Footer,
    FooterTab
} from 'native-base'
import { View, StyleSheet } from 'react-native'
import axios from 'axios'
import CardTrello from './CardTrello'

const uri = 'https://api.backendless.com/954ED070-DAB6-29F9-FFC1-65B7C3AA0300/29456C43-95C4-0639-FFD1-D80284025400'

export default class EditReport extends Component{
    
   state = {
    report: {},
    reportCards: [],
    cards: []
  }

  allReportCards(){
    const {id} = this.props.navigation.state.params
    // alert(id)
    axios.get(`${uri}/data/report_cards?where=report.objectId%3D'${id}'&loadRelations=report`).then((result)=>{
        this.setState({
            reportCards: result.data
        })
    })
  }

  allReports(){
    const {id} = this.props.navigation.state.params
    axios.get(`${uri}/data/reports/${id}`).then(result=>{
        this.setState({
            report: result.data,
        })
    })
  }

  componentDidMount(){
    this.allReports(),
    this.allReportCards()
  }

    render(){
        return(
        <Container>
            <Header>
                <Left>
                    <Button transparent>
                        <Icon name='arrow-back' />
                    </Button>
                </Left>
                <Body>
                    <Title>Edit Report</Title>
                </Body>
                <Right>
                    <Button transparent onPress={() =>
                        this.props.navigation.navigate('Reports')}>
                        <Text>Save</Text>
                    </Button>
                </Right>
            </Header>
            <Content style={styles.container}>
                {this.state.reportCards.map((reportCard)=>(
                    <View key={reportCard.objectId}>
                        <Text>{reportCard.trello_card_id}</Text>
                    </View>
                 ))}
                <Form>
                    <View style={styles.itemForm}>
                        <Label>Title *</Label>
                        <Input onChangeText={title=> this.setState({ report: {...this.state.report, title} })} style={styles.inputForm} value={this.state.report.title}></Input>
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