import { StatusBar } from 'expo-status-bar';
import React, {useState, Component, useRef } from 'react';
import { StyleSheet, Text, View, Button, Dimensions, TextInput, Alert, TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';
import AppLoading from 'expo-app-loading';

import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import UseFonts from '/workspace/ARMY_CC2/src/useFonts';
import { userValue } from '/workspace/ARMY_CC2/src/useData';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';

export default function VacationScreen() {
	const temp = new Date()
	
	const [vacation, setVacation] = useState(Number(userValue["vacation"]))
	const [prizeVacation, setPrizeVacation] = useState(Number(userValue["prizeVacation"]))
	const [consolationVacation, setConsolationVacation] = useState(Number(userValue["consolationVacation"]))
	const [synthesisVacation, setSynthesisVacation] = useState(vacation + prizeVacation + consolationVacation)
	const [tempVacation, setTempVacation] = useState(synthesisVacation - 1)
	const [relievedDate, setRelievedDate] = useState(new Date(userValue["relievedDate"]))

	
	const vacationTextinputRef = useRef(null)
	const prizeTextinputRef = useRef(null)
	const consolationTextinputRef = useRef(null)
	
	
	//폰트 적용 용//
	const [IsReady, SetIsReady] = useState(false);
	const LoadFonts = async() => {
			await useFonts();
	};
	//		
	
 	const createTwoButtonAlert = () =>
    	Alert.alert('알림', '저장되었습니다!', [
		{ text: '확인', onPress: () => console.log('OK Pressed') },
    ])
	
	
	const checkBtn = async () => {
		userValue["vacation"] = vacation
		userValue["prizeVacation"] = prizeVacation
		userValue["consolationVacation"] = consolationVacation
		await AsyncStorage.setItem('@userKey', JSON.stringify(userValue))
		
		
		createTwoButtonAlert()

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
				<Text style={styles.NameSpace}>휴가 관리</Text>
				<View alignItems={'flex-start'}>
					<Text style={styles.ScriptText}>받은 휴가를 종합 할수 있습니다</Text>
					<Text style={styles.ScriptText}>하단의 숫자를 눌러서 변경해봅시다</Text>
				</View>

				<View style = {{ backgroundColor : "#cccccc", height: 2 , marginTop : "10%", marginBottom : "10%"}}></View>
			
				<View style={styles.RowSpace}>
					
					<TouchableOpacity style={{flexDirection: "column", alignItems: "center"}}
							onPress = {() => vacationTextinputRef.current.focus()}
						>
						<Text style={styles.TextSpace}>연가</Text>
						<View style={{flexDirection:"row"}}>
							<TextInput
								keyboardType = "numeric"
								style = {styles.DateSpace}
								onChangeText = {text => setVacation(text)}
								defaultValue = {String(vacation)}
								onEndEditing = {() => setSynthesisVacation(parseInt(vacation) + parseInt(prizeVacation) + parseInt(consolationVacation))}
								ref = {vacationTextinputRef}
								/>
							<Text style={styles.DateSpace}>일</Text>		
						</View>
					</TouchableOpacity >
					
					<TouchableOpacity  style={{flexDirection: "column", alignItems: "center"}}
							onPress = {() => prizeTextinputRef.current.focus()}
						>
						<Text style={styles.TextSpace}>포상</Text>
						<View style={{flexDirection:"row"}}>
							<TextInput
								keyboardType = "numeric"
								style = {styles.DateSpace}
								onChangeText = {text => setPrizeVacation(text)}
								defaultValue = {String(prizeVacation)}
								onEndEditing = {() => setSynthesisVacation(parseInt(vacation) + parseInt(prizeVacation) + parseInt(consolationVacation))}
								ref = {prizeTextinputRef}
								/>
							<Text style={styles.DateSpace}>일</Text>		
						</View>
					</TouchableOpacity >
					
					<TouchableOpacity  style={{flexDirection: "column", alignItems: "center"}}
							onPress = {() => consolationTextinputRef.current.focus()}
						>
						<Text style={styles.TextSpace}>위로</Text>
						<View style={{flexDirection:"row"}}>
							<TextInput
								keyboardType = "numeric"
								style = {styles.DateSpace}
								onChangeText = {text => setConsolationVacation(text)}
								defaultValue = {String(consolationVacation)}
								onEndEditing = {() =>setSynthesisVacation(parseInt(vacation) + parseInt(prizeVacation) + parseInt(consolationVacation))}
								ref = {consolationTextinputRef}
								/>
							<Text style={styles.DateSpace}>일</Text>		
						</View>
					</TouchableOpacity >

				</View>
				
				<View style = {{ backgroundColor : "#cccccc", height: 2 , marginTop : "10%", marginBottom : "10%"}}></View>

				
				<Text style={styles.TextSpace}>총 휴가</Text>
				<Text style={styles.DateSpace}>{synthesisVacation} 일</Text>
			</View>
			<Text style = {styles.ConfirmButton} onPress = {checkBtn}>확인</Text>
		</View>
  );
}



const styles = StyleSheet.create({
	NameSpace : {
		fontFamily: "SpoqaHanSansBold",
		fontSize : 50,
		marginBottom: "5%"
	},
	RowSpace : {
		flexDirection: "row",
		flexWrap:"wrap",
		marginBottom: "8%",
   		justifyContent: 'space-around',
	},
	TextSpace: {
		//flex : 1,
		fontSize : 40,
		fontFamily: "SpoqaHanSansBold",
		textAlign: 'center',
		color : "#000000"
	},
	ConfirmButton: {
		marginTop: "61%",
		height : "8.5%",
		fontSize: 32,
		fontFamily:
		"SpoqaHanSansBold",
		backgroundColor : "#27ae60",
		textAlign: "center",
		textAlignVertical : "center",
		color: "#ffffff",
	},
	
	ScriptText :{
		fontSize : 24,
		fontFamily: "SpoqaHanSansMedium",
		textAlign: 'center',
		color: "#363636",
	}
	,
	
	DateSpace: {
		fontSize :40,
		fontFamily: "SpoqaHanSansMedium",
		textAlign: 'center',
		color: "#363636",
		
	}
	
	
	
});
