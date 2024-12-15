import axios  from "axios"
import BASE_URL from "./apiConfig"
interface Input {
    id:string,
    status:'AVAILABLE'|'IN_USE'|'MAINTENANCE',
}
async function updateVehicleStatus(vehicleData:Input) {
    try {
        const {data} = await axios.patch(
            `${BASE_URL}vehicles/${vehicleData?.id}/status`,vehicleData
        )
    return data
    } catch (error) {
        console.log(error)
        throw new Error(error?.response.data.message)
    }
}
export default updateVehicleStatus