import React, {Component} from 'react'
import {Card,Form,Input,Cascader,Button,message} from "antd";
import ArrowLeftOutlined from "@ant-design/icons/lib/icons/ArrowLeftOutlined"
import LinkButton from "../../components/link-button";
import categoryService from "../../api/categoryService";
import memoryUtils from "../../utils/memoryUtils";
const {Item}=Form;
const {TextArea}=Input;
/**
 * 新增或更新商品
 */

class ProductAddUpdate extends Component {
    constructor(props){
        super(props);
        this.state={
            options:[],
            product:{},
        }

    }

    componentDidMount() {
        this.getCategoryList(0);
    }

    getCategoryList= async (parentId)=>{
        const {product}=this.state;
        // 获取一级分类列表
        const result=await categoryService.getProductCategoryList(parentId);
        if (result.success){
            const categoryList = result.data
            const options=categoryList.map(item=>({
                value:item.id,
                label:item.categoryName,
                isLeaf:false,
            }))

            // 如果是更新需要加载数据对应的一级分类的二级分类列表，以便于Cascader默认选中 , 且只在初始化时加载一次
            if (this.isUpdate&&parentId===0){
                const result=await categoryService.getProductCategoryList(product.parentTypeId);
                if (result.success){
                    const categoryList = result.data
                    if (categoryList&&categoryList.length>0){
                        // 找到对应需要加载的一级分类并添加子列表
                        const targetOption=options.find(option=>option.value===product.parentTypeId)
                        targetOption.children = categoryList.map(item=>({
                            value:item.id,
                            label:item.categoryName,
                        }))
                    }
                }else {
                    message.error(result.message)
                }
            }

            this.setState({options})
        }else {
            message.error(result.message)
        }

    }


    /*
     用于加载二级列表的回调函数
     */
    loadData = async selectedOptions => {
        // 得到选择的option对象
        const targetOption = selectedOptions[0];
        // 显示loading
        targetOption.loading = true;
        // 获取二级列表
        const result = await categoryService.getProductCategoryList(targetOption.value);
        if (result.success){
            const categoryList = result.data
            if (categoryList&&categoryList.length>0){
                targetOption.children = categoryList.map(item=>({
                    value:item.id,
                    label:item.categoryName,
                }))
            }
            targetOption.loading = false;
            this.setState({
                options: [...this.state.options],
            });
        }else {
            message.error(result.message)
        }
    };

    handleSubmit= values => {
        console.info(values)
    }

    componentWillMount() {
        // 取出携带的state
        const record = memoryUtils.product;
        // 保存是否是更新标志
        this.isUpdate = !!record.id;
        // 保存数据对象
        this.setState({product:record||{}})
    }

    render() {
        const {isUpdate}=this;
        const {product}=this.state;
        const categoryIds=[];
        if (isUpdate){
            categoryIds.push(product.parentTypeId);
            categoryIds.push(product.typeId);
        }

        const title =(
            <span>
                <LinkButton>
                    <ArrowLeftOutlined
                        style={{color:'green',marginRight:15,fontSize:20}}
                        onClick={()=>this.props.history.goBack()}/>
                </LinkButton>
                <span>
                    {isUpdate?'修改商品':'添加商品'}
                </span>
            </span>
        )
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 2 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
        };
        return (
            <Card title={title}>
                <Form {...formItemLayout} onFinish={this.handleSubmit}>
                    <Item
                        label='商品名称'
                        name="name"
                        initialValue={product.name}
                        rules={[
                            {required:true,message:'必须输入商品名称'}
                        ]}
                    >
                        <Input placeholder="请输入商品名称"/>
                    </Item>
                    <Item
                        label='商品描述'
                        name="description"
                        initialValue={product.description}
                        rules={[
                            {required:true,message:'必须输入商品描述'}
                        ]}
                    >
                        <TextArea placeholder="请输入商品描述" autoSize={{minRows:2,maxRows:6}} />
                    </Item>
                    <Item
                        label='商品价格'
                        name="price"
                        initialValue={product.price}
                        rules={[
                            {required:true,message:'必须输入商品价格'},
                            {validator:(rule, value)=>{
                                if (value>0){
                                    return Promise.resolve();
                                }else {
                                    return Promise.reject('商品价格必须大于0')
                                }
                            }},
                        ]}
                    >
                        <Input type='number' placeholder="请输入商品价格" addonAfter="元"/>
                    </Item>
                    <Item
                        label='商品分类'
                        name='typeId'
                        initialValue={categoryIds}
                        rules={[
                            {required:true,message:'必须选择商品分类'}
                        ]}
                    >
                        <Cascader
                            placeholder="请选择"
                            notFoundContent='暂无分类'
                            options={this.state.options}
                            loadData={this.loadData}
                        />
                    </Item>
                    <Item label='商品图片'>
                        <Input type='number' placeholder="商品图片" addonAfter="元"/>
                    </Item>
                    <Item label='商品详情'>
                        <Input type='number' placeholder="商品图片" addonAfter="元"/>
                    </Item>
                    <Item>
                        <Button type="primary" htmlType="submit">提交</Button>
                    </Item>
                </Form>
            </Card>
        )
    }
}

export default ProductAddUpdate;
