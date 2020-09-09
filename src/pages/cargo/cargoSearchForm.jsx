import React, {Component} from 'react'
import { Form, Row, Col, Input, Button } from 'antd';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import LinkButton from "../../components/link-button";
/**
 *
 */


class CargoSearchForm extends Component {
    formRef = React.createRef();
    constructor(props) {
        super(props);
        this.state = {
            expand: false,
        };
    }

    // 搜索
    onFinish = values => {
        this.props.search(1,5,{...values})
    };

    // 收起和更多
    toggle=()=>{
        const {expand} = this.state;
        this.setState({expand:!expand})
    }

    // 渲染搜索表单
    renderAllFormItem = () => {
        const {expand} = this.state;
        return expand ? (
                <>
                    <Row gutter={24}>
                        <Col span={6}>
                            <Form.Item
                                name="name"
                                label="货物名称"
                            >
                                <Input allowClear placeholder="请输入货物名称" />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item
                                name="priceFrom"
                                label="价格大于"
                            >
                                <Input allowClear placeholder="请输入货物价格" />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item
                                name="priceTo"
                                label="价格小于"
                            >
                                <Input allowClear placeholder="请输入货物价格" />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item
                                name="inventoryFrom"
                                label="库存量大于"
                            >
                                <Input allowClear placeholder="请输入库存量" />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item
                                name="inventoryTo"
                                label="库存量小于"
                            >
                                <Input allowClear placeholder="请输入库存量" />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item
                                name="note"
                                label="备注"
                            >
                                <Input allowClear placeholder="请输入货物备注" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col
                            span={24}
                            style={{
                                textAlign: 'right',
                            }}
                        >
                            <LinkButton onClick={this.toggle}>
                                <span>收起</span>
                                <UpOutlined/>
                            </LinkButton>
                            <Button style={{
                                margin: '0 8px',
                            }} type="primary" htmlType="submit">
                                搜索
                            </Button>
                            <Button
                                onClick={() => {
                                    this.formRef.current.resetFields();
                                }}
                            >
                                重置
                            </Button>
                        </Col>
                    </Row>

            </>)
            :
            (<>
                <Row gutter={24}>
                    <Col span={6}>
                        <Form.Item
                            name="name"
                            label="货物名称"
                        >
                            <Input allowClear placeholder="请输入货物名称" />
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item
                            name="priceFrom"
                            label="价格大于"
                        >
                            <Input allowClear placeholder="请输入货物价格" />
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item
                            name="inventoryFrom"
                            label="库存量大于"
                        >
                            <Input allowClear placeholder="请输入库存量" />
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Col
                            span={24}
                            style={{
                                textAlign: 'right',
                            }}
                        >
                            <LinkButton onClick={this.toggle}>
                                <span>更多</span>
                                <DownOutlined/>
                            </LinkButton>
                            <Button style={{
                                margin: '0 8px',
                            }} type="primary" htmlType="submit">
                                搜索
                            </Button>
                            <Button
                                onClick={() => {
                                    this.formRef.current.resetFields();
                                }}
                            >
                                重置
                            </Button>
                        </Col>
                    </Col>
                </Row>
            </>)


    }

    render() {
        const formItemLayout = {
            labelCol: {span: 8},
            wrapperCol: {span: 16, offset: 0},
        };
        return (
            <Form
                {...formItemLayout}
                ref={this.formRef}
                onFinish={this.onFinish}
            >
                {this.renderAllFormItem}
            </Form>
        )
    }
}

export default CargoSearchForm;
