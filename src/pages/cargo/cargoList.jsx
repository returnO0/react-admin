import React, {Component} from 'react'
import {Popconfirm, Button, Card, message, Table, Tooltip} from "antd";
import cargoService from "../../api/cargoService";
import CargoDetail from "./cargoDetail";
import LinkButton from "../../components/link-button";
import CargoAdd from "./cargoAdd";
import PlusOutlined from "@ant-design/icons/lib/icons/PlusOutlined";
import CargoSearchForm from "./cargoSearchForm";
/**
 *
 */

class CargoList extends Component {
    constructor(props) {
        super(props);
        this.state={
            columns:[
                {
                    title:'货物名称',
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
                    title:'货物价格',
                    align:'center',
                    dataIndex:'price',
                },
                {
                    title:'货物库存',
                    align:'center',
                    dataIndex:'inventory',
                },
                {
                    title:'货物备注',
                    dataIndex:'note',
                    width:180,
                },
                {
                    title:'创建时间',
                    align:'center',
                    dataIndex:'createDate',
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
                                    onConfirm={()=>this.deleteCargo(record)}
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
                    this.selectCargoPage(page,size)
                },
                showTotal:(total) => `一共有${total}条数据`,

            },
            cargoData:{},
        }
    }

    componentWillMount() {
        const {pagination}=this.state;
        this.selectCargoPage(pagination.current,pagination.pageSize)
    }




    // 获取表格数据源
    selectCargoPage=async (page,size,searchParams)=>{
        this.setState({loading:true})
        let params={
            ...searchParams,
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

    // 刷新表格
    reload=()=>{
        const {pagination}=this.state;
        this.selectCargoPage(pagination.current,pagination.pageSize)
    }

    // 显示侧边抽屉并将数据传入给子组件
    showDrawer = (record) => {
        this.child.show();
        this.setState({
            cargoData:record
        });
    };

    // 显示侧边抽屉新增数据
    showDrawerAdd = () => {
        this.childAdd.show();
    };

    // 删除数据
    deleteCargo = async (record)=>{
        const result=await cargoService.deleteCargoById(record.id);
        if (result.success){
            message.success('删除成功');
            this.reload();
        }else {
            message.error("删除失败");
        }
    }

    render() {
        const {columns,loading,pagination,dataSource,cargoData}=this.state;
        const title=(
            <CargoSearchForm
                search={this.selectCargoPage}
            />
        );
        return (
            <Card title={title}>
                <Button
                    type={"primary"}
                    style={{
                        margin: '10px 0',
                    }}
                    onClick={this.showDrawerAdd} icon={<PlusOutlined />}>
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
                <CargoDetail
                    reload={this.reload}
                    onRef={ref=>this.child = ref}
                    cargoData={cargoData}
                />
                <CargoAdd
                    reload={this.reload}
                    onRef={ref=>this.childAdd = ref}
                />
            </Card>
        )
    }
}

export default CargoList;
