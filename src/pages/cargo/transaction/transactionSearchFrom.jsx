import React, {Component} from 'react'
import {Button, Col, Form, Input, Row, Select ,DatePicker} from "antd";
import { DownOutlined, UpOutlined,SearchOutlined } from '@ant-design/icons';
import LinkButton from "../../../components/link-button";
import CustomerModel from "../../../components/customerModel";
import CargoModel from "../../../components/cargoModel";
import moment from "moment";
/**
 *
 */
const { RangePicker } = DatePicker;
const dateFormat = 'YYYY-MM-DD HH:mm:ss';
class TransactionSearchFrom extends Component {
    formRef = React.createRef();
    constructor(props) {
        super(props);
        this.state = {
            expand: false,
        };
    }

    // 收起和更多
    toggle=()=>{
        const {expand} = this.state;
        this.setState({expand:!expand})
    }

    // 搜索
    onFinish = values => {
        let createDateFrom=null;
        let createDateTo=null;
        if(values.timeRange){
            createDateFrom=moment(values.timeRange[0]).format(dateFormat)
            createDateTo=moment(values.timeRange[1]).format(dateFormat)
        }
        const searchParams={
            ...values,
            createDateFrom:createDateFrom,
            createDateTo:createDateTo,
            timeRange:null,
        }
        debugger
        this.props.search(1,10,searchParams)
    };

    // 渲染搜索表单
    renderAllFormItem = () => {
        const {expand} = this.state;
        return expand ? (
            <>
                <Row gutter={24}>
                    <Col span={6}>
                        <Form.Item
                            name="id"
                            label="交易流水号"
                        >
                            <Input allowClear placeholder="交易流水号" />
                        </Form.Item>

                    </Col>
                    <Col span={6}>
                        <Form.Item
                            name="cargoId"
                            label="货物名称"
                        >
                            <Input
                                ref={ref => {
                                    this.SelectCargo = ref
                                }}

                                suffix={<SearchOutlined />}
                                onFocus={this.onCargoClick}
                                placeholder={'请选择货物'}
                            />
                        </Form.Item>

                    </Col>
                    <Col span={6}>
                        <Form.Item
                            name="userId"
                            label="交易人名称"
                        >
                            <Input
                                ref={ref => {
                                    this.SelectCustomer = ref
                                }}
                                onFocus={this.onCustomerClick}
                                suffix={<SearchOutlined />}
                                placeholder={'请选择交易人'}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item
                            name="status"
                            label="出货/进货"
                        >
                            <Select allowClear
                                    placeholder="请选择出货/进货"
                            >
                                <Select.Option value={true}>进货</Select.Option>
                                <Select.Option value={false}>出货</Select.Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item
                            name="unitPriceFrom"
                            label="单价小于"
                        >
                            <Input allowClear placeholder="请输入货物价格" />
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item
                            name="unitPriceTo"
                            label="单价大于"
                        >
                            <Input allowClear placeholder="请输入库存量" />
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item
                            name="tradingVolumeFrom"
                            label="交易量大于"
                        >
                            <Input allowClear placeholder="请输入交易量" />
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item
                            name="tradingVolumeTo"
                            label="交易量小于"
                        >
                            <Input allowClear placeholder="请输入交易量" />
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item
                            name="amountFrom"
                            label="总交易额大于"
                        >
                            <Input allowClear placeholder="请输入交易额" />
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item
                            name="amountTo"
                            label="总交易额小于"
                        >
                            <Input allowClear placeholder="请输入交易额" />
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item
                            name="timeRange"
                            label="交易时间"
                        >
                            <RangePicker
                                placeholder={["开始时间","结束时间"]}
                                format={dateFormat}
                                showTime={{ format: 'HH:mm:ss' }}
                            />
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
            </>
        ):(
            <>
                <Row gutter={24}>
                    <Col span={6}>
                        <Form.Item
                            name="id"
                            label="交易流水号"
                        >
                            <Input allowClear placeholder="交易流水号" />
                        </Form.Item>

                    </Col>
                    <Col span={6}>
                        <Form.Item
                            name="cargoId"
                            label="货物名称"
                        >
                            <Input
                                ref={ref => {
                                    this.SelectCargo = ref
                                }}

                                suffix={<SearchOutlined />}
                                onFocus={this.onCargoClick}
                                placeholder={'请选择货物'}
                            />
                        </Form.Item>

                    </Col>
                    <Col span={6}>
                        <Form.Item
                            name="userId"
                            label="交易人名称"
                        >
                            <Input
                                ref={ref => {
                                    this.SelectCustomer = ref
                                }}
                                onFocus={this.onCustomerClick}
                                suffix={<SearchOutlined />}
                                placeholder={'请选择交易人'}
                            />
                        </Form.Item>
                    </Col>
                    <Col
                        span={6}
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
                </Row>
            </>
        )
    }
    // 货物选中弹框的确认回调
    onCargoOk = (value)=>{
        this.formRef.current.setFieldsValue({"cargoId":value[0].id})
    }

    // 顾客选中弹框的确认回调
    onCustomerOk = (value)=>{
        this.formRef.current.setFieldsValue({"userId":value[0].id})
    };

    // 打开货物选择框
    onCargoClick=()=>{
        this.SelectCargo.blur();
        this.cargoModel.showModal();
    }

    // 打开顾客选中框
    onCustomerClick=()=>{
        this.SelectCustomer.blur();
        this.customerModel.showModal();
    }

    render() {
        const formItemLayout = {
            labelCol: { span: 8 },
            wrapperCol: { span: 16, offset: 0 },
        };
        return (
            <>
                <Form
                    {...formItemLayout}
                    ref={this.formRef}
                    onFinish={this.onFinish}
                >
                    {this.renderAllFormItem}
                    {/*页面默认不显示的东西*/}

                </Form>
                <CustomerModel
                    onRef={ref=>this.customerModel = ref}
                    onOk={this.onCustomerOk}
                />
                <CargoModel
                    onRef={ref=>this.cargoModel = ref}
                    onOk={this.onCargoOk}
                />
            </>
        )
    }
}

export default TransactionSearchFrom;
