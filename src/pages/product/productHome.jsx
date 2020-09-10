import React, {Component} from 'react'
import  {Card, Button, Select, Input,Table,message} from 'antd'
import PlusOutlined from "@ant-design/icons/lib/icons/PlusOutlined";
import LinkButton from "../../components/link-button";
import productService from "../../api/productService";
import memoryUtils from "../../utils/memoryUtils";
/**
 * 商品管理
 */
const { Option } = Select;
class ProductHome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource:[],    //一级分类列表
            columns:[],     //二级分类列表
            loading:true,       //是否加载中
            parentId:'0',       //父类别id
            parentName: '',     //当前显示分类名称
            showStatus: 0,      //标识添加/更新的确认框是否显示(0:都不显示,1:显示添加,2:显示更新)
            pagination:{        //分页参数
                current:1,
                pageSize:5,
                pageSizeOptions:[5,10,20,50],
                showSizeChanger:true,
                onChange:(page,size)=>{
                    const {pagination} = this.state
                    pagination.current=page;
                    pagination.pageSize=size
                    this.getProducts(page,size)
                },
            },
            page:0,
            size:5,
            searchType:'name',  //搜索类型
            searchValue: '',    //搜索类容
        };
    }

    componentWillMount() {
        const {pagination}=this.state;
        this.getProducts(pagination.current,pagination.pageSize);
        this.initColumns();
    }

    /*
   初始化Table所有的列
    */
    initColumns=()=>{
        // table列
        this.columns = [
            {
                title: '商品名称',
                dataIndex: 'name',
            },
            {
                title: '描述',
                dataIndex: 'description',
            },
            {
                title: '价格',
                dataIndex: 'price',
                render:(price)=> '￥'+price  // 当前对象指定了对应的属性,传入的对应的属性值 否则是record整行的值

            },
            {
                title: '状态',
                width:100,
                // dataIndex: 'status',
                render:(record)=>{
                    const tip=record.status===false?'上架':'下架'
                    return (
                        <span style={{display:'block',textAlign:'center'}}>
                            <Button
                                type="primary"
                                onClick={()=>this.updateStatus(record.id,tip)}>
                                {tip}
                            </Button>
                            <span>{record.status===false?'已下架':'在售'}</span>
                        </span>
                    )
                }
            },
            {
                title: '操作',
                width:130,
                render:(record)=>{
                    return (
                        <span>
                            <LinkButton onClick={()=>this.showDetail(record)}>详情</LinkButton>
                            <LinkButton onClick={()=>this.showAddUpdate(record)}>修改</LinkButton>
                        </span>
                    )
                }
            },
        ];
    }

    showDetail=(product)=>{
        //缓存product对象
        memoryUtils.product=product;
        this.props.history.push('/product/detail')
    }

    showAddUpdate=(product)=>{
        //缓存product对象
        memoryUtils.product=product;
        this.props.history.push('/product/addUpdate')
    }

    // 获取数据
    getProducts = async (page,size)=>{
        const {searchType,searchValue}=this.state;
        this.setState({loading:true})
        let params;
        // 分页参数
        params={page:page-1,size:size}
        // 存储当前页数和大小
        this.page=params.page+1;
        this.size=params.size;
        // 如果查询参数不为空则为条件查询
        let result;
        if (searchValue&&searchValue!==''){
            if (searchType==='name'){
                params={
                    ...params,
                    name:searchValue,
                }
                result = await productService.selectListByName(params);
            } else if (searchType==='description'){
                params={
                    ...params,
                    description:searchValue,
                }
                result = await productService.selectListByDescription(params);
            }
        }else {
            result = await productService.selectList(params);
        }
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

    /*
    更新商品状态
     */
    updateStatus= async (id,tip)=>{
        const result =await productService.updateStatus(id);
        if (result.success){
            message.success('商品'+tip+'成功');
        }else {
            message.error(result.message);
        }
        this.getProducts(this.page,this.size);
    }

    render() {
        const {pagination,dataSource,loading,searchType,searchValue}=this.state
        // card 标题
        const title = (
            <span>
                <Select
                    defaultValue={searchType}
                    onChange={value=>{this.setState({searchType:value})}}>
                    <Option value="name">按名称搜索</Option>
                    <Option value="description">按描述搜索</Option>
                </Select>
                <Input
                    placeholder="关键字"
                    style={{width:150,margin:'0 15px'}}
                    value={searchValue}
                    onChange={event=>{this.setState({searchValue:event.target.value})}}
                />
                <Button type="primary" onClick={()=>{
                    pagination.current=1;
                    this.setState({pagination})
                    this.getProducts(1,pagination.pageSize)
                }}>搜索</Button>
            </span>
        )
        // card 右上角
        const extra = (
            <Button type="primary" icon={<PlusOutlined />}>
                添加商品
            </Button>
        )

        return (
            <Card title={title} extra={extra}>
                <Table
                    bordered
                    rowKey="id"
                    loading={loading}
                    dataSource={dataSource}
                    columns={this.columns}
                    pagination={pagination}
                >

                </Table>
            </Card>
        )
    }
}

export default ProductHome;
