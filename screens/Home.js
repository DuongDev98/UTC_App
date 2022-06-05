import React, {Component, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  SectionList,
} from 'react-native';
import {Searchbar} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import HttpClient from '../utils/HttpClient';
import MatHangItemList from './items/MatHangItemList';

function timKiemMatHang(navigation, search) {
  if (search.length == 0) {
    alert('Bạn chưa nhập dữ liệu để tìm kiếm');
  } else {
    let o = {};
    o.title = 'Kết quả tìm kiếm';
    o.s = search;
    navigation.navigate('DanhSachMatHangSc', o);
  }
}

function thuongHieuClick(navigation, thuongHieuId) {
  let o = {};
  o.thuongHieuId = thuongHieuId;
  o.title = 'Danh sách mặt hàng';
  navigation.navigate('DanhSachMatHangSc', o);
}

function nhomClick(navigation, nhomId) {
  let o = {};
  o.nhomId = nhomId;
  o.title = 'Danh sách mặt hàng';
  navigation.navigate('DanhSachMatHangSc', o);
}

function Home({navigation}) {
  const [search, setSearch] = useState('');
  const [dataThuongHieus, setDataThuongHieus] = useState([]);
  const [dataNhomHangs, setDataNhomHangs] = useState([]);

  useEffect(() => {
    let isMounted = true;

    HttpClient.GetJson('dsThuongHieu', null).then(json => {
      if (json.isSuccess) {
        if (isMounted) setDataThuongHieus(json.data.arr);
      } else {
        alert(json.message);
      }
    });

    HttpClient.GetJson('dsNhom', null).then(json => {
      if (json.isSuccess) {
        json.data.arr.forEach(element => {
          element.data = element.DMATHANGs;
        });
        if (isMounted) setDataNhomHangs(json.data.arr);
      } else {
        alert(json.message);
      }
    });

    return () => {
      isMounted = false;
    };
  });

  return (
    <View style={styles.container}>
      {/* top */}
      <View style={styles.topbar}>
        <View style={styles.pntitle}>
          <Icon style={styles.title} name="heart-outline" size={30} />
          <Text style={[styles.title, {fontSize: 25}]}>Trang chủ</Text>
          <Icon style={styles.title} name="heart-outline" size={30} />
        </View>
      </View>
      {/* tim kiem */}
      <View style={styles.pnSearch}>
        <Searchbar
          value={search}
          onChangeText={text => {
            setSearch(text);
          }}
          onEndEditing={() => timKiemMatHang(navigation, search)}
          onIconPress={() => timKiemMatHang(navigation, search)}
        />
      </View>
      <ScrollView>
        {/* danh sach thuong hieu */}
        <View style={{padding: 10}}>
          <Text style={styles.titleNhom}>Thương hiệu</Text>
          <ScrollView horizontal={true}>
            <View style={styles.pnNhom}>
              {dataThuongHieus.map((item, index) => {
                return (
                  <TouchableOpacity
                    key={item.ID}
                    style={styles.itNhom}
                    onPress={() => thuongHieuClick(navigation, item.ID)}>
                    <Text key={item.ID} style={styles.textNhom}>
                      {item.NAME}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </ScrollView>
        </View>
        {/* danh sach nhom hang theo hang ngang, nut xem them */}
        <View style={{padding: 10}}>
          <Text style={styles.titleNhom}>Nhóm hàng</Text>
          {dataNhomHangs.map((item, i) => {
            return (
              <View key={item.ID}>
                <View style={{flexDirection: 'row', padding: 10}}>
                  <Text style={{fontWeight: 'bold', fontSize: 20}}>
                    {item.NAME}
                  </Text>
                  <TouchableOpacity
                    style={{marginLeft: 'auto'}}
                    onPress={() => nhomClick(navigation, item.ID)}>
                    <Text style={{color: 'blue'}}>Xem tất cả</Text>
                  </TouchableOpacity>
                </View>
                <View style={{}}>
                  <ScrollView horizontal={true}>
                    {item.DMATHANGs.map((mhRow, index) => {
                      return (
                        <MatHangItemList
                          navigation={navigation}
                          key={mhRow.ID}
                          data={mhRow}
                        />
                      );
                    })}
                  </ScrollView>
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}

let width = Dimensions.get('window').width / 3 - 5;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topbar: {
    flexDirection: 'row',
    height: 60,
    justifyContent: 'center',
    backgroundColor: '#ffe6a1',
  },
  pntitle: {
    fontSize: 25,
    marginTop: 'auto',
    marginBottom: 'auto',
    flexDirection: 'row',
  },
  title: {
    margin: 5,
  },
  pnSearch: {
    padding: 10,
  },
  titleNhom: {
    padding: 10,
    fontSize: 25,
    backgroundColor: '#ff7940',
    marginBottom: 10,
  },
  pnNhom: {
    flexDirection: 'row',
  },
  itNhom: {
    marginHorizontal: 10,
    width: width,
    height: width,
    backgroundColor: '#a96bff',
    justifyContent: 'center',
    margin: 'auto',
    borderRadius: 10,
  },
  textNhom: {
    textAlign: 'center',
    color: 'white',
    fontSize: 30,
  },
});

export default Home;
