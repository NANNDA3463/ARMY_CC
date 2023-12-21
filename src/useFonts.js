import * as Font from 'expo-font';

export default useFonts = async () => {
	await Font.loadAsync({
		'SpoqaHanSansBold': require('/workspace/ARMY_CC2/assets/fonts/SpoqaHanSansNeo-Bold.ttf'),
		'SpoqaHanSansMedium': require("/workspace/ARMY_CC2/assets/fonts/SpoqaHanSansNeo-Medium.ttf"),
		'SpoqaHanSansRegular': require("/workspace/ARMY_CC2/assets/fonts/SpoqaHanSansNeo-Regular.ttf")
	});
}