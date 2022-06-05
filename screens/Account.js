import React, {Component, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Avatar, Button, IconButton, Badge} from 'react-native-paper';
import Contants from '../utils/Contants';
import HttpClient from '../utils/HttpClient';
import Memory from '../utils/Memory';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import { useDispatch, useSelector } from 'react-redux';

function editProfile(navigation, user) {
  navigation.navigate('EditProfileSc', user);
}

function danhSachDonHang(trangthai) {
  alert('danh sach don hang');
}

async function uploadAvatar(dispatch) {
  let img = await launchImageLibrary({
    mediaType: 'photo',
    includeBase64: true,
  });

  if (!img.didCancel) {
    img.khachhangid = user.ID;
    HttpClient.GetJson('uploadavatar', img).then(json=>{
      if (json.isSuccess) {
        dispatch({
          type: 'uploadavatar',
          payload: json.data.img
        });
      } else {
        alert(json.message);
      }
    });
  }
}

function Account ({navigation}) {
  let user = useSelector(state=>state.userInfo);
  let dispatch = useDispatch();
  return (
    <>
      {user == null ? null : (
        <View style={styles.container}>
          <View style={styles.rowuser}>
            <TouchableOpacity onPress={() => uploadAvatar(dispatch)}>
              <Avatar.Image
                size={64}
                source={{uri: Contants.ImgUri + user.AVATAR}}
              />
            </TouchableOpacity>
            <View style={styles.containerLblName}>
              <Text style={styles.lblName}>{user.NAME}</Text>
            </View>
            <IconButton
              style={styles.iconEditProfile}
              icon={'account-edit'}
              size={30}
              onPress={() => editProfile(navigation, user)}
            />
          </View>
          <View style={{flexDirection: 'row', padding: 10}}>
            <Text style={{fontWeight: 'bold', fontSize: 16}}>
              Đơn hàng của tôi
            </Text>
            <TouchableOpacity
              style={{marginLeft: 'auto'}}
              onPress={() => danhSachDonHang('')}>
              <Text style={{color: 'blue'}}>Xem tất cả đơn hàng</Text>
            </TouchableOpacity>
          </View>
          <View
            style={[{flexDirection: 'column', padding: 10}, {paddingTop: 0}]}>
            <TouchableOpacity
              onPress={() => danhSachDonHang('')}
              style={styles.containerBtn}>
              <View style={styles.iconBtn}>
                <Badge style={{position: 'absolute'}}>3</Badge>
                <Text style={{fontSize: 16}}>Chở xử lý</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => danhSachDonHang('')}
              style={styles.containerBtn}>
              <View style={styles.iconBtn}>
                <Badge style={{position: 'absolute'}}>3</Badge>
                <Text style={{fontSize: 16}}>Đã xác nhận</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => danhSachDonHang('')}
              style={styles.containerBtn}>
              <View style={styles.iconBtn}>
                <Badge style={{position: 'absolute'}}>3</Badge>
                <Text style={{fontSize: 16}}>Chờ giao hàng</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => danhSachDonHang('')}
              style={styles.containerBtn}>
              <View style={styles.iconBtn}>
                <Badge style={{position: 'absolute'}}>3</Badge>
                <Text style={{fontSize: 16}}>Đơn hoàn thành</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => danhSachDonHang('')}
              style={styles.containerBtn}>
              <View style={styles.iconBtn}>
                <Badge style={{position: 'absolute'}}>3</Badge>
                <Text style={{fontSize: 16}}>Đơn đã hủy</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  rowuser: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#ffe6a1',
  },
  containerLblName: {
    justifyContent: 'center',
  },
  lblName: {
    fontSize: 20,
    marginLeft: 10,
    fontWeight: 'bold',
  },
  iconEditProfile: {
    marginLeft: 'auto',
  },
  containerBtn: {
    padding: 10,
    paddingTop: 20,
    paddingBottom: 20,
    marginTop: 5,
    backgroundColor: 'white',
  },
  iconBtn: {
    width: 150,
  },
});

export default Account;
