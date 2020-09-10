/*
发送httpFetch请求
对axios进行封装
函数的返回值是promise对象
统一处理请求异常
请求成功后直接把response.data传给页面
 */

import axios from 'axios';
import {message} from 'antd';

const BASE = '/api'
const httpFetch={

    get(url,data){
        return new Promise(((resolve, reject) => {
            let promise;
            promise=axios.get(BASE+url,{
                params:data,
            });
            promise.then(response=>{
                resolve(response.data)
            }).catch(error=>{
                message.error("服务器异常"+error)
            })
        }))
    },
    post(url,data){
        return new Promise(((resolve, reject) => {
            let promise;
            promise=axios.post(BASE+url,data);
            promise.then(response=>{
                resolve(response.data)
            }).catch(error=>{
                message.error("服务器异常"+error)
            })
        }))
    },
    put(url,data){
        return new Promise(((resolve, reject) => {
            let promise;
            promise=axios.put(BASE+url,data);
            promise.then(response=>{
                resolve(response.data)
            }).catch(error=>{
                message.error("服务器异常"+error)
            })
        }))
    },
    delete(url,data){
        return new Promise(((resolve, reject) => {
            let promise;
            promise=axios.delete(BASE+url,{
                params:data
            });
            promise.then(response=>{
                resolve(response.data)
            }).catch(error=>{
                message.error("服务器异常"+error)
            })
        }))
    }
};
export default httpFetch;
