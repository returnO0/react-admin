import React, {Component} from 'react'
import {Form, Input, Select} from 'antd'
import ProTypes from "prop-types";

const Item=Form.Item;
const Option=Select.Option;
class AddForm extends Component {
    static propTypes={
        categoryName:ProTypes.string.isRequired
    };

    formRef = React.createRef();
    render() {
        return (
            <Form ref={this.formRef}>
                <Item name="parentId" initialValue='0'>
                    <Select>
                        <Option value='0'>一级分类</Option>
                        <Option value='1'>电脑</Option>
                        <Option value='2'>图书</Option>
                    </Select>
                </Item>
                <Item name="categoryName">
                    <Input placeholder='请输入分类名称'/>
                </Item>
            </Form>
        )
    }
}

export default AddForm;
