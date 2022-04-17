import React, { Component } from 'react';
import LoginSc from './Login';
import RegisterSc from './Register';
import { TabView, SceneMap } from 'react-native-tab-view';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Contants from '../utils/Contants';

const renderScene = SceneMap({
    "LoginSc": LoginSc,
    "RegisterSc": RegisterSc,
});

let index = 0;
let routes= [{ key: 'LoginSc', title: 'Đăng nhập' }, { key: 'RegisterSc', title: 'Đăng ký' }];

class Login_Register extends Component {

    constructor() {
        super();
        this.state = {
            user_info: null
        };
    }

    async componentDidMount() {
        //nếu đã đăng nhập thì chuyển sang trang chủ
        let user_info = await AsyncStorage.getItem(Contants.User);
        if (user_info != null && user_info.length > 0)
        {
            this.props.navigation.navigate("HomeSc");
        }
        else
        {
            this.setState({
                user_info: user_info
            });
        }
    }

    render () {
        return (
            <>
                {
                    this.state.user_info != null && this.state.user_info.length > 0
                    ? (
                        <TabView
                            navigationState={{ index, routes }}
                            renderScene={renderScene}
                            onIndexChange={i=>{ index = i; }}
                        />
                    ) : null
                }
            </>
        );
    };
};

export default Login_Register;