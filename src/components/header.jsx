import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import './header.less'
import menuList from "../config/menuconfig";
import {getWeather} from '../api/adminService'
import {formatDate} from '../utils/dataUtils'
import {Modal,message} from 'antd'
import LinkButton from "./link-button";
/**
 * 头部组件
 */
class Header extends Component {
    state = {
        currentTime:formatDate(Date.now()), //当前时间字符串
        dayPictureUrl:'',   //天气图片url
        weather:'', //天气文本
    };

    //每隔一秒获取当前时间,并更新状态数据currentTime
    getTime=()=>{
        this.intervalId = setInterval(()=>{
            const currentTime = formatDate(Date.now());
            this.setState({currentTime})
        },1000)
    };
    //获取当前天气
    getWeather=async ()=>{
        const {dayPictureUrl,weather}  =await getWeather('天津');
        this.setState({dayPictureUrl,weather})
    };

    //获取当前页标题
    getTitle=()=>{
        const path= this.props.location.pathname;
        let title;
        menuList.forEach(item=>{
            //如果当前item对象的key与path一样,item的title就是需要显示的title
            if (item.key===path){
                title=item.title;
            }else if (item.children){
                //在所有子item中查找匹配
                const cItem=item.children.find(cItem=>cItem.key===path);
                //如果有值才说明有匹配的
                if (cItem){
                    title=cItem.title
                }
            }
        });
        return title;
    };
    /*
    第一次render()之后执行一次
    一般在此执行异步操作: 发ajax请求/启动定时器
     */
    /**
     * 退出登录
     */
    logout=()=>{
        Modal.confirm({
            title:'确认退出吗?',
            onOk:()=>{
                //删除保存的user数据
                sessionStorage.removeItem('user');
                //跳转到login
                this.props.history.replace('/login');
                message.success("成功退出");
            }
        })
    };
    componentDidMount() {
        //获取当前时间
        this.getTime();
        this.getWeather();
    }

    /**
     * 当前组件卸载之前
     */
    componentWillUnmount() {
        //清除定时器
        clearInterval(this.intervalId);
    }

    render() {
        const {currentTime,dayPictureUrl,weather} =this.state;
        const title=this.getTitle();
        return (
            <div className="header">
                <div className="header-top">
                    <span>欢迎,{this.props.username}</span>
                    <LinkButton  onClick={this.logout}>退出</LinkButton>
                </div>
                <div className="header-bottom">
                    <div className="header-bottom-left">{title}</div>
                    <div className="header-bottom-right">
                        <span>{currentTime}</span>
                        <img src={dayPictureUrl} alt="weather" />
                        <span>{weather}</span>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Header);
