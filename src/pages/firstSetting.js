import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, View, Button, Dimensions, TextInput } from 'react-native';
import DateTimePicker from "@react-native-community/datetimepicker";
import Constants from 'expo-constants';
import AppLoading from 'expo-app-loading';

import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import UseFonts from '/workspace/ARMY_CC2/src/useFonts';
import { userValue } from '/workspace/ARMY_CC2/src/useData';
import CalculateDate from '/workspace/ARMY_CC2/src/calculateDate';

import {clonedeep} from 'lodash';



export default function firstSetting( {navigation} ) {
	const [date, setDate] = useState(new Date());
	const [show, setShow] = useState(false)
	const [Year, setYear] =  useState(date.getFullYear());
	const [Month, setMonth] = useState(date.getMonth() + 1);
	const [Day, setDay] = useState(date.getDate());
	//


	//디폴트 네임
	const [name, setName] = useState('곽곽이')

	const JumpScreen = async () => {
		SetIsReady(true)
		const value = await AsyncStorage.getItem('@userKey')
		if(value !== null) {
			userValue = clonedeep(JSON.parse(value))
			if (userValue["initializeValue"] === true) {
				navigation.reset({routes: [{name: "메인"}]})
			}
		}
	};
	//폰트 적용 용//
	const [IsReady, SetIsReady] = useState(false);
	const LoadFonts = async() => {
		await UseFonts();
	};
	//

	
	//날짜선택기 기능
	const showMode = (showValue) => {
    	setShow(true);
 	};
	
	
	const Confirm = (event, value) => {
		
		setShow(false)
		
		const selectedValue =  value || date
		setYear(selectedValue.getFullYear());
		setMonth(selectedValue.getMonth() + 1);
		setDay(selectedValue.getDate());
		
		setDate(selectedValue)
	}
	
	//날짜 선택기 기능
	
	const nextBtn = async () => {
		userValue["name"] = name;
		userValue["conscriptDate"] = date;
		CalculateDate(userValue["conscriptDate"])
		navigation.push('secondSetting');
	}
	
	

	
	
	if (!IsReady) {
		return (
			<AppLoading startAsync = { LoadFonts } onFinish = {() => JumpScreen()} onError={() => {}}/>
		);
	}
	
	
	return (

		<View style = {{paddingTop: Constants.statusBarHeight}}>
			<View style = {{height: "20%"}}></View>
			<View style={{height: "50%", padding : "5%"}}>
				<Text style={{ fontFamily: "SpoqaHanSansBold", fontSize : 32, marginBottom: "3%"}}>입대일을 입력해주세요</Text>
				<Text style={{ fontSize :20, fontFamily: "SpoqaHanSansMedium", marginBottom: "3%", color : "#404040"}}>이름과 날짜를 눌러 변경할 수 있습니다.</Text>
				
				<View style = {{ backgroundColor : "#cccccc", height: 2 }}></View>
				
				<View style = {{ height : "20%" }}></View>
				
				
				<View style = {styles.RowSpace}>
					<Text style = {styles.TextSpace}>이름</Text>
					<TextInput
						style = {styles.DateSpace}
						onChangeText = {text => setName(text)}
						value = {name}
						/>

				</View>
				
				<View style = {styles.RowSpace}>
					<Text style = {styles.TextSpace}>입대일</Text>
					<Text style = {styles.DateSpace} onPress = {showMode}> {Year} - {Month} - {Day}</Text>
				</View>

			</View>
			<Text style = {styles.ConfirmButton} onPress = {nextBtn}>다음</Text>
			{show && (
				<DateTimePicker
					value = {date}
					mode = {"date"}
					onChange = {Confirm}
					display="default"/>
			)}
		</View>
  );
}



const styles = StyleSheet.create({
	container: {
		//flex: 1,
		//backgroundColor: '#fff',
		height: '50%'
		
	},
	RowSpace : {
		flexDirection: "row",
		flexWrap:"wrap",
		marginBottom: "10%",
		alignItems: "center"
	},
	TextSpace: {
		flex : 1,
		fontSize : 28,
		fontFamily: "SpoqaHanSansBold",
		color : "#000000"
	},
	
	TitleSpace: {
		padding: '5%',
		height: '80%',
		flex: 1,
	},
	ConfirmButton: {
		marginTop: "44%",
		height : "8.5%",
		fontSize: 32,
		fontFamily:
		"SpoqaHanSansBold",
		backgroundColor : "#27ae60",
		textAlign: "center",
		textAlignVertical : "center",
		color: "#ffffff",
	},
	
	DateSpace: {
		flex : 1,
		fontSize :28,
		fontFamily: "SpoqaHanSansMedium",
		textAlign: 'center',
		color: "#363636",
		
	}
	
	
	
});
