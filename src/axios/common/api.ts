/*
 * @Author: feng
 * @Date: 2022-11-15 15:35:48
 * @LastEditTime: 2022-11-16 21:14:54
 * @Description: file content
 */
import request from '../request'
export const getData = ()=>{
    return request.get('https://api.inews.qq.com/newsqa/v1/query/inner/publish/modules/list?modules=statisGradeCityDetail,diseaseh5Shelf')
}