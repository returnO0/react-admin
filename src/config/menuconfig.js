import {BarChartOutlined,LineChartOutlined,AreaChartOutlined,DesktopOutlined,  PieChartOutlined, TeamOutlined, UserOutlined,LoadingOutlined} from "@ant-design/icons";
import React from "react";


const menuList= [
    {
        title : '首页',
        key : '/home',
        icon : <DesktopOutlined />,
    },
    {
        title: '商品',
        icon : <PieChartOutlined />,
        key : 'products',
        children:[{
            title: '品类管理',
            key: '/category',
            icon: <PieChartOutlined />
        },{
                title : '商品管理',
                key : '/product',
                icon : <PieChartOutlined />
        }]
    },
    {
        title:'用户管理',
        key:'/user',
        icon:<TeamOutlined />
    },
    {
        title:'角色管理',
        key:'/role',
        icon:<UserOutlined />
    },
    {
        title : '图形分析',
        key:'/charts',
        icon:<AreaChartOutlined />,
        children:[{
            title: '柱形图',
            key: '/charts/bar',
            icon: <BarChartOutlined />
        },{
            title: '折线图',
            key: '/charts/line',
            icon: <LineChartOutlined />
        },{
            title: '饼状图',
            key: '/charts/pie',
            icon: <PieChartOutlined />
        }]
    },
    {
        title : '敬请期待...',
        key:'/continue',
        icon:<LoadingOutlined />
    }
];

export default menuList
