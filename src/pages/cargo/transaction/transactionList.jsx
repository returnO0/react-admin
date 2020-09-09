import React, {Component} from 'react'
import {Tooltip,Tag,Popconfirm,Button, Card, message, Table} from "antd";
import PlusOutlined from "@ant-design/icons/lib/icons/PlusOutlined";
import transactionService from "../../../api/transactionService";
import TransactionDetail from "./transactionDetail";
import LinkButton from "../../../components/link-button";
import TransactionAdd from "./transactionAdd";
import TransactionSearchFrom from "./transactionSearchFrom";

/**
 *
 */

class TransactionList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            columns:[
                {
                    title:'交易流水号',
                    align:'center',
                    dataIndex:'id',
                },
                {
                    title:'货物名称',
                    align:'center',
                    render:(record =>{
                        return (
                            <Tooltip placement="top" title={record.cargoId}>
                                <span>{record.cargoName}</span>
                            </Tooltip>
                        )
                    })
                },
                {
                    title:'交易人名称',
                    align:'center',
                    render:(record =>{
                        return (
                            <Tooltip placement="top" title={record.userId}>
                                <span>{record.userName}</span>
                            </Tooltip>
                        )
                    })
                },
                {
                    title:'交易单价',
                    align:'center',
                    dataIndex:'unitPrice',
                },
                {
                    title:'交易数量',
                    align:'center',
                    dataIndex:'tradingVolume',
                },
                {
                    title:'交易总金额',
                    align:'center',
                    dataIndex:'amount',
                },
                {
                    title:'进货/出货',
                    align:'center',
                    dataIndex:'status',
                    render: status => (
                        status ?
                            <Tag color="green">进货</Tag> :
                            <Tag color="red">出货</Tag>
                    ),

                },

                {
                    title:'备注',
                    dataIndex:'note',
                    width:180,
                },
                {
                    title:'交易时间',
                    align:'center',
                    dataIndex:'createDate',
                },
                {
                    title:'最后更新时间',
                    align:'center',
                    dataIndex:'lastUpdateDate',
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
                                    onConfirm={()=>this.deleteTransaction(record)}
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
                    this.selectTransactionPage(page,size)
                },
                showTotal:(total) => `一共有${total}条数据`,

            },
            transactionData:{},
        }
    }

    componentWillMount() {
        const {pagination}=this.state;
        this.selectTransactionPage(pagination.current,pagination.pageSize)
    }

    // 获取数据源
    selectTransactionPage=async (page,size,searchParams)=>{
        this.setState({loading:true})
        const params={
            ...searchParams,
            page:page-1,
            size:size
        }
        const result=await transactionService.selectTransactionPage(params);
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
        this.selectTransactionPage(pagination.current,pagination.pageSize)
    }

    // 显示侧边抽屉并将数据传入给子组件
    showDrawer = (record) => {
        this.child.show();
        this.setState({
            transactionData:record
        });
    };

    // 显示添加侧边框
    showDrawerAdd = ()=>{
        this.childAdd.show();
    }

    // 删除单行数据
    deleteTransaction=async (record)=>{
        const result=await transactionService.deleteTransactionById(record.id);
        if (result.success){
            message.success('删除成功');
            this.reload();
        }else {
            message.error("删除失败");
        }
    }


    render() {
        const {columns,loading,pagination,dataSource,transactionData}=this.state;
        const title=(
            <TransactionSearchFrom search={this.selectTransactionPage}/>
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

                {/*页面默认不显示的东西*/}
                <TransactionDetail
                    onRef={ref=>this.child = ref}
                    reload={this.reload}
                    transactionData={transactionData}
                />
                <TransactionAdd
                    onRef={ref=>this.childAdd = ref}
                    reload={this.reload}
                />
            </Card>
        )
    }
}

export default TransactionList;
