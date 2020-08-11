import React, {Component} from 'react'
import {Form, Input, Select} from 'antd'
import ProTypes from "prop-types";

const Item=Form.Item;
const Option=Select.Option;
class AddForm extends Component {
    static propTypes={
        categorys: ProTypes.array.isRequired,
        parentId:ProTypes.string.isRequired,
    }

    componentWillMount() {
        this.props.setForm(this.formRef);
    }

    componentDidUpdate() {
        this.formRef.current.setFieldsValue({
            parentId: this.props.parentId,
        });
    }

    formRef = React.createRef();
    render() {
        const {categorys,parentId}=this.props;
        return (
            <Form ref={this.formRef}>
                <Item name="parentId" initialValue={parentId||'0'}>
                    <Select>
                        <Option value='0'>一级分类</Option>
                        {
                            categorys.map(item=><Option value={item.id}>{item.categoryName}</Option>)
                        }
                    </Select>
                </Item>
                <Item
                    name="categoryName"
                    rules={[
                    {required:true , message:"分类名称不能为空"}
                ]}>
                    <Input placeholder='请输入分类名称'/>
                </Item>
            </Form>
        )
    }
}

export default AddForm;
