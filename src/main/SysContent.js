import React, {Component } from 'react';
import { Layout, Breadcrumb } from 'antd';
import 'antd/dist/antd.css';
import Records from '../components/records/Records';

const { Content } = Layout;

class SysContent extends Component{
    render(){
        console.log(this.props.meunType);
        const keyPaths = this.props.meunType.keyPath;

        return(
            <Content style={{ margin: '0 16px' }}>
                <Breadcrumb style={{ margin: '12px 0' }} routes={keyPaths}></Breadcrumb>
                <div style={{ padding: 24, background: '#fff', minHeight: 780 }}>
                    <Records />
                </div>
            </Content>
        );
    }

}

export default SysContent