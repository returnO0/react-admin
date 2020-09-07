import React, {Component} from 'react'
import {Button, Drawer, Form, Input, message, Radio} from "antd";
import customerService from "../../../api/customerService";

/**
 *
 */
const {TextArea}=Input;
const {Item}=Form
class CustomerAdd extends Component {
    formRef = React.createRef();
    constructor(props) {
        super(props);
        this.state={
            // 抽屉的可见性
            visible:false,
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        this.props.onRef(this)
    }

    // 提交表单
    handleSubmit= ()=>{
        this.formRef.current.validateFields().then( async value => {
            // 传入原始参数,和表单的最新值
            const params={
                ...value,
            }
            // 发送保存请求
            const result =await customerService.saveCustomer(params);
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

    // 显示侧边抽屉
    show=() => {
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
        const {visible}=this.state;
        const formItemLayout = {
            labelCol: { span: 8 },
            wrapperCol: { span: 10, offset: 0 },
        };
        return (
            <>
                <Drawer
                    title="新增客户信息"
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
                    <Form ref={this.formRef} {...formItemLayout} >
                        <Item
                            label='姓名'
                            name="name"
                            rules={[
                                {required:true,message:'必须输入货物名称'}
                            ]}
                        >
                            <Input placeholder="请输入货物名称"/>
                        </Item>
                        <Item
                            label='性别'
                            name="sex"
                            initialValue={true}
                        >
                            <Radio.Group>
                                <Radio value={true}>男</Radio>
                                <Radio value={false}>女</Radio>
                            </Radio.Group>
                        </Item>
                        <Item
                            label='联系方式'
                            name="telephone"
                        >
                            <Input placeholder="请输入联系方式"/>
                        </Item>
                        <Item
                            label='地址'
                            name="address"
                        >
                            <TextArea placeholder="请输入地址" autoSize={{minRows:2,maxRows:6}} />
                        </Item>
                        <Item
                            label='备注信息'
                            name="note"
                        >
                            <TextArea placeholder="请输入备注信息" autoSize={{minRows:2,maxRows:6}} />
                        </Item>
                        <Item
                            label='身份证号'
                            name="cardNumber"
                        >
                            <Input placeholder="请输入身份证号"/>
                        </Item>

                    </Form>

                </Drawer>
            </>
        )
    }

}

export default CustomerAdd;
