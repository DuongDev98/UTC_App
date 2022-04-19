import React, { Component } from 'react';
import {View, StyleSheet, Text} from 'react-native';
import HttpClient from '../utils/HttpClient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Contants from '../utils/Contants';

class FlashScreen extends Component {

    constructor() {
        super();
        this.state = {
            user_info: null
        };
    }

    async componentDidMount() {

        //Kiểm tra có kết nối mạng hay không
        let data = await HttpClient.GetJson("ping", {});
        if (data.isSuccess)
        {
            //nếu đã đăng nhập thì chuyển sang trang chủ
            setTimeout(async ()=> {
                let user_info = await AsyncStorage.getItem(Contants.User);
                if (user_info != null && user_info.length > 0)
                {
                    this.props.navigation.navigate("MainSc");
                }
                else
                {
                    this.props.navigation.navigate("Login_Register_Sc");
                }
            }, 100);
        }
        else
        {
            alert("Không thể kết nối đến máy chủ");
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>
                    ĐỒ ÁN TỐT NGHIỆP
                </Text>
                <Text>
                    Nguyễn Ngọc Dương
                </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 10
    }
});

export default FlashScreen;