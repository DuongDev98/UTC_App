import React, {Component, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
} from 'react-native';
import Contants from '../../utils/Contants';
import Format from '../../utils/Format';

function itemPress(navigation, ID) {
  navigation.navigate('MatHangSc', ID);
}

let width = Dimensions.get('window').width / 2 - 30;
let height = (width * 3) / 2;
function MatHangItemList ({navigation, data}) {
  return data == null ? null : (
    <TouchableOpacity
      style={styles.container}
      onPress={() => itemPress(navigation, data.ID)}>
      <Image
        source={{uri: Contants.ImgUri + data.AVATAR}}
        style={{
          width: width - 20,
          height: height - 90,
          resizeMode: 'contain',
        }}
      />
      <View style={styles.pnTitle}>
        <Text style={styles.title}>{data.NAME}</Text>
      </View>
      <View style={styles.pnTitle}>
        <Text style={styles.title}>
          {Format.formatNumber(data.GIABAN)}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
    flexDirection: 'column',
    width: width,
    height: height,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 8,
    borderColor: 'red',
    shadowColor: '#000',
    shadowOffset: {width: 10, height: 10},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 8,
  },
  pnTitle: {
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 'auto',
    marginBottom: 'auto',
  },
  title: {
    padding: 5,
    fontSize: 16,
    color: 'black',
  },
});

export default MatHangItemList;
