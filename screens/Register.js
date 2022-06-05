import {View, StyleSheet} from 'react-native';
import React, {Component, useState} from 'react';
import {Button, TextInput, HelperText} from 'react-native-paper';
import HttpClient from '../utils/HttpClient';

async function btnRegister_Click(name, username, password, cfPassword, setErrorName, setErrorUsername,
    setErrorPassword, setErrorCfPassword) {
  if (name.length == 0) {
    setErrorName('Họ và tên trống');
    return;
  }
  if (username.length == 0) {
    setErrorUsername('Thông tin tài khoản trống');
    return;
  }
  if (password.length == 0) {
    setErrorPassword('Mật khẩu trống');
    return;
  }
  if (password != cfPassword) {
    setErrorCfPassword('Xác nhận mật khẩu không đúng');
    return;
  }

  let param = {
    taikhoan: username,
    matkhau: password,
    hovaten: name,
  };

  let data = await HttpClient.GetJson('register', param);
  if (data.isSuccess) {
    alert(data);
  } else {
    alert(data.message);
  }
}

function Register() {
  let [name, setName] = useState('');
  let [errorName, setErrorName] = useState('');
  let [username, setUsername] = useState('');
  let [errorUsername, setErrorUsername] = useState('');
  let [password, setPassword] = useState('');
  let [errorPassword, setErrorPassword] = useState('');
  let [cfPassword, setCfPassword] = useState('');
  let [errorCfPassword, setErrorCfPassword] = useState('');

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        label="Họ và tên"
        placeholder="Nhập họ và tên"
        value={name}
        onChangeText={text => setName(text)}
      />
      {errorName.length ? (
        <HelperText type="error" visible={true}>
          {errorName}
        </HelperText>
      ) : null}
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
      <TextInput
        style={styles.textInput}
        label="Xác nhận mật khẩu"
        placeholder="Nhập lại mật khẩu"
        value={cfPassword}
        secureTextEntry
        onChangeText={text => setCfPassword(text)}
      />
      {errorCfPassword.length ? (
        <HelperText type="error" visible={true}>
          {errorCfPassword}
        </HelperText>
      ) : null}
      <Button
        icon="account-plus"
        mode="contained"
        style={styles.btn}
        onPress={() => btnRegister_Click(name, username, password, cfPassword, setErrorName, setErrorUsername, setErrorPassword, setErrorCfPassword)}>
        Đăng ký
      </Button>
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

export default Register;
