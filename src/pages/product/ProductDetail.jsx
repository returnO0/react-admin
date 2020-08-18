import React, {Component} from 'react'
import {Card,List} from "antd";
import ArrowLeftOutlined from "@ant-design/icons/lib/icons/ArrowLeftOutlined"
import LinkButton from "../../components/link-button";
/**
 * 商品管理
 */

const Item = List.Item;
class ProductDetail extends Component {
    render() {
        const state=this.props.location.state;
        console.info(state)
        const title = (
            <span>
                <LinkButton>
                    <ArrowLeftOutlined
                        style={{color:'green',marginRight:15,fontSize:20}}
                        onClick={()=>this.props.history.goBack()}
                    />
                </LinkButton>
                <span>商品详情</span>
            </span>
        )
        //wo1
        return (
            <Card title={title} className='product-detail'>
                <List>
                    <Item className="item">
                        <span className="left">商品名称:</span>
                        <span className="right">{state.name}</span>
                    </Item>
                    <Item className="item">
                        <span className="left">所属分类:</span>
                        <span className="right">{state.parentName}-->{state.categoryName}</span>
                    </Item>
                    <Item>
                        <span className="left">商品价格:</span>
                        <span className="right">{state.price}</span>
                    </Item>
                    <Item>
                        <span className="left">商品描述:</span>
                        <span className="right">{state.description}</span>
                    </Item>
                </List>
            </Card>
        )
    }
}

export default ProductDetail;
