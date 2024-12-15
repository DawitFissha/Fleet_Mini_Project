import axios  from "axios"
import BASE_URL from "./apiConfig"
interface Input {
    name:string,
    status:'AVAILABLE'|'IN_USE'|'MAINTENANCE',
}
async function addVehicle(vehicleData:Input) {
    try {
        const {data} = await axios.post(
            `${BASE_URL}vehicles`,vehicleData
        )
    return data
    } catch (error) {
        console.log(error)
        throw new Error(error?.response.data.message)
    }
}
export default addVehicle