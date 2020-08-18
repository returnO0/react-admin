import React, {Component} from 'react'
import {Switch,Route,Redirect} from 'react-router-dom'

import ProductDetail from "./ProductDetail";
import ProductAddUpdate from "./ProductAddUpdate";
import ProductHome from "./productHome";
import "./product.less";
/**
 * 商品管理
 */

class Product extends Component {
    render() {
        return (
            <Switch>
                <Route path='/product' component={ProductHome} exact/>
                <Route path='/product/addUpdate' component={ProductAddUpdate}/>
                <Route path='/product/detail' component={ProductDetail}/>
                <Redirect to='/product'/>
            </Switch>
        )
    }
}

export default Product;
