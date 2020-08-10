import React, {Component} from 'react'
import {Form, Input, Select} from 'antd'


const Item=Form.Item;
class UpdateForm extends Component {
    formRef = React.createRef();
    render() {
        return (
            <Form ref={this.formRef}>
                <Item name="categoryName">
                    <Input placeholder='请输入分类名称'/>
                </Item>
            </Form>
        )
    }
}

export default UpdateForm;
