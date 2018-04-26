import React, { Component } from 'react';
import {StyleSheet} from 'react-native';
import {
	Card,
	CardItem,
	Button,
	Text
} from 'native-base';

export default class Report extends Component{

	boards = [
		{
			id: 1,
			title: 'Treport'
		},
		{
			id: 2,
			title: 'Asisten Lapak'
		},
		{
			id: 3,
			title: 'DW-Bootcamp 2'
		}
	]
	
	render(){
		return(
			<Card style={styles.card}>
				{this.boards.map((board)=> (
					<CardItem key={board.id} style={styles.boardItem} >
						<Button transparent onPress={()=> this.props.navigation.navigate('ReportDetail')}>
							<Text>
								{board.title}
							</Text>
						</Button>
					</CardItem>
				))}
			</Card>
		);
	}
}

const styles = StyleSheet.create({
	card: {
		padding: 30,
		marginTop: 20,
	},
	boardItem: {
		paddingTop: 30,
		paddingBottom: 30,
		borderColor: 'black',
		borderWidth: 1,
		marginBottom: 20
	  }
});