import React, {
  Component,
  useEffect,
  useState,
  useRef,
  useCallback,
} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  DeviceEventEmitter,
} from 'react-native';
import {TextInput, Button, IconButton} from 'react-native-paper';
import Loadding from 'react-native-loading-spinner-overlay';
import HttpClient from '../utils/HttpClient';
import {useDispatch, useSelector} from 'react-redux';
import {SetUser} from '../reducers/actionCreator';

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

function EditProfile({navigation, route}) {
  const dispatch = useDispatch();
  const userInfo = useSelector(state => state.userInfo);
  const [loadding, setLoadding] = useState(false);
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [dienthoai, setDienThoai] = useState('');
  const [email, setEmail] = useState('');
  const [diachi, setDiaChi] = useState('');
  const [tinhthanhid, setTinhThanhId] = useState('');
  const [tenTinhThanh, setTenTinhThanh] = useState('');
  const [quanhuyenid, setQuanHuyenId] = useState('');
  const [tenQuanHuyen, setTenQuanHuyen] = useState('');
  const [phuongxaid, setPhuongXaId] = useState('');
  const [tenPhuongXa, setTenPhuongXa] = useState('');

  useEffect(() => {
    setId(userInfo.ID);
    setName(userInfo.NAME);
    setDienThoai(userInfo.DIENTHOAI);
    setDiaChi(userInfo.DIACHI);
    setEmail(userInfo.EMAIL);
    setTinhThanhId(userInfo.DTINHTHANHID);
    setTenTinhThanh(userInfo.DTINHTHANH_NAME);
    setQuanHuyenId(userInfo.DQUANHUYENID);
    setTenQuanHuyen(userInfo.DQUANHUYEN_NAME);
    setPhuongXaId(userInfo.DPHUONGXAID);
    setTenPhuongXa(userInfo.DPHUONGXA_NAME);

    DeviceEventEmitter.addListener('chonTinhThanh', (p1, p2) => {
      setTinhThanhId(p1);
      setTenTinhThanh(p2);
      setQuanHuyenId('');
      setTenQuanHuyen('');
      setPhuongXaId('');
      setTenPhuongXa('');
    });

    DeviceEventEmitter.addListener('chonQuanHuyen', (p1, p2) => {
      setQuanHuyenId(p1);
      setTenQuanHuyen(p2);
      setPhuongXaId('');
      setTenPhuongXa('');
    });

    DeviceEventEmitter.addListener('chonPhuongXa', (p1, p2) => {
      setPhuongXaId(p1);
      setTenPhuongXa(p2);
    });

    return () => {
      DeviceEventEmitter.removeAllListeners();
    };
  }, []);

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
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('ChonDiaDiemSc', {LOAI: 0});
            }}>
            <TextInput
              editable={false}
              style={styles.textInput}
              label="Tỉnh thành"
              placeholder="Tỉnh thành"
              value={tenTinhThanh}
            />
          </TouchableOpacity>
          {/* Quận huyện */}
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('ChonDiaDiemSc', {LOAI: 1, ID: tinhthanhid});
            }}>
            <TextInput
              editable={false}
              style={styles.textInput}
              label="Quận huyện"
              placeholder="Quận huyện"
              value={tenQuanHuyen}
            />
          </TouchableOpacity>
          {/* Phường xã */}
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('ChonDiaDiemSc',{LOAI: 2, ID: quanhuyenid});
            }}>
            <TextInput
              editable={false}
              style={styles.textInput}
              label="Phường xã"
              placeholder="Phường xã"
              value={tenPhuongXa}
            />
          </TouchableOpacity>

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
              capNhatDuLieu(
                setLoadding,
                {
                  id: id,
                  name: name,
                  dienthoai: dienthoai,
                  email: email,
                  tinhthanhid: tinhthanhid,
                  quanhuyenid: quanhuyenid,
                  phuongxaid: phuongxaid,
                  diachi: diachi,
                },
                () => {
                  let params = {};
                  params.NAME = name;
                  params.DIENTHOAI = dienthoai;
                  params.EMAIL = email;
                  params.DTINHTHANHID = tinhthanhid;
                  params.DTINHTHANH_NAME = tenTinhThanh;
                  params.DQUANHUYENID = quanhuyenid;
                  params.DQUANHUYEN_NAME = tenQuanHuyen;
                  params.DPHUONGXAID = phuongxaid;
                  params.DPHUONGXA_NAME = tenPhuongXa;
                  params.DIACHI = diachi;
                  dispatch(SetUser(params));
                },
              )
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
    padding: 10,
    backgroundColor: 'white',
    marginBottom: 2,
    elevation: 1,
    shadowColor: 'black',
  },
});

export default EditProfile;
