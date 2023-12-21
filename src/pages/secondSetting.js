import { StatusBar } from 'expo-status-bar';
import React, {useState, Component} from 'react';
import { StyleSheet, Text, View, Button, Dimensions, TextInput } from 'react-native';
import DateTimePicker from "@react-native-community/datetimepicker";
import Constants from 'expo-constants';
import AppLoading from 'expo-app-loading';

import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import UseFonts from '/workspace/ARMY_CC2/src/useFonts';
import { userValue } from '/workspace/ARMY_CC2/src/useData';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';


export default function SecondSetting({navigation}) {
	const temp = new Date()

	const [name, setName] = useState(userValue["name"])
	const [userClass, setUserClass] = useState(userValue["userClass"])
	const [conscriptDate, setConscriptDate] = useState(moment(userValue["conscriptDate"]).toDate())
	const [relievedDate, setRelievedDate] = useState(moment(userValue["relievedDate"]).toDate())
	const [ealryDate, setEalryDate] = useState(moment(userValue["relievedDate"]).toDate())
	
	const [promoteFirst, setPromoteFirst] = useState(moment(userValue["promoteFirst"]).toDate())
	const [promoteSecond, setPromoteSecond] = useState(moment(userValue["promoteSecond"]).toDate())
	const [promoteThird, setPromoteThird] = useState(moment(userValue["promoteThird"]).toDate())
	
	const [promoteValue, setPromoteValue] = useState(0)
	const [dateTimePickerValue, setDateTimePickerValue] = useState(new Date())

	const [vacation, setVacation] = useState(Number(userValue["vacation"]))
	const [prizeVacation, setPrizeVacation] = useState(Number(userValue["prizeVacation"]))
	const [consolationVacation, setConsolationVacation] = useState(Number(userValue["consolationVacation"]))
	
	
	
	//폰트 적용 용//
	const [IsReady, SetIsReady] = useState(false);
	const LoadFonts = async() => {
			await useFonts();
	};
	//		
	
	//날짜선택기 기능//
	const [show, setShow] = useState(false)
	const RelievedDateClick = (showValue) => {
		setDateTimePickerValue(relievedDate)
		setPromoteValue(0)
    	setShow(true);
 	};
	
	const PromoteFirstClick = (showValue) => {
		setDateTimePickerValue(promoteFirst)
		setPromoteValue(1)
    	setShow(true);
 	};

	const PromoteSecondClick = (showValue) => {
		setDateTimePickerValue(promoteSecond)
		setPromoteValue(2)
    	setShow(true);
 	};
	
	const PromoteThirdClick = (showValue) => {
		setDateTimePickerValue(promoteThird)
		setPromoteValue(3)
    	setShow(true);
 	};
	

	
	
	const Confirm = (event, value) => {
		let selectedValue = new Date();
		
		//setShow(Platform.OS === 'ios');
		
		if (promoteValue === 0){
			selectedValue =  value || relievedDate
			setRelievedDate(selectedValue)	
		}
		else if (promoteValue === 1) {
			selectedValue =  value || promoteFirst
			setPromoteFirst(selectedValue)				
		}
		
		else if (promoteValue === 2) {
			selectedValue =  value || promoteSecond
			setPromoteSecond(selectedValue)
		}
		
		else if (promoteValue === 3) {
			selectedValue =  value || promoteThird
			setPromoteThird(selectedValue)
		}
	}
	//// 
	
	const SetEalryDate = () => {
		setEalryDate(ealryDate.setDate(ealryDate.getDate()-vacation-prizeVacation-consolationVacation))

	}
	const ClassCheck = () => {
		
		const today = new Date()
		let tempClass = "이등병"
		
		if (today >= promoteThird) {
			tempClass = "병장"
		}
		else if (today >= promoteSecond) {
			tempClass = "상병"
		}
		else if (today >= promoteFirst) {
			tempClass = "일병"
		}
		else {
			tempClass = "이등병"
		}
		userValue["userClass"] = tempClass

	}
	
	const StoreUserData = async () => {	
		SetEalryDate()
		ClassCheck()
		userValue["ealryDate"] = relievedDate
		userValue["promoteFirst"] = promoteFirst
		userValue["promoteSecond"] = promoteSecond
		userValue["promoteThird"] = promoteThird
		userValue["relievedDate"] = relievedDate
		userValue["initializeValue"] = true
		userValue["vacation"] = 0
		userValue["prizeVacation"] = 0
		userValue["consolationVacation"] = 0
		
		await AsyncStorage.setItem('@userKey', JSON.stringify(userValue))

		navigation.reset({routes: [{name: "메인"}]})
	}

	
	
	if (!IsReady) {
		return (
			<AppLoading startAsync = {LoadFonts} onFinish = {() => {SetIsReady(true)}} onError={() => {}}/>
		);
	}

	return (
		<View style = {{paddingTop: Constants.statusBarHeight}}>
			<View style = {{height: "10%"}}></View>
			<View style={{height: "50%", padding : "5%"}}>
				<Text style={{ fontFamily: "SpoqaHanSansBold", fontSize : 32, marginBottom: "3%"}}>다음 사항이 맞습니까?</Text>
				<Text style={{ fontSize :20, fontFamily: "SpoqaHanSansMedium", marginBottom: "3%", color : "#404040"}}>날짜를 눌러 변경할 수 있습니다.</Text>
				
				<View style = {{ backgroundColor : "#cccccc", height: 2 }}></View>
				<View style = {{ height : "30%" }}></View>
				
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
					<Text style = {styles.DateSpace}>{conscriptDate.getFullYear()} - {conscriptDate.getMonth()+1} - {conscriptDate.getDate()}</Text>		
				</View>
				
				<View style = {styles.RowSpace}>
					<Text style = {styles.TextSpace}>전역일</Text>
					<Text style = {styles.DateSpace} onPress = {RelievedDateClick}> {relievedDate.getFullYear()} - {relievedDate.getMonth()+1} - {relievedDate.getDate()}</Text>
				</View>
				<View style = {styles.RowSpace}>
					<Text style = {styles.TextSpace}>일병 진급일</Text>
					<Text style = {styles.DateSpace} onPress = {PromoteFirstClick}> {promoteFirst.getFullYear()} - {promoteFirst.getMonth()+1} - {promoteFirst.getDate()}</Text>
				</View>
				<View style = {styles.RowSpace}>
					<Text style = {styles.TextSpace}>상병 진급일</Text>
					<Text style = {styles.DateSpace} onPress = {PromoteSecondClick}> {promoteSecond.getFullYear()} - {promoteSecond.getMonth()+1} - {promoteSecond.getDate()}</Text>
				</View>	
				<View style = {styles.RowSpace}>
					<Text style = {styles.TextSpace}>병장 진급일</Text>
					<Text style = {styles.DateSpace} onPress = {PromoteThirdClick}> {promoteThird.getFullYear()} - {promoteThird.getMonth()+1} - {promoteThird.getDate()}</Text>
				</View>					
				<View style = {{flexDirection: "row", flexWrap:"wrap", marginBottom: 10, alignItems: "center"}}>
					
				</View>
			</View>
			<Text style = {styles.ConfirmButton}  onPress = {StoreUserData}>확인</Text>
			{show && (
				<DateTimePicker
					value = {dateTimePickerValue}
					mode = {"date"}
					onChange = {Confirm}
					display="default"/>
			)}
		</View>
  );
}



const styles = StyleSheet.create({
	RowSpace : {
		flexDirection: "row",
		flexWrap:"wrap",
		marginBottom: "8%",
		alignItems: "center"
	},
	TextSpace: {
		flex : 1,
		fontSize : 28,
		fontFamily: "SpoqaHanSansBold",
		color : "#000000"
	},
	ConfirmButton: {
		marginTop: "65%",
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
		//flex : 1,
		fontSize :28,
		fontFamily: "SpoqaHanSansMedium",
		textAlign: 'center',
		color: "#363636",
		
	}
	
	
	
});
