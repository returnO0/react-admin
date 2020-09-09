import React, {Component} from 'react'
import {Select, Button, Col, Form, Input, Row} from "antd";
import LinkButton from "../../../components/link-button";
import { DownOutlined, UpOutlined } from '@ant-design/icons';
/**
 *
 */

class CustomerSearchForm extends Component {
    formRef = React.createRef();

    constructor(props) {
        super(props);
        this.state = {
            expand: false,
        };
    }

    onFinish = values => {
        this.props.search(1, 5, {...values})
    };

    toggle=()=>{
        const {expand} = this.state;
        this.setState({expand:!expand})
    }

    renderAllFormItem = () => {
        const {expand} = this.state;
        return expand ? (
            <>
                <Row gutter={24}>
                    <Col span={6}>
                        <Form.Item
                            name="name"
                            label="顾客名称"
                        >
                            <Input allowClear placeholder="请输入顾客名称"/>
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item
                            name="sex"
                            label="性别"
                        >
                            <Select allowClear
                                    placeholder="请选择性别"
                            >
                                <Select.Option value={true}>男</Select.Option>
                                <Select.Option value={false}>女</Select.Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item
                            name="address"
                            label="地址"
                        >
                            <Input allowClear placeholder="请输入地址"/>
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item
                            name="telephone"
                            label="电话号码"
                        >
                            <Input allowClear placeholder="请输入电话号码"/>
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item
                            name="cardNumber"
                            label="身份证号码"
                        >
                            <Input allowClear placeholder="请输入身份证号码"/>
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item
                            name="note"
                            label="备注"
                        >
                            <Input allowClear placeholder="请输入信息备注"/>
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
                            <span>更多</span>
                            <UpOutlined/>
                        </LinkButton>
                        <Button type="primary" htmlType="submit">
                            搜索
                        </Button>
                        <Button
                            style={{
                                margin: '0 8px',
                            }}
                            onClick={() => {
                                this.formRef.current.resetFields();
                            }}
                        >
                            重置
                        </Button>
                    </Col>
                </Row>
            </>) : (
            <>
                <Row gutter={24}>
                    <Col span={6}>
                        <Form.Item
                            name="name"
                            label="顾客名称"
                        >
                            <Input allowClear placeholder="请输入顾客名称"/>
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item
                            name="sex"
                            label="性别"
                        >
                            <Select allowClear
                                    placeholder="请选择性别"
                            >
                                <Select.Option value={true}>男</Select.Option>
                                <Select.Option value={false}>女</Select.Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item
                            name="address"
                            label="地址"
                        >
                            <Input allowClear placeholder="请输入地址"/>
                        </Form.Item>
                    </Col>
                    <Col
                        span={6}
                        style={{
                            textAlign: 'right',
                        }}
                    >
                        <LinkButton onClick={this.toggle}>
                            <span>收起</span>
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
                </Row>
            </>
        )
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

export default CustomerSearchForm;
