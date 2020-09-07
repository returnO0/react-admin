import React, {Component} from 'react';
import {Table, Button, Modal, message} from "antd";
import customerService from "../api/customerService";
/**
 *
 */

class CustomerModel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            columns:[
                {
                    title:'用户编号',
                    align:'center',
                    dataIndex: 'id',
                },
                {
                    title:'客户名称',
                    align:'center',
                    dataIndex:'name',
                },
            ],
            dataSource:[],
            loading:false,
            pagination:{        //分页参数
                current:1,
                pageSize:5,
                pageSizeOptions:[5,10,20,50],
                showSizeChanger:true,
                onChange:(page,size)=>{
                    const {pagination} = this.state
                    pagination.current=page;
                    pagination.pageSize=size
                    this.selectCustomerPage(page,size)
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
        this.selectCustomerPage(pagination.current,pagination.pageSize)
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        this.props.onRef(this)
    }

    // 获取数据源
    selectCustomerPage=async (page,size)=> {
        this.setState({loading: true})
        const params = {
            page: page - 1,
            size: size
        }
        const result = await customerService.selectCustomerPage(params);
        if (result.success) {
            let pagination = {
                ...this.state.pagination,
                total: result.total,
            };
            this.setState({pagination, dataSource: result.data})
        } else {
            message.error(result.message)
        }
        this.setState({loading: false})
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

    // 重置选中的行数
    start = () => {
        this.setState({
            selectedRows: [],
        });
    };

    render() {
        const {loading,dataSource,columns,pagination,selectedRows,selectedRowKeys} =this.state;
        let selected=selectedRowKeys;
        if (this.props.selectedKey){
            selected=selectedRowKeys.length>0?selectedRowKeys:this.props.selectedKey
        }
        const rowSelection = {
            selectedRowKeys:selected,
            type:'radio',
            onChange: this.onSelectChange,
        };
        const hasSelected = selectedRows.length > 0;
        return (
            <>

                <Modal
                    width='50%'
                    title="顾客信息"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    okText="确认"
                    cancelText="取消"
                >
                    <Button type="primary" onClick={this.start} disabled={!hasSelected}>
                        重置
                    </Button>
                    <Table
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

export default CustomerModel;
