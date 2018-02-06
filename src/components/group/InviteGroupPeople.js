import React, {Component} from 'react';


import {Modal, Button} from 'antd';
import {Input} from 'antd';

export default  class InviteGroupPeople extends Component {
    //  type 1，邀请，2删除
    constructor(props) {
        super(props);
        this.state = {
            phone: '',
            alertShow: false,
            creatBtnName: '邀请',
            type: 1
        }
    }

    state = {visible: false}
    showModal = () => {
        this.setState({
            visible: true,
            type: 1,
            creatBtnName: '邀请',
        });
    }

    showdeleteModal = () => {
        this.setState({
            visible: true,
            type: 2,
            creatBtnName: '删除',
        });
    }

    handleOk = (e) => {
        this.setState({
            visible: false,
        });
        if (this.state.type == 1) {
            this.props.handleInviteRecord(this.props.groupItem.id,this.state.phone);
        }
        else {
            this.props.handleDeleteRecord(this.props.groupItem.id);
        }
    }

    handleCancel = (e) => {
        console.log(e);
        this.setState({
            visible: false,
        });
    }

    phoneChange(event) {
        this.setState({
            phone: event.target.value
        })
    }

    render() {
        let retunResult;
        if (this.state.type == 1) {
            retunResult = <Input placeholder="手机号" type="number" name="phone"
                                 onChange={this.phoneChange.bind(this)} id="phone"/>
        }
        else {
            retunResult = <div>确定要删除组吗？</div>
        }

        return (
            <div className="row">
                <Button onClick={this.showModal}>邀请</Button>
                <Button onClick={this.showdeleteModal} className="ml-3">删除组</Button>
                <Button className="ml-3">查看组成员{this.props.groupItem.id}</Button>

                <Modal
                    title={this.state.creatBtnName}
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    cancelText="取消"
                    okText={this.state.creatBtnName}>
                    {retunResult}
                </Modal>
            </div>
        );
    }
}