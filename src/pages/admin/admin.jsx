import React,{Component} from 'react'
import {Redirect,Route,Switch} from "react-router-dom";
import { Layout} from 'antd';
import LeftNav from "../../components/leftNav";
import Header from "../../components/header";
import Home from "../home/home";
import Category from "../category/category";
import Product from "../product/product";
import User from "../user/user";
import Role from "../role/role";
import Bar from "../charts/bar";
import Line from "../charts/line"
import Pie from "../charts/pie";

const {Content, Footer, Sider } = Layout;
/*
登录的路由组件
 */
class Admin extends Component{
    state = {
        collapsed: false,
    };


    onCollapse = collapsed => {
        console.log(collapsed);
        this.setState({ collapsed });
    };
    render() {
        //获取用户信息
        const user =JSON.parse(sessionStorage.getItem('user'));
        //没有登录
        if (!user||!user.username){
            //跳转到登录中
            return <Redirect to='/login'/>
        }
        return(
            <Layout style={{ minHeight: '100vh' }}>
                <Sider collapsible  collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
                    <LeftNav collapsed={this.state.collapsed}/>
                </Sider>
                <Layout className="site-layout">
                    <Header username={user.name} />
                    <Content style={{ margin: '20px' ,backgroundColor:'#FFF'}}>
                        <Switch>
                            <Route path='/home' component={Home} />
                            <Route path='/category' component={Category} />
                            <Route path='/product' component={Product} />
                            <Route path='/role' component={Role} />
                            <Route path='/user' component={User} />
                            <Route path='/charts/bar' component={Bar} />
                            <Route path='/charts/line' component={Line} />
                            <Route path='/charts/pie' component={Pie} />
                            <Redirect to='/home' />
                        </Switch>
                    </Content>
                    <Footer style={{ textAlign: 'center',color: '#ccc' }}>使用谷歌浏览器并在1920*1080的分辨率下可以获得最佳页面效果</Footer>
                </Layout>
            </Layout>
        );

    }
}
export default Admin
