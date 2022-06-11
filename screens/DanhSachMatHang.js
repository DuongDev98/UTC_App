import React, {Component, useEffect, useState} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import HttpClient from '../utils/HttpClient';
import MatHangItemList from './items/MatHangItemList';
import {FlatGrid} from 'react-native-super-grid';

function DanhSachMatHang({navigation, route}) {

  let [data, setData] = useState([]);

  useEffect(()=>{
    navigation.setOptions({title: route.params.title});

    let o = {};
    o.s = route.params.s;
    o.thuongHieuId = route.params.thuongHieuId;
    o.nhomId = route.params.nhomId;
    HttpClient.GetJson('timKiemMatHang', o).then(json=>{
      if (json.isSuccess) {
        setData(json.data.arr);
      } else {
        alert(json.message);
      }
    }).catch(err=>{
      alert(err);
    });
  }, []);

  return (
    <View style={styles.container}>
      {data.length == 0 ? (
        <Text>Danh sách trống</Text>
      ) : (
        <FlatGrid
          maxItemsPerRow={2}
          spacing={10}
          data={data}
          renderItem={({item}) => (
            <MatHangItemList
              navigation={navigation}
              key={item.ID}
              data={item}
            />
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    backgroundColor: 'white-smoke',
  },
});

export default DanhSachMatHang;
