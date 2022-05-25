import React, { Component } from 'react';
import {View, StyleSheet, Text} from 'react-native';
import HttpClient from '../utils/HttpClient';
import Memory from '../utils/Memory';

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
                //await Memory.SetUserInfo(null);
                let o = await Memory.GetUserInfo();
                if (o != null)
                {
                    //cập nhật thông tin nếu có thay đổi
                    let json = await HttpClient.GetJson("getUserInfo", o);
                    if (json.isSuccess)
                    {
                        Memory.SetUserInfo(json.data);
                        this.props.navigation.navigate("MainSc");
                    }
                    else
                    {
                        alert(json.message);
                    }
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