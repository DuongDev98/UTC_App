import React, {Component, useState} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {IconButton} from 'react-native-paper';
import { useSelector } from 'react-redux';

function tangSl(item) {
  // let arr = this.state.arr;
  // arr.forEach(element => {
  //   if (element.DMATHANGID == item.DMATHANGID) {
  //     element.SOLUONG += 1;
  //   }
  // });
  // Memory.SetCartItem(arr).then(() => {
  //   this.setState({arr: arr});
  // });
}

function giamSl(item) {
  // let arr = this.state.arr;
  // arr.forEach(element => {
  //   if (element.DMATHANGID == item.DMATHANGID) {
  //     if (element.SOLUONG > 0) {
  //       element.SOLUONG -= 1;
  //     }
  //   }
  // });
  // Memory.SetCartItem(arr).then(() => {
  //   this.setState({arr: arr});
  // });
}

function xoaMatHang(item) {
  // let arr = this.state.arr;
  // let index = -1, remove = -1;
  // arr.forEach(element => {
  //   index++;
  //   if (element.DMATHANGID == item.DMATHANGID) {
  //     remove = index;
  //   }
  // });
  // if (remove >= 0) {
  //   arr.splice(remove, 1);
  // }
  // Memory.RemoveToCart(item.DMATHANGID).then(() => {
  //   this.setState({arr: arr});
  // });
}

function itemList(item) {
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
            onPress={() => giamSl(item)}>
            <MaterialCommunityIcons name="numeric-negative-1" size={35} />
          </TouchableOpacity>
          <Text style={[styles.title, {padding: 10, fontSize: 25}]}>
            {item.SOLUONG}
          </Text>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => tangSl(item)}>
            <MaterialCommunityIcons name="numeric-positive-1" size={35} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.btn, {backgroundColor: 'red'}]}
            onPress={() => xoaMatHang(item)}>
            <MaterialCommunityIcons color={'white'} name="trash-can-outline" size={35} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

function thanhToan() {
  //{onClearCart: this.onClearCart}
  //navigation.navigate('ThanhToanSc');
}

function Cart(props) {
  let cartInfo = useSelector(state=>state.cartInfo);
  return (
    <View style={styles.container}>
      {cartInfo.data.length == 0 ? (
        <Text>Danh sách giỏ hàng trống</Text>
      ) : (
        cartInfo.data.map((item, index) => itemList(item))
      )}
      <IconButton
        color="white"
        icon={'cash-fast'}
        style={styles.btnThanhToan}
        onPress={() => thanhToan()}
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
});

export default Cart;