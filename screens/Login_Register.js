import React, { Component, useEffect, useState } from 'react';
import LoginSc from './Login';
import RegisterSc from './Register';
import { TabView, SceneMap } from 'react-native-tab-view';
import Memory from '../utils/Memory';

function Login_Register({navigation}) {

    let [index, setIndex] = useState(0);
    let [routes, setRoutes] = useState([
        { key: 'LoginSc', title: 'Đăng nhập' },
        { key: 'RegisterSc', title: 'Đăng ký' }
    ]);

    let renderScene = SceneMap({
        "LoginSc": ()=> <LoginSc navigation={navigation}/>,
        "RegisterSc": ()=> <RegisterSc navigation={navigation}/>,
    });

    useEffect(()=>{
        //Memory.SetUserInfo(null);
    });

    return (
        <>
            <TabView
                navigationState={{index, routes}}
                renderScene={renderScene}
                onIndexChange={index=>setIndex(index)}
            />
        </>
    );
};

export default Login_Register;