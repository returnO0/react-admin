import jsonp from 'jsonp'
import {message} from "antd";
export const getWeather=(city)=>{
    return new Promise((resolve,reject)=>{
        const url=`http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`
        jsonp(url,{},(err,data)=>{
            if(!err&&data.status==='success'){
                const {dayPictureUrl,weather} = data.results[0].weather_data[0];
                resolve({dayPictureUrl,weather});
            }else {
                //失败
                message.error("获取天气信息失败")
            }
        })
    });
};

