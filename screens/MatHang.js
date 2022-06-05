import React, {Component, useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  ScrollView,
} from 'react-native';
import HttpClient from '../utils/HttpClient';
import Slideshow from './items/Slideshow';
import Contants from '../utils/Contants';
import {Rating} from 'react-native-ratings';
import {IconButton} from 'react-native-paper';
import RenderHtml from 'react-native-render-html';

function addToCart(item) {
  let o = {};
  o.DMATHANGID = item.ID;
  o.NAME = item.NAME;
  o.DONGIA = item.GIABAN;
  o.SOLUONG = 1;
  o.AVATAR = item.images[0];
  alert("Đã thêm vào giỏ hàng");
}

function MatHang({route}) {

  const [item, setItem] = useState(null);
  const [arr, setArr] = useState([]);

 useEffect(()=>{
  HttpClient.GetJson('thongTinMatHang', {
    ID: route.params,
  }).then(json=>{
    if (json.isSuccess) {
      let images = [];
      json.data.DANHSANPHAMs.map((it, index) => {
        images.push({url: Contants.ImgUri + it.LINK});
      });
      json.data.images = images;
      setArr(json.data);
    } else {
      alert(json.message);
    }
  });
 });
 return item == null ? (
  <Text>Sản phẩm không tồn tại trong hệ thống</Text>
) : (
  <>
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>{item.NAME}</Text>
        <Slideshow
          dataSource={item.images}
          height={(height * 2) / 3}
        />
        <Rating type="heart" ratingCount={5} onFinishRating={() => {}} />
        <Text style={[styles.number]}>
          Giá bán: {item.GIABAN}
        </Text>
        <Text style={[styles.text]}>Mô tả</Text>
        <View style={{padding: 10}}>
            <RenderHtml
                source={{
                    html: item.MOTA,
                }}
                contentWidth={width}
            />
        </View>
      </View>
    </ScrollView>
    <IconButton
      color="white"
      icon={'cart'}
      style={styles.btnThem}
      onPress={() => addToCart(item)}
    />
  </>
);
}

let width = Dimensions.get('window').width;
let height = Dimensions.get('window').height;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    backgroundColor: 'white',
    paddingBottom: 60
  },
  title: {
    marginBottom: 10,
    padding: 10,
    fontSize: 25,
    textAlign: 'center',
    backgroundColor: '#ffe6a1',
  },
  number: {
    padding: 10,
    fontSize: 20,
    textAlign: 'left',
  },
  text: {
    padding: 10,
    fontSize: 20,
    textAlign: 'left',
  },
  btnThem: {
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

export default MatHang;