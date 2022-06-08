import React, {
  Component,
  useEffect,
  useState,
  useRef,
  useCallback,
} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {TextInput, Button, IconButton} from 'react-native-paper';
import Loadding from 'react-native-loading-spinner-overlay';
import {Picker} from '@react-native-picker/picker';
import HttpClient from '../utils/HttpClient';
import { useDispatch, useSelector } from 'react-redux';
import {SetUser} from '../reducers/actionCreator';

// function layDuLieuTinhThanh(
//   datatinhthanh,
//   setDataTinhThanh,
//   setDataQuanHuyen,
//   setDataPhuongXa,
// ) {
//   HttpClient.GetJson('dsTinhThanh', null).then(json => {
//     if (json.isSuccess) {
//       setDataTinhThanh(json.data.arr);
//     } else {
//       alert(json.message);
//     }
//   });
// }

// function layDuLieuQuanHuyen(setDataQuanHuyen, setDataPhuongXa, tinhthanhid) {
//   if (tinhthanhid.length > 0) {
//     HttpClient.GetJson('dsQuanHuyen', {ID: tinhthanhid}).then(json => {
//       if (json.isSuccess) {
//         setDataQuanHuyen(json.data.arr);
//         layDuLieuPhuongXa(setDataPhuongXa, '');
//       } else {
//         alert(json.message);
//       }
//     });
//   }
// }

// function layDuLieuPhuongXa(setDataPhuongXa, quanhuyenid) {
//   if (quanhuyenid.length > 0) {
//     HttpClient.GetJson('dsPhuongXa', {ID: quanhuyenid}).then(json => {
//       if (json.isSuccess) {
//         setDataPhuongXa(json.data.arr);
//       } else {
//         alert(json.message);
//       }
//     });
//   }
// }

function capNhatDuLieu(setLoadding, data, callback) {
  let o = {
    id: data.id,
    name: data.name,
    dienthoai: data.dienthoai,
    email: data.email,
    tinhthanhid: data.tinhthanhid,
    quanhuyenid: data.quanhuyenid,
    phuongxaid: data.phuongxaid,
    diachi: data.diachi,
  };
  //kiểm tra thông tin cần thiết
  let err = '';
  if (o.name == null || o.name.length == 0) err = 'Họ và tên trống';
  else if (o.email == null || o.email.length == 0) err = 'Email trống';
  else if (o.dienthoai == null || o.dienthoai.length == 0)
    err = 'Điện thoại trống';
  else if (o.diachi == null || o.diachi.length == 0) err = 'Địa chỉ trống';

  if (err.length > 0) alert(err);
  else {
    //cap nhat du lieu
    setLoadding(true);
    HttpClient.GetJson('capNhatThongTin', o)
      .then(json => {
        setLoadding(false);
        if (json.isSuccess) {
          alert('Cập nhật dữ liệu thành công');
          callback && callback();
        } else {
          alert(json.message);
        }
      })
      .catch(err => {
        setLoadding(false);
        console.log(err);
      });
  }
}

function EditProfile() {
  const userInfo = useSelector(state=>state.userInfo);
  const [loadding, setLoadding] = useState(false);
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [dienthoai, setDienThoai] = useState('');
  const [email, setEmail] = useState('');
  const [diachi, setDiaChi] = useState('');
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
    setEmail(userInfo.EMAIL);
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

  const dispatch = useDispatch();

  return (
    <>
      {loadding ? (
        <Loadding spinnerKey="loadding..." visible={loadding} />
      ) : (
        <View style={styles.container}>
          <TextInput
            style={styles.textInput}
            label="Họ và tên"
            placeholder="Nhập họ và tên"
            value={name}
            onChangeText={text => setName(text)}
          />
          <TextInput
            style={styles.textInput}
            label="Điện thoại"
            placeholder="Nhập số điện thoại"
            value={dienthoai}
            onChangeText={text => setDienThoai(text)}
          />
          <TextInput
            style={styles.textInput}
            label="Email"
            placeholder="Nhập email"
            value={email}
            onChangeText={text => setEmail(text)}
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
              return (
                <Picker.Item key={val.ID} label={val.NAME} value={val.ID} />
              );
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
              return (
                <Picker.Item key={val.ID} label={val.NAME} value={val.ID} />
              );
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
              return (
                <Picker.Item key={val.ID} label={val.NAME} value={val.ID} />
              );
            })}
          </Picker>
          <TextInput
            style={styles.textInput}
            label="Địa chỉ"
            placeholder="Nhập số nhà..."
            value={diachi}
            onChangeText={text => setDiaChi(text)}
          />
          <Button
            style={styles.btn}
            mode="contained"
            onPress={() =>
              capNhatDuLieu(setLoadding, {
                id: id,
                name: name,
                dienthoai: dienthoai,
                email: email,
                tinhthanhid: tinhthanhid,
                quanhuyenid: quanhuyenid,
                phuongxaid: phuongxaid,
                diachi: diachi,
              }, ()=>{
                let params = {};
                params.NAME = name;
                params.DIENTHOAI = dienthoai;
                params.EMAIL = email;
                params.DTINHTHANHID = tinhthanhid;
                params.DQUANHUYENID = quanhuyenid;
                params.DPHUONGXAID = phuongxaid;
                params.DIACHI = diachi;
                dispatch(SetUser(params));
              })
            }>
            <Text>Cập nhật</Text>
          </Button>
        </View>
      )}
    </>
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

export default EditProfile;
