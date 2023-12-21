import { userValue } from '/workspace/ARMY_CC2/src/useData';



export default CalculateDate = async (getUserDate) => {
	
	let tempYear = false
	const userDate = new Date(getUserDate.valueOf())
	
    const serviceDate = 638
		
	const firstService = new Date(2017, 1, 30)
	
    const reduceDate = Math.ceil((userDate.getTime() - firstService.getTime())/(1000*3600*24))
    const returnDate = Math.floor(reduceDate / 14)
	



    if (returnDate > 93) {
        userDate.setDate(userDate.getDate() + (serviceDate - 93))
    }
    else {
		userDate.setDate(userDate.getDate() + (serviceDate - returnDate))
	}
	
	if ((getUserDate.getMonth()+3) > 12) {
		tempYear = true
	}
	
	userValue["relievedDate"] = userDate
	
	userValue["promoteFirst"] = new Date(
		(tempYear ? getUserDate.getFullYear() + 1 : getUserDate.getFullYear()),
		(tempYear ? getUserDate.getMonth()+3-12 : getUserDate.getMonth()+3),
		1)
	
	userValue["promoteSecond"] = new Date(
		(tempYear ? getUserDate.getFullYear() + 1 : getUserDate.getFullYear()),
		(tempYear ? getUserDate.getMonth()+9-12 : getUserDate.getMonth()+9),
		1)
	
	tempYear = true

	
	userValue["promoteThird"] = new Date(
		(tempYear ? getUserDate.getFullYear() + 1 : getUserDate.getFullYear()),
		(tempYear ? getUserDate.getMonth()+3 : getUserDate.getMonth()+3),
		1)
	//return userDate
}
