import {View, StyleSheet} from 'react-native';
import React, {Component, useState} from 'react';
import {Button, TextInput, HelperText, DataTable} from 'react-native-paper';
import HttpClient from '../utils/HttpClient';
import {useDispatch} from 'react-redux';
import {SetUser} from '../reducers/actionCreator';
// import {Settings, LoginButton, AccessToken} from 'react-native-fbsdk-next';

// Settings.setAppID('5643084632402714');
// Settings.initializeSDK();

function btnLogin_Click(
  dispatch,
  navigation,
  loginLoadding,
  setLoginLoadding,
  username,
  password,
  setErrorUsername,
  setErrorPassword,
) {
  if (loginLoadding) return;

  if (username.length == 0) {
    setErrorUsername('Thông tin tài khoản trống');
    return;
  }
  if (password.length == 0) {
    setErrorPassword('Mật khẩu trống');
    return;
  }
  setLoginLoadding(true);
  let param = {
    taikhoan: username,
    matkhau: password,
  };

  HttpClient.GetJson('login', param).then(data => {
    setLoginLoadding(false);
    if (data.isSuccess) {
      dispatch(SetUser(data.data));
      navigation.navigate('MainSc');
    } else {
      alert(data.message);
    }
  });
}

function btnLoginFb_Click() {
  alert('Chức năng chưa hoàn thiện');
}

function btnLoginGg_Click() {
  alert('Chức năng chưa hoàn thiện');
}

function Login({navigation}) {
  let dispatch = useDispatch();
  let [loginLoadding, setLoginLoadding] = useState(false);
  let [username, setUsername] = useState('duong');
  let [errorUsername, setErrorUsername] = useState('');
  let [password, setPassword] = useState('duong');
  let [errorPassword, setErrorPassword] = useState('');

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        label="Tài khoản"
        placeholder="Nhập username | Email | Điện thoại"
        value={username}
        onChangeText={text => setUsername(text)}
      />
      {errorUsername.length ? (
        <HelperText type="error" visible={true}>
          {errorUsername}
        </HelperText>
      ) : null}
      <TextInput
        style={styles.textInput}
        label="Mật khẩu"
        placeholder="Nhập mật khẩu"
        value={password}
        secureTextEntry
        onChangeText={text => setPassword(text)}
      />
      {errorPassword.length ? (
        <HelperText type="error" visible={true}>
          {errorPassword}
        </HelperText>
      ) : null}
      <Button
        icon="login"
        mode="contained"
        style={styles.btn}
        onPress={() =>
          btnLogin_Click(
            dispatch,
            navigation,
            loginLoadding,
            setLoginLoadding,
            username,
            password,
            setErrorUsername,
            setErrorPassword,
          )
        }
        loading={loginLoadding}>
        Đăng nhập
      </Button>
      {/* <Button
        icon="facebook"
        mode="contained"
        style={styles.btn}
        onPress={() => btnLoginFb_Click()}>
        Đăng nhập với facebook
      </Button> */}
      {/* <LoginButton
        onLoginFinished={(error, result) => {
          if (error) {
            console.log('login has error: ' + JSON.stringify(error));
          } else if (result.isCancelled) {
            console.log('login is cancelled.');
          } else {
            AccessToken.getCurrentAccessToken().then(data => {
              console.log(data.accessToken.toString());
            });
          }
        }}
        onLogoutFinished={() => console.log('logout.')}
      />
      <Button
        icon="google"
        mode="contained"
        style={styles.btn}
        onPress={() => btnLoginGg_Click()}>
        Đăng nhập với google
      </Button> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    backgroundColor: 'white-smoke',
  },
  textInput: {
    backgroundColor: 'white',
    marginTop: 5,
  },
  btn: {
    marginTop: 5,
  },
});

export default Login;
