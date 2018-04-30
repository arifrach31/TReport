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
    Picker,
    Footer,
    FooterTab
} from 'native-base'

import {
    View,
    StyleSheet
} from 'react-native'

import CardTrello from '../components/CardTrello'

import axios from 'axios'

import {backendlessConfigurations, trelloConfigurations} from '../config/index';


export default class AddReport extends Component{

    state = {
        // Initial Local State
        title: '',
        note: '',
        isDone: false,
        
        cards: [],
        reportCards: [],

        cardOptions: [
            {
                id: 1,
            }
        ],
        selected: undefined
    }

    allCards(){
        // GET data All Cards from API Trello
        axios.get(`${trelloConfigurations.CARDS}`).then((result)=>{
            // set state cards to return result.data
            this.setState({
              cards: result.data
            })
        })
    }
    componentDidMount(){
        // get method allCards() 
        this.allCards()
    }
    onValueChangeYesterday(value: string) {
        // set state selected value
        this.setState({
            reportCards: {
                trelloCardId: value,
                type: 'Yesterday',
            }
        });
    }
    onValueChangeToday(value: string) {
        // set state selected value
        this.setState({
            reportCards: {
                trelloCardId: value,
                type: 'Today',
            }
        });
    }
    buttonInc(){
        // declaration state
        let cardOptions = this.state.cardOptions;
        let counter = this.state.counter + 1

        // push id to array of obj
        cardOptions.push({
            id: counter
        })

        // set state newPicker components
        this.setState({
            cardOptions,
            counter
        })
    }

    handleAddReport(){
        // Initial constanta to get state value
        const dataReportCard = {
            ...this.state.data,
            trelloCardId: this.state.reportCards.trelloCardId,
            type: this.state.reportCards.type
        }

        // Initial constanta to get state value
        const dataReports = {
            ...this.state.data,
            title: this.state.title,
            isDone: this.state.isDone,
            note: this.state.note
        }

        // Hardcode reportRelation post to reports tabel
        const reportRelation = ['379D417E-3D88-DE60-FF15-854895614700'];
        
        // Axios post table reportCards from constanta value
        axios
            .post(`${backendlessConfigurations.BACKENDLESS_SERVER}/reportCards`, dataReportCard)
            .then(result=>{
                if(result.data){
                    // if result.data == true
                    axios
                        // Axios post set relation one to one table report and report from objectId 
                        .post(`${backendlessConfigurations.BACKENDLESS_SERVER}/reportCards/${result.data.objectId}/report:reports:1`, reportRelation)
                        .then(result2=>{
                            if(result2.data){
                                axios
                                // Axios post table reports from constanta value
                                    .post(`${backendlessConfigurations.BACKENDLESS_SERVER}/reports`, dataReports)
                                    .then(result3=>{
                                        if(result3.data){
                                            // Navigate to Report Detail
                                            this.props.navigation.navigate('ReportDetail')
                                        }
                                    })
                                }
                            })
                }
            })

        // axios
        //     .post(`${backendlessConfigurations.BACKENDLESS_SERVER}/reports`, {
        //         
        //     })
        //     .then(result=>{
        //         //if success, get latest data from API
        //         if(result.data){
        //             this.props.navigation.navigate('Reports')
        //         }
        // })
    }
    
    render(){
        return(
        <Container style={{backgroundColor: '#FFF'}}>
            <Header style={{backgroundColor: '#026aa7'}}>
                <Left>
                    <Button transparent>
                        <Icon name='arrow-back' style={{color: '#fff'}}/>
                    </Button>
                </Left>
                <Body>
                    <Title style={{color: '#fff'}}>Add Report</Title>
                </Body>
                <Right>
                    <Button transparent onPress={() =>
                        this.handleAddReport()}>
                        <Text style={{color: '#fff'}}>Save</Text>
                    </Button>
                </Right>
            </Header>
            <Content style={styles.container}>
                <Form>
                    <View style={styles.itemForm}>
                        <Label>Title *</Label>
                        <Input 
                            style={styles.inputForm}
                            onChangeText={
                                title=> this.setState({title})
                            }
                            value={this.state.title}
                            placeholder="Title Report"
                        />
                    </View>
                    <View style={styles.itemForm}>
                        <Label>What did you do yesterday ? *</Label>
                        <View>
                
                            {this.state.cardOptions.map((cardOption)=> (
                                <View key={cardOption.id}>
                                    <Picker
                                        iosHeader="Select Cards"
                                        mode="dropdown"
                                        placeholder="Card Trello API"
                                        style={styles.pickerForm}
                                        selectedValue={this.state.reportCards.trelloCardId}
                                        onValueChange={this.onValueChangeYesterday.bind(this)}
                                    >
                                        {this.state.cards.map((card)=> (
                                            <Picker.Item label={card.name} value={card.id} key={card.id}/>
                                        ))} 
                                    </Picker>
                                </View>
                            ))}
                            
                            <Button iconRight transparent style={styles.btnAdd} onPress={()=> this.buttonInc()}>
                                <Text>Add Card</Text>
                                <Icon name='add-circle' />
                            </Button>
                        </View>
                    </View>
                    <View style={styles.itemForm}>
                        <Label>What did you do today ? *</Label>
                        <View>
                
                            {this.state.cardOptions.map((cardOption)=> (
                                <View key={cardOption.id}>
                                    <Picker
                                        iosHeader="Select Cards"
                                        mode="dropdown"
                                        placeholder="Card Trello API"
                                        style={styles.pickerForm}
                                        selectedValue={this.state.reportCards.trelloCardId}
                                        onValueChange={this.onValueChangeToday.bind(this)}
                                    >
                                        {this.state.cards.map((card)=> (
                                            <Picker.Item label={card.name} value={card.id} key={card.id}/>
                                        ))} 
                                    </Picker>
                                </View>
                            ))}
                            
                            <Button iconRight transparent style={styles.btnAdd} onPress={()=> this.buttonInc()}>
                                <Text>Add Card</Text>
                                <Icon name='add-circle' />
                            </Button>
                        </View>
                    </View>
                    <View style={styles.itemForm}>
                        <Label>Note</Label>
                        <Textarea rowSpan={5} bordered style={styles.textareaForm} 
                            onChangeText={
                                note=> this.setState({note})
                            }
                            value={this.state.note}
                            placeholder="Note Report"
                        />
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
    pickerForm: {
        flex: 1,
        borderColor: 'black',
        borderWidth: 1,
        marginTop: 10,
        marginRight: 20,
        padding: 0,
        height: 40,
        alignSelf: 'stretch'
    },
    btnAdd: {
        alignSelf: 'flex-end',
    },
    footerTabsColor:{
        backgroundColor: '#026aa7'
    },
    footerInactiveTab:{
        color: '#ffffff'
    }
})