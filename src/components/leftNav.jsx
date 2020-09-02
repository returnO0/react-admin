import React, {Component} from 'react'
import {Link,withRouter} from 'react-router-dom'
import {Menu} from "antd";
import './leftNav.less'
import menuList from "../config/menuconfig";
import logo from '../pages/login/images/logo.png';
const { SubMenu } = Menu;

class LeftNav extends Component {
    /**
     * 根据menuList数组生成对应的标签数组
     * map遍历+递归调用
     * @param menuList
     */
    /*getMenuNodes = (menuList) =>{
        return menuList.map(item => {
            if (!item.children) {
                return (
                    <Menu.Item key={item.key} icon={item.icon}>
                        <Link to={item.key}>{item.title}</Link>
                    </Menu.Item>
                )
            }else {
                return (
                    <SubMenu key={item.key} icon={item.icon} title={item.title}>
                        {this.getMenuNodes(item.children)}
                    </SubMenu>
                )
            }
        })
    };*/

    /**
     * 根据menuList数组生成对应的标签数组
     * reduce遍历+递归调用 采用不断向空数组添加内容的方式
     * pre 上一个数组 item数组单个项 []初始数组
     * @param menuList
     */
    getMenuNodes2=(menuList)=>{
        const path = this.props.location.pathname;
      return menuList.reduce((pre,item)=>{
          if (!item.children) {
              pre.push (
                  <Menu.Item key={item.key} icon={item.icon}>
                      <Link to={item.key}>{item.title}</Link>
                  </Menu.Item>
              )
          }else {
              //判断父菜单是否包含子菜单
              const cItem=item.children.find(cItem=>path.indexOf(cItem.key)===0);
              //如果包含则打开父菜单
              if (cItem){
                  this.openKey=item.key;
              }
              //得到需要打开菜单项的key
              pre.push (
                  <SubMenu key={item.key} icon={item.icon} title={item.title}>
                      {this.getMenuNodes2(item.children)}
                  </SubMenu>
              )
          }
          return pre;
      },[])
    };
    //在第一次render()之前执行一次
    //为第一个render()准备数据(必须同步的)
    componentWillMount() {
        this.menuNodes=this.getMenuNodes2(menuList);
}

    render() {
        let path = this.props.location.pathname;
        const openKey=this.openKey;
        if (path.indexOf('/product')===0){
            path='/product'
        }
        return (
            <div className="left-nav">
                <Link className="left-nav-head" to='/'>
                    <img src={logo} alt='这是一个图片'/>
                    <h1 hidden={this.props.collapsed}>后台管理</h1>
                </Link>
                <Menu theme="dark" defaultOpenKeys={[openKey]} selectedKeys={[path]} mode="inline">
                    {
                        this.menuNodes
                    }
                </Menu>
            </div>
        )
    }
}

/**
 * withRouter高阶组件
 * 包装非路由组件,返回一个新的组件
 * 新的组件向非路由组件传递3个属性:history/location/match
 */
export default withRouter(LeftNav);
