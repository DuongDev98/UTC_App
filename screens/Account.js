import React, {Component, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  BackHandler,
} from 'react-native';
import {Avatar, Button, IconButton, Badge} from 'react-native-paper';
import Contants from '../utils/Contants';
import HttpClient from '../utils/HttpClient';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {useDispatch, useSelector} from 'react-redux';
import {SetUser, UploadAvatar} from '../reducers/actionCreator';
import {
  Settings,
  LoginButton,
  AccessToken,
  Profile,
  LoginManager,
} from 'react-native-fbsdk-next';

Settings.setAppID('2546975805434214');
Settings.initializeSDK();

function editProfile(navigation) {
  navigation.navigate('EditProfileSc');
}

function danhSachDonHang(navigation, userInfo, trangthai) {
  //0 chờ xử lý
  //2 đang giao hàng
  HttpClient.GetJson('danhSachDonHang', {
    DKHACHHANGID: userInfo.ID,
    TRANGTHAI: trangthai == -1 ? '' : trangthai,
  }).then(json => {
    if (json.isSuccess) {
      navigation.navigate('DanhSachDonHangSc', {data: json.data.arr});
    } else {
      alert(json.message);
    }
  });
}

async function uploadAvatar(user, dispatch) {
  let img = await launchImageLibrary({
    mediaType: 'photo',
    includeBase64: true,
  });

  if (!img.didCancel) {
    img.khachhangid = user.ID;
    HttpClient.GetJson('uploadavatar', img).then(json => {
      if (json.isSuccess) {
        dispatch(UploadAvatar(json.data.img));
      } else {
        alert(json.message);
      }
    });
  }
}

function Account({navigation}) {
  let user = useSelector(state => state.userInfo);
  let dispatch = useDispatch();
  let [slChoXyLy, setSlChoXyLy] = useState(0);
  let [slDangGiao, setSlDangGiao] = useState(0);

  useEffect(() => {
    let isMounted = true;
    HttpClient.GetJson('soLuongDon', {ID: user.ID}).then(json => {
      if (json.isSuccess) {
        if (isMounted) {
          setSlChoXyLy(json.data.slChoXyLy);
          setSlDangGiao(json.data.slDangGiao);
        }
      } else {
        alert(json.message);
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <>
      {user == null ? null : (
        <View style={styles.container}>
          <View style={styles.rowuser}>
            <TouchableOpacity onPress={() => uploadAvatar(user, dispatch)}>
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
              onPress={() => editProfile(navigation)}
            />
          </View>
          <View style={{flexDirection: 'row', padding: 10}}>
            <Text style={{fontWeight: 'bold', fontSize: 16}}>
              Đơn hàng của tôi
            </Text>
            <TouchableOpacity
              style={{marginLeft: 'auto'}}
              onPress={() => danhSachDonHang(navigation, user, -1)}>
              <Text style={{color: 'blue'}}>Xem tất cả đơn hàng</Text>
            </TouchableOpacity>
          </View>
          <View
            style={[{flexDirection: 'column', padding: 10}, {paddingTop: 0}]}>
            <TouchableOpacity
              onPress={() => danhSachDonHang(navigation, user, 0)}
              style={styles.containerBtn}>
              <View style={styles.iconBtn}>
                <Badge size={25} style={{position: 'absolute'}}>
                  {slChoXyLy}
                </Badge>
                <Text style={{fontSize: 16}}>Chở xử lý</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => danhSachDonHang(navigation, user, 2)}
              style={styles.containerBtn}>
              <View style={styles.iconBtn}>
                <Badge size={25} style={{position: 'absolute'}}>
                  {slDangGiao}
                </Badge>
                <Text style={{fontSize: 16}}>Đang giao hàng</Text>
              </View>
            </TouchableOpacity>
            {user.isFbAcc ? (
              <View style={{marginTop: 5}}>
                <LoginButton
                  onLogoutFinished={() => {
                    dispatch(SetUser(null));
                    navigation.navigate('Login_Register_Sc');
                  }}
                />
              </View>
            ) : (
              <Button
                icon="logout"
                mode="contained"
                style={{marginTop: 5}}
                onPress={() =>{
                  dispatch(SetUser(null));
                  navigation.navigate('Login_Register_Sc');
                }}>
                Đăng xuất
              </Button>
            )}
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
