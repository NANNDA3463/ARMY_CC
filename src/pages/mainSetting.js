import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, View, Button, Dimensions, TextInput, Alert, TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';
import AppLoading from 'expo-app-loading';

import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import UseFonts from '/workspace/ARMY_CC2/src/useFonts';
import { userValue } from '/workspace/ARMY_CC2/src/useData';
import AsyncStorage from '@react-native-async-storage/async-storage';



export default function MainSetting({navigation}) {
	
	const resetSettings = async () => {
		userValue["initializeValue"] = false
		await AsyncStorage.setItem('@userKey', JSON.stringify(userValue))
		navigation.navigate('firstSetting');
	}
	
	const createTwoButtonAlert = async () =>
    	Alert.alert('주의', '초기설정화면으로 돌아갑니다. 괜찮으십니까?', [
		{ text: "확인", onPress: () => resetSettings() },
		{ text: "취소"}
    ])
	
	//폰트 적용 용//
	const [IsReady, SetIsReady] = useState(false);
	const LoadFonts = async() => {
			await useFonts();
	};
	//		
	
 	if (!IsReady) {
		return (
			<AppLoading startAsync = {LoadFonts} onFinish = {() => {SetIsReady(true)}} onError={() => {}}/>
		);
	}

	return (
		<View style = {{paddingTop: Constants.statusBarHeight}}>
			<View style = {{height: "10%"}}></View>
			<View style={{height: "50%", padding : "5%"}}>
				<Text style={styles.NameSpace}>설정</Text>

				<View style = {{ backgroundColor : "#cccccc", height: 2 , marginTop : "10%", marginBottom : "10%"}}></View>
			
				<View style={styles.RowSpace}>					
					<View style={{flexDirection: "row", alignItems: "center"}}>
						<Text style={styles.TextSpace}>정보 초기화</Text>
						<Text style= {styles.ConfirmButton} onPress = {createTwoButtonAlert}>확인</Text>
					</View>
				</View>
			</View>
			
		</View>
  );
}



const styles = StyleSheet.create({
	NameSpace : {
		fontFamily: "SpoqaHanSansBold",
		fontSize : 50,
	},
	RowSpace : {
		flexDirection: "row",
		flexWrap:"wrap",
		marginBottom: "0%",
   		//justifyContent: 'space-around',
	},
	TextSpace: {
		//flex : 1,
		fontSize : 40,
		fontFamily: "SpoqaHanSansBold",
		textAlign: 'center',
		color : "#000000"
	},
	ConfirmButton: {
		marginLeft : '40%',
		fontSize: 40,
		fontFamily:
		"SpoqaHanSansBold",
		backgroundColor : "#27ae60",
		textAlign: "center",
		textAlignVertical : "center",
		color: "#ffffff",
	},
});
