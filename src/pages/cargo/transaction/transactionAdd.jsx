import React, {Component} from 'react'
import {Button, DatePicker, Drawer, Form, Input, message, Radio} from "antd";
import moment from "moment";
import CustomerModel from "../../../components/customerModel";
import CargoModel from "../../../components/cargoModel";
import transactionService from "../../../api/transactionService";
import LinkButton from "../../../components/link-button";
import EditOutlined from "@ant-design/icons/lib/icons/EditOutlined";
import LockOutlined from "@ant-design/icons/lib/icons/LockOutlined";

/**
 *
 */
const {TextArea}=Input;
const {Item}=Form
class TransactionAdd extends Component {
    formRef = React.createRef();
    constructor(props) {
        super(props);
        this.state={
            // 抽屉的可见性
            visible:false,
            // 父组件传入的单行数据
            transactionData: {},
            amountDisable:true,
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        this.props.onRef(this)
        const {transactionData}=this.state
        if (transactionData&&this.formRef.current){
            // 日期需要格式化
            const value  = {
                ...transactionData,
            }
            this.formRef.current.setFieldsValue(value)
        }
    }

    // 提交表单
    handleSubmit= ()=>{
        this.formRef.current.validateFields().then( async value => {
            const {transactionData}=this.state;
            // 传入原始参数,和表单的最新值
            const params={
                ...transactionData,
                ...value,
                createDate:transactionData.createDate,
                lastUpdateDate:transactionData.lastUpdateDate,

            }
            // 发送保存请求
            const result =await transactionService.saveTransaction(params);
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

    // 打开货物选择框
    onCargoClick=()=>{
        this.SelectCargo.blur();
        this.cargoModel.showModal();
    }

    // 打开顾客选中框
    onCustomerClick=()=>{
        this.SelectCustomer.blur();
        this.customerModel.showModal();
    }

    // 货物选中弹框的确认回调
    onCargoOk = (value)=>{
        const {transactionData}=this.state;
        this.setState({
            transactionData: {
                ...transactionData,
                cargoId:value[0].id,
                cargoName:value[0].name,
                unitPrice:value[0].price,
            },
        },// 重新计算金额
            this.onChange);
    }

    // 顾客选中弹框的确认回调
    onCustomerOk = (value)=>{
        const {transactionData}=this.state;
        this.setState({
            transactionData: {
                ...transactionData,
                userId:value[0].id,
                userName:value[0].name
            },
        });
    };

    // 自动计算总金额
    onChange=(e)=>{
        const unitPrice = this.formRef.current.getFieldValue("unitPrice");
        const tradingVolume = this.formRef.current.getFieldValue("tradingVolume");
        if (unitPrice&&tradingVolume){
            const amount = unitPrice*tradingVolume
            this.formRef.current.setFieldsValue({"amount":amount});
            console.info(amount);
        }
    }

    // 修改总金额
    amountEdit=()=>{
        this.setState({amountDisable:false});
    }

    // 锁定金额
    amountLock=()=>{
        this.amount.blur();
        this.setState({amountDisable:true});
    }


    render() {
        const {visible,transactionData,amountDisable}=this.state;
        // form表单格式
        const formItemLayout = {
            labelCol: { span: 8 },
            wrapperCol: { span: 10, offset: 0 },
        };
        // 金额操作后缀
        const amountSuffix=(
            amountDisable?
                <LinkButton onClick={this.amountEdit}>
                    <EditOutlined />
                </LinkButton>:
                <LinkButton onClick={this.amountLock}>
                    <LockOutlined />
                </LinkButton>
        );
        return (
            <>
                <Drawer
                    title="添加交易记录"
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
                            label='货物编号'
                            name="cargoId"
                        >
                            <Input disabled type='number' placeholder="请输入货物编号"/>
                        </Item>
                        <Item
                            label='货物名称'
                            name="cargoName"
                        >
                            <Input
                                ref={ref => {
                                    this.SelectCargo = ref
                                }}
                                onFocus={this.onCargoClick}
                                placeholder={'请选择货物'}
                            />
                        </Item>
                        <Item
                            label='交易人编号'
                            name="userId"
                        >
                            <Input disabled type='number' placeholder="请输入交易人编号"/>
                        </Item>
                        <Item
                            label='交易人名称'
                            name="userName"
                        >
                            <Input
                                ref={ref => {
                                    this.SelectCustomer = ref
                                }}
                                onFocus={this.onCustomerClick}
                                placeholder={'请选择交易人'}
                            />
                        </Item>
                        <Item
                            label='交易单价'
                            name="unitPrice"
                        >
                            <Input type='number' onChange={this.onChange} placeholder="请输入交易单价"/>
                        </Item>
                        <Item
                            label='交易数量'
                            name="tradingVolume"
                        >
                            <Input type='number' onChange={this.onChange} placeholder="请输入交易数量"/>
                        </Item>
                        <Item
                            label='交易总金额'
                            name="amount"
                            initialValue={transactionData.amount}
                        >
                            <Input
                                ref={ref => {
                                    this.amount = ref
                                }}
                                disabled={amountDisable}
                                type='number'
                                suffix={amountSuffix}
                                placeholder="请输入交易总金额" />

                        </Item>
                        <Item
                            label='进货/出货'
                            name="status"
                            initialValue={false}
                        >
                            <Radio.Group>
                                <Radio value={true}>进货</Radio>
                                <Radio value={false}>出货</Radio>
                            </Radio.Group>
                        </Item>
                        <Item
                            label='备注信息'
                            name="note"
                        >
                            <TextArea placeholder="请输入备注信息" autoSize={{minRows:2,maxRows:6}} />
                        </Item>
                    </Form>
                </Drawer>

                {/*页面默认不显示的东西*/}
                <CustomerModel
                    onRef={ref=>this.customerModel = ref}
                    onOk={this.onCustomerOk}
                    selectedKey={[transactionData.userId]}
                />
                <CargoModel
                    onRef={ref=>this.cargoModel = ref}
                    onOk={this.onCargoOk}
                    selectedKey={[transactionData.cargoId]}
                />
            </>
        )
    }
}

export default TransactionAdd;
