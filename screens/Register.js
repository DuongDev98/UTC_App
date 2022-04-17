import { View, StyleSheet } from 'react-native';
import React, { Component } from 'react';
import { Button, TextInput, HelperText } from 'react-native-paper';
import HttpClient from '../utils/HttpClient';

class Register extends Component {

    constructor(){
        super();
        this.state = {
            name: "",
            errorName:"",
            username: "",
            errorUsername:"",
            password: "",
            errorPassword: "",
            cfPassword: "",
            errorCfPassword: ""
        };
    };

    async btnRegister_Click() {
        if (this.state.name.length == 0) {
            this.setState({errorName: "Họ và tên trống"});
            return;
        }
        if (this.state.username.length == 0) {
            this.setState({errorUsername: "Thông tin tài khoản trống"});
            return;
        }
        if (this.state.password.length == 0) {
            this.setState({errorPassword: "Mật khẩu trống"});
            return;
        }
        if (this.state.password != this.state.cfPassword) {
            this.setState({errorCfPassword: "Xác nhận mật khẩu không đúng"});
            return;
        }

        let param = {
            taikhoan: this.state.username,
            matkhau: this.state.password,
            hovaten: this.state.name
        };

        let data = await HttpClient.GetJson("register", param);
        if (data.isSuccess)
        {
            alert(data);
        }
        else
        {
            alert(data.message);
        }
    }

    render() {
        return (
        <View style={styles.container}>
         <TextInput style={styles.textInput} label="Họ và tên" placeholder='Nhập họ và tên' value={this.state.name} onChangeText={text => this.setState({name: text})} />
            {
                this.state.errorName.length ?
                <HelperText type="error" visible={true}>
                    {this.state.errorName}
                </HelperText>
                : null
            }
            <TextInput style={styles.textInput} label="Tài khoản" placeholder='Nhập username | Email | Điện thoại' value={this.state.username} onChangeText={text => this.setState({username: text})} />
            {
                this.state.errorUsername.length ?
                <HelperText type="error" visible={true}>
                    {this.state.errorUsername}
                </HelperText>
                : null
            }
            <TextInput style={styles.textInput} label="Mật khẩu" placeholder='Nhập mật khẩu' value={this.state.password} secureTextEntry onChangeText={text => this.setState({password: text})} />
            {
                this.state.errorPassword.length ?
                <HelperText type="error" visible={true}>
                    {this.state.errorPassword}
                </HelperText>
                : null
            }
            <TextInput style={styles.textInput} label="Xác nhận mật khẩu" placeholder='Nhập lại mật khẩu' value={this.state.cfPassword} secureTextEntry onChangeText={text => this.setState({cfPassword: text})} />
            {
                this.state.errorCfPassword.length ?
                <HelperText type="error" visible={true}>
                    {this.state.errorCfPassword}
                </HelperText>
                : null
            }
            <Button icon="account-plus" mode='contained' style={styles.btn} onPress={()=>this.btnRegister_Click()}>Đăng ký</Button>
        </View>);
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 5,
      backgroundColor: "white-smoke"
    },
    textInput:{
        backgroundColor: 'white',
        marginTop:5
    },
    btn:{
        marginTop:5
    }
});

export default Register;