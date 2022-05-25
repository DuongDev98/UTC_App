import React, { Component } from 'react';
import LoginSc from './Login';
import RegisterSc from './Register';
import { TabView, SceneMap } from 'react-native-tab-view';
import Memory from '../utils/Memory';

class Login_Register extends Component {

    constructor () {
        super();
        this.state = {
            index: 0,
            routes: [
                { key: 'LoginSc', title: 'Đăng nhập' }, 
                { key: 'RegisterSc', title: 'Đăng ký' }
            ],
            renderScene: SceneMap({
                "LoginSc": ()=> <LoginSc navigation={this.props.navigation}/>,
                "RegisterSc": ()=> <RegisterSc navigation={this.props.navigation}/>,
            })
        };
    }

    componentDidMount() {
        Memory.SetUserInfo(null);
    }

    render () {
        return (
            <>
                <TabView
                    navigationState={this.state}
                    renderScene={this.state.renderScene}
                    onIndexChange={index=>{ this.setState({index: index}) }}
                />
            </>
        );
    };
};

export default Login_Register;