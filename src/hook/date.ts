/*
 * @Author: feng
 * @Date: 2022-10-09 15:12:34
 * @LastEditTime: 2022-10-10 15:32:39
 * @Description: file content
 */
const addZero = (i: number): string => {
    let res: string
    i < 10 ? res = '0' + i : res = i + ''
    return res
}
const dealTime = (): { yyyy: string, MM: string, dd: string, hh: string, mm: string, ss: string } => {
    const time = new Date()
    const yyyy = time.getFullYear() + ''
    const MM = addZero(time.getMonth())
    const dd = addZero(time.getDate())
    const hh = addZero(time.getHours())
    const mm = addZero(time.getMinutes())
    const ss = addZero(time.getSeconds())
    return { yyyy, MM, dd, hh, mm, ss }
}
export const getTime = () => {
    const { yyyy, MM, dd, hh, mm, ss } = dealTime()
    return yyyy + MM + dd + hh + mm + ss
}
export const getFormatTime = () => {
    const { yyyy, MM, dd, hh, mm, ss } = dealTime()
    return yyyy + '-' + MM + '-' + dd + ' ' + hh + ':' + mm + ':' + ss
}
export const getDate = () => {
    const { yyyy, MM, dd } = dealTime()
    return yyyy + MM + dd
}
export const getFormatDate = () => {
    const { yyyy, MM, dd } = dealTime()
    return yyyy + '-' + MM + '-' + dd
}