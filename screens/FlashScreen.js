import React, { Component, useEffect } from 'react';
import {View, StyleSheet, Text} from 'react-native';
import HttpClient from '../utils/HttpClient';
import Memory from '../utils/Memory';

function FlashScreen({navigation}) {

    useEffect(()=>{
        //Kiểm tra có kết nối mạng hay không
        HttpClient.GetJson("ping", {}).then(data=>{
            if (data.isSuccess)
            {
                //nếu đã đăng nhập thì chuyển sang trang chủ
                setTimeout(async ()=> {
                    //await Memory.SetUserInfo(null);
                    let o = await Memory.GetUserInfo();
                    if (o != null)
                    {
                        //cập nhật thông tin nếu có thay đổi
                        HttpClient.GetJson("getUserInfo", o).then(json=>{
                            if (json.isSuccess)
                            {
                                //Memory.SetUserInfo(json.data);
                                navigation.navigate("MainSc");
                            }
                            else
                            {
                                alert(json.message);
                            }
                        }).catch(err=>{
                            alert(err);
                        });;
                    }
                    else
                    {
                        navigation.navigate("Login_Register_Sc");
                    }
                }, 100);
            }
            else
            {
                alert("Không thể kết nối đến máy chủ");
            }
        }).catch(err=>{
            alert(err);
        });;
    });

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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 10
    }
});

export default FlashScreen;