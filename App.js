import { StatusBar } from 'expo-status-bar';
import React, {useState, Component, navigation} from 'react';
import { StyleSheet, Text, View, Button, Dimensions, TextInput } from 'react-native';
import Constants from 'expo-constants';
import { Ionicons } from "@expo/vector-icons";
import AppLoading from 'expo-app-loading';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { userValue } from './src/useData';
import UseFonts from '/workspace/ARMY_CC2/src/useFonts';


import firstSetting from './src/pages/firstSetting';
import secondSetting from './src/pages/secondSetting';
import mainScreen from './src/pages/mainScreen';
import vacationScreen from './src/pages/vacationScreen';
import mainSetting from './src/pages/mainSetting';

import { NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';



const SettingsStack = createStackNavigator();
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();





function HomeTabScreen () {
	//const navigation = useNavigation
	return (
		<Tab.Navigator
			screenOptions = {({ route }) => ({
				headerShown: false,
				showLabel: false,
				
				tabBarIcon: ({ focused, color, size }) => {
					let iconName;

					if (route.name === '메인화면' || route.name === "메인") {
					  iconName = focused
						? 'home'
						: 'home';
					} else if (route.name === '휴가') {
					  iconName = focused ? 'document' : 'document'
					} else if (route.name === '설정') {
						iconName = focused ? 'settings' : 'settings'
					}

					// You can return any component that you like here!
					return <Ionicons name={iconName} size={size} color={color} />;
					},
					tabBarActiveTintColor: '#27ae60',
		        	tabBarInactiveTintColor: 'gray',
			})}
			>
			<Tab.Screen name="메인화면" component={mainScreen} 
				options = {{
					unmountOnBlur: Platform.OS === 'ios' ? false : true
				}}	
			/>
			<Tab.Screen name="휴가" component={vacationScreen}
				options = {{
					unmountOnBlur: Platform.OS === 'ios' ? false : true
				}}		
			/>
			<Tab.Screen name="설정" component = {mainSetting}
				options = {{
					unmountOnBlur: Platform.OS === 'ios' ? false : true
				}}
			/>
		</Tab.Navigator>
	)
}

function SettingsStackScreen(){
	return (
		<SettingsStack.Navigator screenOptions={({ route, navigation }) => ({
				headerShown: false,
				gestureEnabled: true,			
		})}>
			<Stack.Screen
        		name = "firstSetting" component = {firstSetting}
    			/>
			<Stack.Screen
        		name = "secondSetting" component = {secondSetting}
    			/>
			<Stack.Screen
				name = "메인" component = {HomeTabScreen}
				options = {{
					unmountOnBlur: Platform.OS === 'ios' ? false : true
				}}
				/>
		</SettingsStack.Navigator>
	)
}

function CheckInitialize () {
	
	return SettingsStackScreen()
		
}

export default function App() {
	
	const [IsReady, SetIsReady] = useState(false);
	const LoadFonts = async() => {
			await UseFonts();
	};	
	
	if (!IsReady) {
		return (
			<AppLoading startAsync = {LoadFonts} onFinish = {() => SetIsReady(true)} onError={() => {}}/>
		);
	}
	
	return (
		<NavigationContainer>
			<CheckInitialize/>
		</NavigationContainer>
  );
}
