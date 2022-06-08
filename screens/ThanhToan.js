import React, {Component, useEffect, useState} from 'react';
import Memory from '../utils/Memory';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {TextInput, Button, IconButton} from 'react-native-paper';
import {Picker} from '@react-native-picker/picker';
import HttpClient from '../utils/HttpClient';
import { useDispatch, useSelector } from 'react-redux';
import { ClearToCart } from '../reducers/actionCreator';

function thucHienThanhToan(dispatch, {id, name, dienthoai, diachi, ghichu, tinhthanhid, quanhuyenid, phuongxaid}, dsChiTiet) {
    //chuẩn bị dữ liệu
    let donHang = {};
    donHang.DKHACHHANGID = id;
    donHang.TENNGUOINHAN = name;
    donHang.DIENTHOAI = dienthoai;
    donHang.DIACHI = diachi;
    donHang.GHICHU = ghichu;
    donHang.DTINHTHANHID = tinhthanhid;
    donHang.DQUANHUYENID = quanhuyenid;
    donHang.DPHUONGXAID = phuongxaid;
    donHang.TDONHANGCHITIETs = dsChiTiet;
    HttpClient.GetJson('thucHienThanhToan', donHang).then(json=>{
      if (json.isSuccess) {
        alert("Đặt hàng thành công");
        dispatch(ClearToCart());
      } else {
        alert(json.message);
      }
    });
  }

function ThanhToan({navigation}) {
  const dispatch = useDispatch();
  const userInfo = useSelector(state=>state.userInfo);
  const cartInfo = useSelector(state=>state.cartInfo);
  //const [loadding, setLoadding] = useState(false);
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [dienthoai, setDienThoai] = useState('');
  //const [email, setEmail] = useState('');
  const [diachi, setDiaChi] = useState('');
  const [ghichu, setGhiChu] = useState('');
  const [tinhthanhid, setTinhThanhId] = useState('');
  const [quanhuyenid, setQuanHuyenId] = useState('');
  const [phuongxaid, setPhuongXaId] = useState('');
  const [datatinhthanh, setDataTinhThanh] = useState([]);
  useEffect(() => {
    //callback
    if (tinhthanhid && tinhthanhid.length > 0) setTinhThanhId(tinhthanhid);
  }, [datatinhthanh]);
  const [dataquanhuyen, setDataQuanHuyen] = useState([]);
  useEffect(() => {
    //callback
    if (quanhuyenid && quanhuyenid.length > 0) setQuanHuyenId(quanhuyenid);
  }, [dataquanhuyen]);
  const [dataphuongxa, setDataPhuongXa] = useState([]);
  useEffect(() => {
    //callback
    if (phuongxaid && phuongxaid.length > 0) setPhuongXaId(phuongxaid);
  }, [dataphuongxa]);

  useEffect(() => {
    setId(userInfo.ID);
    setName(userInfo.NAME);
    setDienThoai(userInfo.DIENTHOAI);
    setDiaChi(userInfo.DIACHI);
    //setEmail(userInfo.EMAIL);
    setTinhThanhId(userInfo.DTINHTHANHID);
    setQuanHuyenId(userInfo.DQUANHUYENID);
    setPhuongXaId(userInfo.DPHUONGXAID);
    HttpClient.GetJson('dsTinhThanh', null).then(json => {
      if (json.isSuccess) {
        setDataTinhThanh(json.data.arr);
      } else {
        alert(json.message);
      }
    });
  }, []);

  useEffect(() => {
    HttpClient.GetJson('dsQuanHuyen', {ID: tinhthanhid}).then(json => {
      if (json.isSuccess) {
        setDataQuanHuyen(json.data.arr);
      } else {
        alert(json.message);
      }
    });
  }, [tinhthanhid]);

  useEffect(() => {
    HttpClient.GetJson('dsPhuongXa', {ID: quanhuyenid}).then(json => {
      if (json.isSuccess) {
        setDataPhuongXa(json.data.arr);
      } else {
        alert(json.message);
      }
    });
  }, [quanhuyenid]);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        label="Họ và tên người nhận"
        placeholder="Nhập họ và tên"
        value={name}
        onChangeText={text => setName(text)}
      />
      <TextInput
        style={styles.textInput}
        label="Điện thoại người nhận"
        placeholder="Nhập số điện thoại"
        value={dienthoai}
        onChangeText={text => setDienThoai(text)}
      />
      {/* Tỉnh thành */}
      <Picker
        style={styles.combobox}
        selectedValue={tinhthanhid}
        onValueChange={(itemValue, itemIndex) => {
          if (itemValue != tinhthanhid) {
            setTinhThanhId(itemValue);
          }
        }}>
        {datatinhthanh.map((val, i) => {
          return <Picker.Item key={val.ID} label={val.NAME} value={val.ID} />;
        })}
      </Picker>

      {/* Quận huyện */}
      <Picker
        style={styles.combobox}
        selectedValue={quanhuyenid}
        onValueChange={(itemValue, itemIndex) => {
          if (itemValue != quanhuyenid) {
            setQuanHuyenId(itemValue);
          }
        }}>
        {dataquanhuyen.map((val, i) => {
          return <Picker.Item key={val.ID} label={val.NAME} value={val.ID} />;
        })}
      </Picker>

      {/* Phường xã */}
      <Picker
        style={styles.combobox}
        selectedValue={phuongxaid}
        onValueChange={(itemValue, itemIndex) => {
          setPhuongXaId(itemValue);
        }}>
        {dataphuongxa.map((val, i) => {
          val.key = val.ID;
          return <Picker.Item key={val.ID} label={val.NAME} value={val.ID} />;
        })}
      </Picker>
      <TextInput
        style={styles.textInput}
        label="Địa chỉ người nhận"
        placeholder="Nhập số nhà..."
        value={diachi}
        onChangeText={text => setDiaChi(text)}
      />
      <TextInput
        style={styles.textInput}
        label="Ghi chú"
        placeholder="Nhập ghi chú..."
        value={ghichu}
        onChangeText={text => setGhiChu(text)}
      />
      <Button
        style={styles.btn}
        mode="contained"
        onPress={() => {
          let params = {id, name, dienthoai, diachi, ghichu, tinhthanhid, quanhuyenid, phuongxaid};
          thucHienThanhToan(dispatch, params, cartInfo.data);
        }}>
        <Text>Thanh toán</Text>
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
  combobox: {
    marginTop: 5,
    paddingTop: 32,
    paddingBottom: 32,
    paddingLeft: 10,
    backgroundColor: 'white',
    marginBottom: 2,
    elevation: 1,
    shadowColor: 'black',
  },
  diaDiemText: {
    fontSize: 16,
  },
});

export default ThanhToan;
