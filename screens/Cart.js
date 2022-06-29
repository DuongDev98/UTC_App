import React, {Component, useEffect, useState} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {IconButton} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {
  RemoveToCart,
  IncreToCart,
  DecreToCart,
  SetPayment
} from '../reducers/actionCreator';
import HttpClient from '../utils/HttpClient';

function tangSl(dispatch, item) {
  dispatch(IncreToCart(item));
}

function giamSl(dispatch, item) {
  dispatch(DecreToCart(item.DMATHANGID));
}

function xoaMatHang(dispatch, item) {
  dispatch(RemoveToCart(item.DMATHANGID));
}

function itemList(dispatch, item) {
  return (
    <View key={item.DMATHANGID} style={styles.item}>
      <Image style={styles.avatar} source={{uri: item.AVATAR.url}} />
      <View style={styles.pnContent}>
        <Text style={styles.title}>{item.NAME}</Text>
        <Text style={styles.title}>Đơn giá: {item.DONGIA}</Text>
        <View
          style={{
            flexDirection: 'row',
            padding: 10,
            justifyContent: 'center',
          }}>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => giamSl(dispatch, item)}>
            <MaterialCommunityIcons name="numeric-negative-1" size={35} />
          </TouchableOpacity>
          <Text style={[styles.title, {padding: 10, fontSize: 25}]}>
            {item.SOLUONG}
          </Text>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => tangSl(dispatch, item)}>
            <MaterialCommunityIcons name="numeric-positive-1" size={35} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.btn, {backgroundColor: 'red'}]}
            onPress={() => xoaMatHang(dispatch, item)}>
            <MaterialCommunityIcons
              color={'white'}
              name="trash-can-outline"
              size={35}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

function thanhToan(navigation, cartInfo, userInfo) {
  if (cartInfo.data.length == 0) alert('Dữ liệu đặt hàng trống');
  else if ((userInfo.EMAIL ?? '').length == 0)
    alert('Bạn cần cập nhật Email trước');
  else navigation.navigate('ThanhToanSc');
}

function Cart({navigation}) {
  let cartInfo = useSelector(state => state.cartInfo);
  let userInfo = useSelector(state => state.userInfo);  
  let [tienHang, setTienHang] = useState(0);
  let [kms, setKMS] = useState([]);
  useEffect(() => {
    //lấy danh sách đợt khuyến mại
    HttpClient.GetJson('layKhuyenMai', null).then(json => {
      if (json.isSuccess) {
        setKMS(json.data.arr);
      } else {
        alert(json.message);
      }
    });
  }, []);

  function tinhToanTiLe() {
    let temp = 0;
    kms.forEach(element => {
      if (tienHang >= element.TONGBILL) temp = element.PHANTRAMGIAMGIA;
    });
    dispatch(SetPayment({tiLeGiamGia: temp}));
  }

  //tính khuyến mại
  useEffect(() => {
    tinhToanTiLe();
  }, [kms]);

  useEffect(() => {
    tinhToanTiLe();
  }, [tienHang]);

  useEffect(() => {
    let temp = 0;
    cartInfo.data.forEach(element => {
      temp += element.DONGIA * element.SOLUONG;
    });
    setTienHang(temp);
  }, [cartInfo]);

  const dispatch = useDispatch();
  return (
    <View style={styles.container}>
      {cartInfo.data.length == 0 ? (
        <Text>Danh sách giỏ hàng trống</Text>
      ) : (
        <View style={{flexDirection: 'column'}}>
          <View style={styles.vText}>
            <Text style={styles.lbl}>Tiền hàng</Text>
            <Text style={styles.lbl1}>{parseInt(tienHang)}</Text>
          </View>
          <View style={styles.vText}>
            <Text style={styles.lbl}>Tỉ lệ giảm giá</Text>
            <Text style={styles.lbl1}>{parseInt(cartInfo.info.tiLeGiamGia)}</Text>
          </View>
          <View style={styles.vText}>
            <Text style={styles.lbl}>Tiền giảm giá</Text>
            <Text style={styles.lbl1}>{parseInt(cartInfo.info.tiLeGiamGia) == 0 ? 0 : (parseInt(cartInfo.info.tiLeGiamGia) * parseInt(tienHang) / 100)}</Text>
          </View>
          <View style={styles.vText}>
            <Text style={styles.lbl}>Tổng cộng</Text>
            <Text style={styles.lbl1}>{parseInt(tienHang) - (parseInt(cartInfo.info.tiLeGiamGia) == 0 ? 0 : (parseInt(cartInfo.info.tiLeGiamGia) * parseInt(tienHang) / 100))}</Text>
          </View>
          {cartInfo.data.map((item, index) => itemList(dispatch, item))}
        </View>
      )}
      <IconButton
        color="white"
        icon={'cash-fast'}
        style={styles.btnThanhToan}
        onPress={() => thanhToan(navigation, cartInfo, userInfo)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    backgroundColor: 'white-smoke',
  },
  item: {
    marginTop: 10,
    flexDirection: 'row',
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  avatar: {
    width: 100,
    height: 100,
  },
  pnContent: {
    flexDirection: 'column',
    marginLeft: 10,
  },
  title: {
    fontSize: 20,
    marginTop: 'auto',
    marginBottom: 'auto',
  },
  btn: {
    margin: 5,
    padding: 5,
    justifyContent: 'center',
    backgroundColor: '#ffc296',
    elevation: 5,
  },
  btnThanhToan: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#ee6e73',
    position: 'absolute',
    bottom: 10,
    right: 10,
    elevation: 8,
  },
  vText: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: 'white',
  },
  lbl: {
    fontSize: 20,
    flex: 1
  },
  lbl1: {
    fontSize: 20,
    flex: 1,
    textAlign: 'right'
  }
});

export default Cart;
