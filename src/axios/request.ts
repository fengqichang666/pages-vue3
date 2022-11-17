/*
 * @Author: feng
 * @Date: 2022-06-16 22:22:09
 * @LastEditTime: 2022-11-16 21:24:38
 * @Description: file content
 */
import axios from "./index";
import { ResultData } from "@/axios/interface";

export default class Request {
    // * 常用请求方法封装
    static get(url: string, params?: object, _object = {}): Promise<any> {
        return new Promise((resolve, reject) => {
            axios.get(url, { params, ..._object }).then(res => {
                resolve(res.data);
            }).catch(err => {
                reject(err);
            });
        })
    }
    static post<T>(url: string, params?: object, _object = {}): Promise<ResultData<T>> {
        return new Promise((resolve, reject) => {
            axios.post(url, params, _object).then(res => {
                resolve(res.data);
            }).catch(err => {
                reject(err);
            });
        })
        // return axios.post(url, params, _object);
    }
    static put<T>(url: string, params?: object, _object = {}): Promise<ResultData<T>> {
        return new Promise((resolve, reject) => {
            axios.put(url, params, _object).then(res => {
                resolve(res.data);
            }).catch(err => {
                reject(err);
            });
        });
    }
    static delete<T>(url: string, params?: any, _object = {}): Promise<ResultData<T>> {
        return new Promise((resolve, reject) => {
            axios.delete(url, { params, ..._object }).then(res => {
                resolve(res.data);
            }).catch(err => {
                reject(err);
            });
        });
    }
    //   /**
    //    * get方法
    //    * @param {string} url 路径
    //    * @param {object} params 参数
    //    */
    //   static get = (url: string, params?: any) => {
    //     return new Promise((resolve, reject) => {
    //       axios.get(url, { params: params }).then(res => {
    //         // console.log({data: res.data,status: res.status})
    //         // resolve({data: res.data,status: res.status});
    //         console.log(res)
    //         resolve(res.data);
    //       }).catch(err => {
    //         reject(err);
    //       })
    //     })
    //   }

    //   static post = (url: string, params?: any) => {
    //     return new Promise((resolve, reject) => {
    //       axios.post(url, params).then(res => {
    //         resolve(res);
    //       }).catch(err => {
    //         reject(err);
    //       })
    //     })
    //   }
}