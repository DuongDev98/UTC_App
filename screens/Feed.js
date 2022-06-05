import React, {Component, useEffect, useState} from 'react';
import {FlatList, View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import HttpClient from '../utils/HttpClient';
import Icon from 'react-native-vector-icons/Ionicons';

function Feed({navigation}) {
  let [tinTucs, setTinTucs] = useState([]);
  useEffect(() => {
    let isMounted = true;
    HttpClient.GetJson('dsTinTuc', null)
      .then(data => {
        if (data.isSuccess) {
          let dataArr = data.data.arr;
          dataArr.forEach(element => {
            element.key = element.ID;
          });
          if (isMounted) setTinTucs(dataArr);
        } else {
          alert(data.message);
        }
      })
      .catch(err => {
        alert(err);
      });

    return () => {
      isMounted = false;
    };
  });

  return (
    <View style={styles.container}>
      <View style={styles.topbar}>
        <View style={styles.pntitle}>
          <Icon style={styles.title} name="leaf-outline" size={30} />
          <Text style={[styles.title, {fontSize: 25}]}>Tin tức</Text>
          <Icon style={styles.title} name="leaf-outline" size={30} />
        </View>
      </View>
      {tinTucs.length == 0 ? (
        <Text style={{fontSize: 20, marginTop: 10}}>Tin tức trống</Text>
      ) : (
        <FlatList
          style={{padding: 10}}
          data={tinTucs}
          renderItem={({item}) => (
            <View style={styles.item}>
              <TouchableOpacity
                onPress={() => navigation.navigate('ViewNewsSc', item)}>
                <Text style={styles.time}>{item.TIMECREATED}</Text>
                <Text style={styles.title}>{item.TITLE}</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //   padding: 5,
    //   backgroundColor: "white-smoke"
  },
  item: {
    padding: 10,
    backgroundColor: 'white',
    marginBottom: 10,
    borderRadius: 10,
  },
  time: {
    marginBottom: 10,
    fontSize: 16,
    color: 'blue',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    margin: 5,
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
});

export default Feed;
