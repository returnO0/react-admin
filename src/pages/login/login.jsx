import React,{Component} from 'react'
import "./login.less"
import logo from "./images/logo.png"
import {Button, Form, Input,message} from "antd";
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import loginService from "../../api/loginService";
/*
登录的路由组件
 */

class Login extends Component{
    /*
    antd 4.x 以后 class组件使用formRef = React.createRef();
    创建formInstance对象
    并且需要在<Form>中指定 ref={this.formRef}
     */
    formRef = React.createRef();
    handleSubmit= event =>{
        this.formRef.current.validateFields(  ).then( async value => {
            const data= await loginService.login(value.username,value.password);
            if (data.success){
                message.success("登录成功");
                //保存用户信息到memoryUtils中
                sessionStorage.setItem('user',JSON.stringify(data.data));
                // memoryUtils.user=data.data;
                //跳转到登录界面 replace 跳转之后不需要返回
                this.props.history.replace('/')
            }else {
                message.error(data.message);
            }
        },err=>{
            console.log("校验失败"+err);
        }).catch(errorInfo => {
            console.log("校验异常"+errorInfo);
        });
    };
    render() {
        return(
            <div className="login">
                <header className="login-header">
                    <img src={logo} alt="logo"/>
                    <h1>React项目:后台管理系统</h1>
                </header>
                <section className="login-content">
                    <h2>用户登录</h2>
                    <Form ref={this.formRef} className="login-form" onFinish={this.handleSubmit}>
                        <Form.Item
                            name="username"
                            //表单输入时校验
                            rules={[
                                { required: true,message: '请输入用户名!' },
                                { min:4 ,message:'用户名至少4位'},
                                { max:12,message:'用户名最多12位'},
                                { whitespace:true,message:'不允许使用空格'},
                                { pattern:/^[a-zA-Z0-9_]+$/,message:'用户名必须是由字母,数字或下划线组这个'}
                                ]}
                        >
                            <Input className="form-input" prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[
                                { required: true,message: '请输入密码!' },
                                { min:4 ,message:'密码至少4位'},
                                { max:12,message:'密码最多12位'},
                                { whitespace:true,message:'不允许使用空格'},
                                { pattern:/^[a-zA-Z0-9_]+$/,message:'密码必须是由字母,数字或下划线组这个'}
                            ]}
                        >
                            <Input
                                className="form-input"
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                type="password"
                                placeholder="Password"
                            />
                        </Form.Item>
                        <Form.Item >
                            <Button
                                type="primary"
                                htmlType="submit"
                                className="login-form-button"
                            >
                                登录
                            </Button>
                        </Form.Item>
                    </Form>
                </section>
            </div>
        )
    }
}
export default Login
