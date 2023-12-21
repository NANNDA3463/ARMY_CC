import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, View} from 'react-native';
import Constants from 'expo-constants';

import AppLoading from 'expo-app-loading';

import UseFonts from '/workspace/ARMY_CC2/src/useFonts';
import { userValue } from '/workspace/ARMY_CC2/src/useData';

import { NavigationContainer, useFocusEffect } from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import { ProgressBar, Colors } from 'react-native-paper';


export default function mainScreen ( {navigation} ) {

	const Today = new Date()
	
	const [conscriptDate, setConscriptDate] = useState(new Date(userValue["conscriptDate"]))
	const [relievedDate, setRelievedDate] = useState(new Date(userValue["relievedDate"]))
	const ealryDateTemp = (new Date(userValue["relievedDate"]))
	
	
	
	const [vacation, setVacation] = useState(Number(userValue["vacation"]))
	const [prizeVacation, setPrizeVacation] = useState(Number(userValue["prizeVacation"]))
	const [consolationVacation, setConsolationVacation] = useState(Number(userValue["consolationVacation"]))
	
	
	const [relievedDay, setRelievedDay] = useState((relievedDate.getTime() - conscriptDate.getTime()) / 1000/60/60/24)//총 복무일
	const [leftDay, setLeftDay] = useState(((relievedDate.getTime() - Today.getTime())/1000/60/60/24) + 2) //남은 복무일. 시작일수 포함
	const [nowDay, setNowDay] = useState(relievedDay - leftDay) // 현재 복무일
	
	const [ealryDate, setEalryDate] = useState(ealryDateTemp.setDate(ealryDateTemp.getDate() - vacation - prizeVacation - consolationVacation + 1))
	
	const [relievedPercent, setRelievedPercent] = useState(nowDay / relievedDay) //전역 퍼센트
	const [ealryPercent, setealryPercent] = useState((nowDay + vacation + prizeVacation + consolationVacation) / relievedDay)
	
	
	const [name, setName] = useState(userValue["name"])
	const [userClass, setUserClass] = useState(userValue["userClass"])

	
	useFocusEffect(
		React.useCallback(() => {
			//focused
			return() => {
				//unfocused
			}
		}, [])
	)
	
	//



	
	//폰트 적용 용//
	const [IsReady, SetIsReady] = useState(false);
	const LoadFonts = async() => {
			await UseFonts();
	};
	//	
	
	if (!IsReady) {
		return (
			<AppLoading startAsync = {LoadFonts} onFinish = {() => SetIsReady(true)} onError={() => {}}/>
		);
	}
	
	
	return (
		<View style = {{paddingTop: Constants.statusBarHeight}}>
			<View style = {{height: "10%"}}></View>
			<View style={{height: "50%", padding : "5%"}}>
				<Text style={styles.NameSpace}>{userClass} {name}</Text>
				<Text style={styles.DateSpace}>입대일 : {conscriptDate.getFullYear()}-{conscriptDate.getMonth() + 1}-{conscriptDate.getDate()}</Text>
				<Text style={styles.DateSpace}>전역일 : {relievedDate.getFullYear()}-{relievedDate.getMonth() + 1}-{relievedDate.getDate()}</Text>
				<Text style={styles.DateSpace}>조기전역일 : {ealryDate.getFullYear()}-{ealryDate.getMonth() + 1}-{ealryDate.getDate()}</Text>
				<View style = {{ backgroundColor : "#cccccc", height: 2 , marginTop : "5%", marginBottom : "5%"}}></View>
				<Text style={{ fontFamily: "SpoqaHanSansBold", fontSize : 35, marginBottom: "3%"}}>전역일 : {Math.floor(leftDay)}일</Text>
				<Text style={{ fontFamily: "SpoqaHanSansBold", fontSize : 35, marginBottom: "3%"}}>전역 전 휴가 : {Math.floor(leftDay) - vacation - consolationVacation - prizeVacation}일</Text>
				
				<ProgressBar style={styles.ProgressBarSpace}progress={relievedPercent} color="#27ae60" />
				<View style={{alignItems: "center"}}>
					<Text style={styles.DateSpace}>{(relievedPercent * 100).toFixed(1)} %</Text>
				</View>
				<ProgressBar style={styles.ProgressBarSpace}progress={ealryPercent} color="#27ae60" />
				<View style={{alignItems: "center"}}>
					<Text style={styles.DateSpace}>{(ealryPercent * 100).toFixed(1)} %</Text>
				</View>
				
				<Text style= {styles.TextSpace}>총 복무일 : {Math.floor(relievedDay)} 일</Text>
				<Text style= {styles.TextSpace}>현재 복무일 : {Math.floor(nowDay)} 일</Text>
				<Text style= {styles.TextSpace}>남은 복무일 : {Math.floor(leftDay)} 일</Text>
				<Text style= {styles.TextSpace}>남은 휴가 : {vacation + prizeVacation + consolationVacation} 일</Text>
				
				

			</View>
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
	NameSpace : {
		fontFamily: "SpoqaHanSansBold",
		fontSize : 40,
		marginBottom: "3%"
	}
	,
	TextSpace: {
		fontSize : 20,
		fontFamily: "SpoqaHanSansMedium",
		color : "#5e5e5e"
	},
	
	TitleSpace: {
		padding: '5%',
		height: '80%',
		flex: 1,
	},
	
	DateSpace: {
		marginBottom : "1%",
		fontSize :20,
		fontFamily: "SpoqaHanSansMedium",
		textAlign: 'left',
		marginLeft: "5%",
		color: "#5e5e5e",	
	},
	ProgressBarSpace : {
		marginTop : "3%",
		height : "15%",
		
	},
	
	PercentSpace : {
		marginBottom : "1%",
		fontSize :20,
		fontFamily: "SpoqaHanSansMedium",
		textAlign: 'center',
		marginLeft: "5%",
		color: "#5e5e5e",	
	},
});
