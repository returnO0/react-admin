import React, {Component} from 'react'
import {Button, Col, Form, Input, message, Modal, Row, Table} from "antd";
import cargoService from "../api/cargoService";
/**
 *
 */

class CargoModel extends Component {
    formRef = React.createRef();
    constructor(props) {
        super(props);
        this.state = {
            columns:[
                {
                    title:'货物编号',
                    align:'center',
                    dataIndex: 'id',
                },
                {
                    title:'货物名称',
                    align:'center',
                    dataIndex:'name',
                },
                {
                    title: '库存',
                    align: 'center',
                    dataIndex: 'inventory'
                }
            ],
            dataSource:[],
            loading:false,
            pagination:{        //分页参数
                current:1,
                pageSize:10,
                pageSizeOptions:[10,20,50],
                showSizeChanger:true,
                onChange:(page,size)=>{
                    const {pagination} = this.state
                    pagination.current=page;
                    pagination.pageSize=size
                    this.selectCargoPage(page,size)
                },
                showTotal:(total) => `一共有${total}条数据`,

            },
            customerData:{},
            selectedRows: [],
            selectedRowKeys:[],
        }
    }

    componentWillMount() {
        const {pagination}=this.state;
        this.selectCargoPage(pagination.current,pagination.pageSize)
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        this.props.onRef(this)
    }

    // 获取表格数据源
    selectCargoPage=async (page,size)=>{
        this.setState({loading:true})
        const params={
            page:page-1,
            size:size
        }
        const result = await cargoService.selectCargoPage(params);
        // 处理返回结果
        if (result.success){
            let pagination = {
                ...this.state.pagination,
                total:result.total,
            };
            this.setState({pagination,dataSource:result.data})
        }else {
            message.error(result.message)
        }
        this.setState({loading:false})
    }

    // 刷新数据
    reload=()=>{
        const {pagination}=this.state;
        this.selectCustomerPage(pagination.current,pagination.pageSize)
    }

    // 显示弹框组件
    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    // 确定按钮
    handleOk = e => {
        const {selectedRows} =this.state;
        if (this.props.onOk){
            this.props.onOk(selectedRows)
        }
        this.setState({
            visible: false,
        });
    };


    // 取消按钮
    handleCancel = e => {
        this.setState({
            visible: false,
            selectedRowKeys:[],
            selectedRows: [],
        });
    };

    // 行勾选时回调函数
    onSelectChange = (selectedRowKeys,selectedRows) => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({ selectedRowKeys,selectedRows });
    };


    render() {
        const formItemLayout = {
            labelCol: {span: 8},
            wrapperCol: {span: 16, offset: 0},
        };
        const {loading,dataSource,columns,pagination,selectedRowKeys} =this.state;
        let selected=selectedRowKeys;
        if (this.props.selectedKey){
            selected=selectedRowKeys.length>0?selectedRowKeys:this.props.selectedKey
        }
        const rowSelection = {
            selectedRowKeys:selected,
            type:'radio',
            onChange: this.onSelectChange,
        };
        return (
            <>

                <Modal
                    width='50%'
                    title="货物信息"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    okText="确认"
                    cancelText="取消"
                >
                    <Form
                        {...formItemLayout}
                        ref={this.formRef}
                        onFinish={this.onFinish}
                    >
                        <Row gutter={24}>
                            <Col span={8}>
                                <Form.Item
                                    name="id"
                                    label="货物编号"
                                >
                                    <Input allowClear placeholder="请输入货物编号" />
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item
                                    name="name"
                                    label="货物名称"
                                >
                                    <Input allowClear placeholder="请输入货物名称" />
                                </Form.Item>
                            </Col>
                            <Col
                                span={8}
                                style={{
                                    textAlign: 'right',
                                }}
                            >
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
                    </Form>
                    <Table
                        size='small'
                        bordered
                        rowKey="id"
                        loading={loading}
                        rowSelection={rowSelection}
                        dataSource={dataSource}
                        columns={columns}
                        pagination={pagination}
                    />
                </Modal>
            </>
        )
    }
}

export default CargoModel;
