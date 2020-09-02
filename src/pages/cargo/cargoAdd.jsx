import React, {Component} from 'react'
import {Button, Drawer, Form, Input, message} from "antd";
import cargoService from "../../api/cargoService";

/**
 *
 */
const {TextArea}=Input;
const {Item}=Form
class CargoAdd extends Component {

    formRef = React.createRef();
    constructor(props) {
        super(props);
        this.state={
            // 抽屉的可见性
            visible:false,
            // 父组件传入的单行数据
            cargoData: {},
            // 确认按钮loading效果
        }
    }

    // 提交表单
    handleSubmit= ()=>{
        this.formRef.current.validateFields().then( async value => {
            // 传入原始参数,和表单的最新值
            const params={
                ...value,
            }
            // 发送保存请求
            const result =await cargoService.saveCargo(params);
            if (result.success){
                message.success('保存成功')
                this.props.reload();
                this.onClose()
            }else {
                message.error(result.message);
            }
        }).catch(errinfo=>{
            message.error("请检查表单")
        })
    }


    componentDidUpdate(prevProps, prevState, snapshot) {
        this.props.onRef(this)
    }

    // 显示侧边抽屉并将数据传入给子组件
    show=() => {
        debugger
        this.setState({
            visible: true,
        });
    };

    // 关闭弹框
    onClose = () => {
        this.setState({
            visible: false,
        });
    };
    render() {
        const {visible,cargoData}=this.state;
        const formItemLayout = {
            labelCol: { span: 8 },
            wrapperCol: { span: 10, offset: 0 },
        };
        return (
            <>
                <Drawer
                    title="新增货物"
                    width={720}
                    onClose={this.onClose}
                    visible={visible}
                    bodyStyle={{ paddingBottom: 80 }}
                    footer={
                        <div
                            style={{
                                textAlign: 'right',
                            }}
                        >
                            <Button
                                type="primary"
                                onClick={this.handleSubmit}
                            >
                                保存
                            </Button>
                            <Button onClick={this.onClose} style={{ marginRight: 8 }}>
                                取消
                            </Button>
                        </div>
                    }
                >
                    <Form ref={this.formRef} {...formItemLayout} hideRequiredMark >
                        <Item
                            label='货物名称'
                            name="name"
                            initialValue={cargoData.name}
                            rules={[
                                {required:true,message:'必须输入货物名称'}
                            ]}
                        >
                            <Input placeholder="请输入货物名称"/>
                        </Item>
                        <Item
                            label='货物价格'
                            name="price"
                            rules={[
                                {required:true,message:'必须输入货物价格'},
                                {validator:(rule, value)=>{
                                    if (value>0){
                                        return Promise.resolve();
                                    }else {
                                        return Promise.reject('货物价格必须大于0')
                                    }
                                }},
                            ]}
                        >
                            <Input type='number' placeholder="请输入货物价格" addonAfter="元"/>
                        </Item>
                        <Item
                            label='初始货物库存'
                            name="inventory"
                            rules={[
                                {required:true,message:'必须输入初始货物库存'},
                                {validator:(rule, value)=>{
                                    if (value>=0){
                                        return Promise.resolve();
                                    }else {
                                        return Promise.reject('初始货物库存不能为负数')
                                    }
                                }},
                            ]}
                        >
                            <Input type='number' placeholder="请输入初始货物库存"/>
                        </Item>
                        <Item
                            label='备注信息'
                            name="note"
                            rules={[
                                {required:true,message:'必须输入备注信息'}
                            ]}
                        >
                            <TextArea placeholder="请输入备注信息" autoSize={{minRows:2,maxRows:6}} />
                        </Item>
                    </Form>

                </Drawer>
            </>
        )
    }
}

export default CargoAdd;
