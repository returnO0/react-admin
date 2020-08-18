import React, {Component} from 'react'
import {Form, Input} from 'antd'
import ProTypes from "prop-types";


const Item=Form.Item;
class UpdateForm extends Component {
    formRef = React.createRef();
    static propTypes={
        categoryName:ProTypes.string.isRequired,
        setForm:ProTypes.func.isRequired,
    };

    componentWillMount() {
        this.props.setForm(this.formRef);
    }

    componentDidUpdate() {
        this.formRef.current.setFieldsValue({
            categoryName: this.props.categoryName,
        });
    }

    render() {
        const {categoryName}=this.props;
        return (
            <Form ref={this.formRef}>
                <Item
                    name="categoryName"
                    initialValue={categoryName}
                    rules={[
                        {required:true , message:"分类名称不能为空"}
                    ]}
                >
                    <Input placeholder='请输入分类名称'/>
                </Item>
            </Form>
        )
    }
}

export default UpdateForm;
