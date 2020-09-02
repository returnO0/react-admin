import React, {Component} from 'react'
import {Popconfirm,Button, Card, message, Table} from "antd";
import cargoService from "../../api/cargoService";
import CargoDetail from "./cargoDetail";
import LinkButton from "../../components/link-button";
import CargoAdd from "./cargoAdd";
import PlusOutlined from "@ant-design/icons/lib/icons/PlusOutlined";
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
                    dataIndex:'name',
                },
                {
                    title:'货物价格',
                    dataIndex:'price',
                },
                {
                    title:'货物库存',
                    dataIndex:'inventory',
                },
                {
                    title:'货物备注',
                    dataIndex:'note',
                    width:180,
                },
                {
                    title:'创建时间',
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
                pageSize:5,
                pageSizeOptions:[5,10,20,50],
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
    selectCargoPage=async (page,size)=>{
        this.setState({loading:true})
        const params={
            page:page-1,
            size:size
        }
        const result = await cargoService.selectCargoPage(params);
        debugger
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



    // 子组件对象
    onRefAdd = (ref) => {
        this.childAdd = ref
    };



    render() {
        const {columns,loading,pagination,dataSource,cargoData}=this.state;
        const title='货物管理';
        const extra=(
            <Button type={"primary"} onClick={this.showDrawerAdd} icon={<PlusOutlined />}>
            添加
            </Button>
        )
        return (
            <Card title={title} extra={extra}>
                <Table
                    bordered
                    rowKey="dataIndex"
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
