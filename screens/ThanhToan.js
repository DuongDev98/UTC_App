import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, DeviceEventEmitter, TouchableOpacity} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import HttpClient from '../utils/HttpClient';
import {useDispatch, useSelector} from 'react-redux';
import {ClearToCart} from '../reducers/actionCreator';

function ThanhToan({navigation, route}) {
  const userInfo = useSelector(state => state.userInfo);
  const cartInfo = useSelector(state => state.cartInfo);
  const [showModal, setShowModal] = useState(false);
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [dienthoai, setDienThoai] = useState('');
  //const [email, setEmail] = useState('');
  const [diachi, setDiaChi] = useState('');
  const [ghichu, setGhiChu] = useState('');
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
    setTinhThanhId(userInfo.DTINHTHANHID);
    setTenTinhThanh(userInfo.DTINHTHANH_NAME);
    setQuanHuyenId(userInfo.DQUANHUYENID);
    setTenQuanHuyen(userInfo.DQUANHUYEN_NAME);
    setPhuongXaId(userInfo.DPHUONGXAID);
    setTenPhuongXa(userInfo.DPHUONGXA_NAME);

    DeviceEventEmitter.addListener('payment', paymentMethod =>
      thucHienThanhToan(paymentMethod),
    );

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

  function thucHienThanhToan(paymentMethod) {
    setShowModal(false);
    let donHang = {};
    donHang.DKHACHHANGID = id;
    donHang.TENNGUOINHAN = name;
    donHang.DIENTHOAI = dienthoai;
    donHang.DIACHI = diachi;
    donHang.GHICHU = ghichu;
    donHang.DTINHTHANHID = tinhthanhid;
    donHang.DQUANHUYENID = quanhuyenid;
    donHang.DPHUONGXAID = phuongxaid;
    donHang.TILEGIAMGIA = route.params.tiLeGiamGia;
    donHang.HINHTHUCTHANHTOAN = paymentMethod;
    donHang.TDONHANGCHITIETs = cartInfo.data;
    HttpClient.GetJson('thucHienThanhToan', donHang).then(json => {
      if (json.isSuccess) {
        alert('Đặt hàng thành công');
        dispatch(ClearToCart());
        navigation.goBack();
      } else {
        alert(json.message);
      }
    });
  }

  return showModal ? (
    <View style={styles.container}>
      <Button
        style={styles.btn}
        mode="contained"
        onPress={() => navigation.navigate('NhanHangThanhToanSc')}>
        <Text>Nhận hàng thanh toán</Text>
      </Button>

      <Button
        style={styles.btn}
        mode="contained"
        onPress={() => navigation.navigate('PaypalSc')}>
        <Text>PayPal</Text>
      </Button>

      <Button style={styles.btn} mode="contained" onPress={() => {}}>
        <Text>ZaloPay</Text>
      </Button>
    </View>
  ) : (
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
          navigation.navigate('ChonDiaDiemSc', {LOAI: 2, ID: quanhuyenid});
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
          setShowModal(true);
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
  lblLink: {
    marginLeft: 10,
    paddingTop: 20,
    fontSize: 20,
    color: 'blue',
  },
});

export default ThanhToan;