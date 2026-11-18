import { format } from "date-fns"

const getDateDiff = (startTime, endTime) => {
    const difference = (new Date(endTime) - new Date(startTime)) / 1000 / 60 // minute
    console.log({ startTime: format(new Date(startTime), "PPpp"), endTime: format(new Date(endTime), "PPpp"), difference })
    // * we have got day
    const dayM = 24 * 60
    console.log(dayM)
    let day = 0
    let modulus = difference
    console.log(difference, dayM)
    if (difference >= dayM) {
        day = Math.floor(difference / dayM)
        modulus = difference % dayM
    }
    // * we have got hour

    let hour = 0
    if (modulus >= 60) {
        hour = Math.floor(modulus / 60)
        modulus = modulus % 60
    }
    // * we have got min 
    let min = 0
    if (modulus >= 1) {
        min = Math.floor(modulus)
    }
    console.log(modulus)

    return `${day ? `${day}d` : ""} ${hour ? `${hour}h` : ""}  ${min ? `${min}m` : ""}`

}

export default getDateDiff