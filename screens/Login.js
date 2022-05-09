import { View, StyleSheet } from 'react-native';
import React, { Component } from 'react';
import { Button, TextInput, HelperText, DataTable } from 'react-native-paper';
import HttpClient from '../utils/HttpClient';
import Memory from '../utils/Memory';

class Login extends Component {

    constructor(){
        super();
        this.state = {
            loginLoadding: false,
            username: "",
            errorUsername:"",
            password: "",
            errorPassword: ""
        };
    };

    async btnLogin_Click() {
        if (this.state.loginLoadding) return;

        if (this.state.username.length == 0) {
            this.setState({errorUsername: "Thông tin tài khoản trống"});
            return;
        }
        if (this.state.password.length == 0) {
            this.setState({errorPassword: "Mật khẩu trống"});
            return;
        }
        this.setState({loginLoadding: true});
        let param = {
            taikhoan: this.state.username,
            matkhau: this.state.password
        };
        let data = await HttpClient.GetJson("login", param);
        this.setState({loginLoadding: false});
        if (data.isSuccess)
        {
            //lưu thông tin đăng nhập
            Memory.SetUserInfo(data.data);
            this.props.navigation.navigate("MainSc");
        }
        else
        {
            alert(data.message);
        }
    }

    btnLoginFb_Click() {
        alert("Chức năng chưa hoàn thiện");
    }

    btnLoginGg_Click() {
        alert("Chức năng chưa hoàn thiện");
    }

    render() {
        return (
        <View style={styles.container}>
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
            <Button icon="login" mode='contained' style={styles.btn} onPress={()=>this.btnLogin_Click()} loading={this.state.loginLoadding}>Đăng nhập</Button>
            <Button icon="facebook" mode='contained' style={styles.btn} onPress={()=>this.btnLoginFb_Click()}>Đăng nhập với facebook</Button>
            <Button icon="google" mode='contained' style={styles.btn} onPress={()=>this.btnLoginGg_Click()}>Đăng nhập với google</Button>
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

export default Login;