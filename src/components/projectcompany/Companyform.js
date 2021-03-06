import React, { Component } from 'react';
/*import * as RecordsAPI from '../../util/RecordsAPI'*/
import 'antd/dist/antd.css';
import Companyform from './Companyform.css'
import { Modal} from 'antd';
import * as net from "../../util/common";
import {message} from "antd/lib/index";
class Companylist extends Component {
    constructor(props) {
        super(props);
        this.state = {
            edit: false
        };
    }

    handleToggle(){
        this.setState({
            edit: !this.state.edit
        });
    }
    /*编辑*/
    handleEdit(event) {
        event.preventDefault();
        /*数据请求响应，编辑后数据直接实时呈现*/
        let PostData = {
           /* uId: RecordsAPI.uId,*/
            uId: net.getCookie("userId"),
            Id: this.props.companyform.id,
            name: this.refs.name.value,
           /* firstPart: this.refs.firstPart.value,*/
            managerName: this.refs.managerName.value,
            managerPhone: this.refs.managerPhone.value
        }
        console.log( PostData)
        net.axiosPost("updateCompany","projectCompanyController",PostData,net.guid()).then(
            response => {
                console.log(response)
                this.setState({
                    edit: false
                });
                this.props.handleEditCompanyform(this.props.companyform, response);
            }
        ).catch(
            error => console.log(error.message)
        )
    }

    handleInformationOnClick(){
        this.props.handleInformationOnClick(this.props.companyform);
    }
    /*   删除操作*/
    state = { visible: false }
    handleDeleteClick = () => {
        this.setState({
            visible: true,
        });
    }
    handleOk = (e) => {
        console.log(e);
        this.setState({
            visible: false,
        });
        let postDatas = {
           /* uId: RecordsAPI.uId,*/
            uId: net.getCookie("userId"),
            Id: this.props.companyform.id
        }
        net.axiosPost("deleteCompany","projectCompanyController",postDatas,net.guid()).then(
            response =>
                this.props.handleDeleteClick(this.props.companyform)

        ).catch(
            error => console.log(error.message)
        )
    }
    handleCancel = (e) => {
        console.log(e);
        this.setState({
            visible: false,
        });
    }
    companyRom() {
        return (
            <tr className="trs">
                <td>{this.props.companyform.name}</td>
                {/*<td>{this.props.companyform.firstPart}</td>*/}
                <td>{this.props.companyform.managerName}</td>
                <td>{this.props.companyform.managerPhone}</td>
                <td>
                    <button className="btn btn-info mr-1" onClick={this.handleToggle.bind(this)}>编辑</button>
                    <button type="primary" className="btn btn-danger mr-1" onClick={this.handleDeleteClick.bind(this)}>删除</button>
                    <Modal
                        title="删除"
                        visible={this.state.visible}
                        okText="确定"
                        cancelText="取消"
                        onOk={this.handleOk}
                        onCancel={this.handleCancel}
                    >
                        <p>确定要删除 <strong>{this.props.companyform.name}</strong>公司吗？</p>
                    </Modal>
                    <button className="btn btn-info" onClick={this.handleInformationOnClick.bind(this)}>详情</button>
                </td>
            </tr>
        );
    }

     companyDom() {
         return (
             <tr className="trs">
                 <td><input type="text" className="form-control" defaultValue={this.props.companyform.name} ref="name" /></td>
                 {/*<td><input type="text" className="form-control" defaultValue={this.props.companyform.firstPart} ref="firstPart" /></td>*/}
                 <td><input type="text" className="form-control" defaultValue={this.props.companyform.managerName} ref="managerName" /></td>
                 <td><input type="text" className="form-control" defaultValue={this.props.companyform.managerPhone} ref="managerPhone" /></td>
                 <td>
                     <button className="btn btn-info mr-1" onClick={this.handleEdit.bind(this)}>更新</button>
                     <button className="btn btn-danger" onClick={this.handleToggle.bind(this)}>取消</button>
                     <button className="btn btn-info" onClick={this.handleInformationOnClick.bind(this)}>详情</button>
                 </td>
             </tr>
         );
     }
     render() {
         if (this.state.edit) {
             return this.companyDom();
         } else {
             return this.companyRom();
         }
     }
}
export default  Companylist;