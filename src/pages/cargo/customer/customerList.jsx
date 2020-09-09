import React, {Component} from 'react'
import {Button, Card, message, Popconfirm, Table, Tag, Tooltip} from "antd";
import PlusOutlined from "@ant-design/icons/lib/icons/PlusOutlined";
import LinkButton from "../../../components/link-button";
import customerService from "../../../api/customerService";
import CustomerDetail from "./customerDetail";
import CustomerAdd from "./customerAdd";
import CustomerSearchForm from "./customerSearchForm";


/**
 *
 */

class CustomerList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            columns:[
                {
                    title:'交易人名称',
                    align:'center',
                    render:(record =>{
                        return (
                            <Tooltip placement="top" title={record.id}>
                                <span>{record.name}</span>
                            </Tooltip>
                        )
                    })
                },
                {
                    title:'性别',
                    align:'center',
                    dataIndex:'sex',
                    render: sex => (
                        sex ?
                            <Tag color="blue">男</Tag> :
                            <Tag color="#87d068">女</Tag>
                    ),
                },
                {
                    title:'地址',
                    align:'center',
                    dataIndex:'address',
                },
                {
                    title:'联系方式',
                    align:'center',
                    dataIndex:'telephone',
                },
                {
                    title:'备注',
                    dataIndex:'note',
                    width:180,
                },
                {
                    title:'身份证号',
                    align:'center',
                    dataIndex:'cardNumber',
                },
                {
                    title:'操作',
                    width:130,
                    render:(record)=>{
                        return (
                            <span>
                                <LinkButton onClick={()=>this.showDrawer(record)}>编辑</LinkButton>
                                <Popconfirm
                                    title="确定要删除吗？(删除的数据将无法恢复)"
                                    onConfirm={()=>this.deleteCustomer(record)}
                                    okText="确定"
                                    cancelText="取消">
                                    <LinkButton>
                                        删除
                                    </LinkButton>
                                </Popconfirm>
                            </span>

                        )
                    }
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
                    this.selectCustomerPage(page,size)
                },
                showTotal:(total) => `一共有${total}条数据`,

            },
            customerData:{},
        }
    }
    componentWillMount() {
        const {pagination}=this.state;
        this.selectCustomerPage(pagination.current,pagination.pageSize)
    }

    // 获取数据源
    selectCustomerPage=async (page,size,searchParams)=> {
        this.setState({loading: true})
        const params = {
            ...searchParams,
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

    // 显示侧边抽屉并将数据传入给子组件
    showDrawer = (record) => {
        this.child.show();
        this.setState({
            customerData:record
        });
    };

    // 显示添加侧边框
    showDrawerAdd = ()=>{
        this.childAdd.show();
    }

    // 删除单行数据
    deleteCustomer=async (record)=>{
        const result=await customerService.deleteCustomerById(record.id);
        if (result.success){
            message.success('删除成功');
            this.reload();
        }else {
            message.error("删除失败");
        }
    }

    render() {
        const {columns,loading,pagination,dataSource,customerData}=this.state;
        const title=(
            <CustomerSearchForm search={this.selectCustomerPage}/>
        );
        return (
            <Card title={title}>
                <Button
                    type={"primary"}
                    style={{
                        margin: '10px 0',
                    }}
                    onClick={this.showDrawerAdd}
                    icon={<PlusOutlined />}>
                    添加
                </Button>
                <Table
                    size="middle"
                    bordered
                    rowKey="id"
                    loading={loading}
                    dataSource={dataSource}
                    columns={columns}
                    pagination={pagination}
                >
                </Table>
                
                <CustomerDetail
                    onRef={ref=>this.child = ref}
                    reload={this.reload}
                    customerData={customerData}
                />

                <CustomerAdd
                    onRef={ref=>this.childAdd = ref}
                    reload={this.reload}
                />
            </Card>
        )
    }
}

export default CustomerList;
