import React, {Component} from 'react'
import {Button, Card, message, Modal, Table} from "antd";
import PlusOutlined from "@ant-design/icons/lib/icons/PlusOutlined";
import LinkButton from "../../components/link-button";
import categoryService from "../../api/categoryService";
import ArrowRightOutlined from "@ant-design/icons/lib/icons/ArrowRightOutlined";
import AddForm from "./addForm";
import UpdateForm from "./updateForm";
/**
 * 商品分类路由
 */
class Category extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categoryData:[],    //一级分类列表
            subCategory:[],     //二级分类列表
            loading:true,       //是否加载中
            parentId:'0',       //父类别id
            parentName: '',     //当前显示分类名称
            showStatus: 0,      //标识添加/更新的确认框是否显示(0:都不显示,1:显示添加,2:显示更新)
        };
    }

    /*
    初始化Table所有的列
     */
    initColumns=()=>{
        this.columns = [
            {
                title: '分类的名称',
                dataIndex: 'categoryName'
            },
            {
                title: '操作',
                render: (category)=>(
                    <span>
                        <LinkButton onClick={()=>this.showUpdate(category)}>修改分类</LinkButton>
                        {/*如何向事件回调函数传递参数:先定义一个匿名函数,在函数中调用处理的函数并传递数据*/}
                        {this.state.parentId==='0'&&(<LinkButton onClick={()=>{this.showSubCategoryList(category)}}>查看子分类</LinkButton>
                        )}
                    </span>
                )
            }
        ]
    };

    /*
    初始化分类别表显示
     */
    getProductCategoryList=async ()=>{
        const {parentId}=this.state;
        const result=await categoryService.getProductCategoryList(parentId);
       if (result.success){
           const categoryData=result.data;
           if (parentId==='0'){
               this.setState({categoryData})
           }else {
               this.setState({subCategory:categoryData})
           }
       } else {
           message.error(result.message);
       }
       this.setState({loading:false})
    };

    /*
    显示分类的一级列表
     */
    showCategoryList=()=>{
        this.setState({
            parentId:'0',
            parentName:'',
            subCategory:[]
        })
    };

    /*
    显示指定分类的二级列表
     */
    showSubCategoryList = (category)=>{
        // setState是异步执行
        this.setState({
            parentId:category.id,
            parentName:category.categoryName
        },()=>{
            this.getProductCategoryList();
        });

    };

    /*
    模态框取消按钮
     */
    handleCancel=()=>{
        this.setState({
            showStatus:0
        })
    };

    /*
    显示添加
     */
    showAdd=()=>{
        this.setState({
            showStatus:1
        })
    };

    /*
    添加分类
     */
    addCategory=()=>{
        message.info('addCategory')
    };

    /*
    显示更新
     */
    showUpdate=(category)=>{
        // 保存分类对象
        this.category=category;
        this.setState({
            showStatus:2
        })
    };

    /*
    更新分类
     */
    updateCategory=()=>{
        message.info('updateCategory')
    };

    /*
    为第一次render()准备数据
     */
    componentWillMount() {
        this.initColumns();
    }

    /*
     执行异步请求
     */
    componentDidMount() {
        this.getProductCategoryList();
    }

    render() {
        const extra = (
            <Button type={"primary"} onClick={this.showAdd} icon={<PlusOutlined />}>
                添加
            </Button>
        );
        const category=this.category;
        const {
            categoryData,
            loading,
            subCategory,
            parentName,
            parentId,
            showStatus,
        } = this.state;

        const title = parentId==='0'?'一级分类列表':(
            <span>
                <LinkButton  onClick={this.showCategoryList}>一级分类列表</LinkButton>
                <ArrowRightOutlined style={{marginRight:8}} />
                <span>{parentName}</span>
            </span>
        );

        return (
            <Card title={title} extra={extra}>
                <Table
                    bordered
                    rowKey='key'
                    dataSource={parentId==='0'?categoryData:subCategory}
                    columns={this.columns}
                    loading={loading}
                    pagination={{
                        defaultPageSize:5,
                        pageSizeOptions:[5,10,20,50],
                        showSizeChanger:true,
                        showQuickJumper:true,
                    }}
                />

                <Modal
                    title="添加分类"
                    visible={showStatus===1}
                    onOk={this.addCategory}
                    onCancel={this.handleCancel}
                    okText="确认"
                    cancelText="取消"
                >
                    <AddForm />
                </Modal>

                <Modal
                    title="更新分类"
                    visible={showStatus===2}
                    onOk={this.updateCategory}
                    onCancel={this.handleCancel}
                    okText="确认"
                    cancelText="取消"
                >
                 <UpdateForm
                    categoryName={category.categoryName}
                 />
                </Modal>
            </Card>
        )
    }
}

export default Category;
