import axios  from "axios"
import BASE_URL from "./apiConfig"
async function getAllVehicles() {
    try {
        const {data} = await axios.get(
            `${BASE_URL}vehicles`
        )
    return data
    } catch (error) {
        console.log(error)
        throw new Error(error?.response.data.message)
    }
}
export default getAllVehicles