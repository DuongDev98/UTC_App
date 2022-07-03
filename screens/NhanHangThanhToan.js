import React, {useState} from 'react';
import {View, Text, StyleSheet, DeviceEventEmitter} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import {useSelector} from 'react-redux';
import HttpClient from '../utils/HttpClient';

function NhanHangThanhToan({navigation, route}) {
  const userInfo = useSelector(state => state.userInfo);
  const [codeRandom, setCodeRandom] = useState('');
  const [codeInput, setCodeInput] = useState('');

  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row'}}>
        <TextInput
          style={[styles.textInput, {flex: 4}]}
          label="Mã xác nhận"
          placeholder="Nhập mã xác nhận"
          onChangeText={text => setCodeInput(text)}
          keyboardType='numeric'
        />
        <Text
          style={[styles.lblLink, {flex: 1}]}
          onPress={() => {
            let temp = 111111;
            temp = Math.floor(Math.random() * 999999);
            setCodeRandom(temp.toString());
            GuiEmail(temp, userInfo.EMAIL);
          }}>
          {codeRandom.length == 0 ? "Lấy mã" : "Gửi lại"}
        </Text>
      </View>
      <Button
        style={styles.btn}
        mode="contained"
        onPress={() => {
          if (codeRandom.length == 0) {
            alert('Vui lòng nhấn lấy mã để xác thực');
          } else if (codeRandom != codeInput) {
            alert('Mã xác nhận không đúng');
          } else if (codeRandom == codeInput && codeInput.length > 0) {
            navigation.goBack();
            DeviceEventEmitter.emit("payment", 0);
          } else {
            alert('Vui lòng xác nhận đơn hàng');
          }
        }}>
        <Text>Xác nhận</Text>
      </Button>
    </View>
  );
}

function GuiEmail(code, email) {
  HttpClient.GetJson('guiEmailXacNhan', {CODE: code, EMAIL: email}).then(
    json => {
      if (json.isSuccess) {
        alert('Vui lòng kiểm tra email: ' + email + ' để lấy mã xác nhận');
      } else {
        alert(json.message);
      }
    },
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
  lblLink: {
    marginLeft: 10,
    paddingTop: 20,
    fontSize: 20,
    color: 'blue',
  },
});

export default NhanHangThanhToan;
