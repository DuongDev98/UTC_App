import React, {useEffect, useState} from 'react';
import {FlatList, View, TouchableOpacity, StyleSheet, Text, DeviceEventEmitter} from 'react-native';
import Loadding from 'react-native-loading-spinner-overlay';
import {TextInput} from 'react-native-paper';
import HttpClient from '../utils/HttpClient';

function ChonDiaDiem({navigation, route}) {
  const [loadding, setLoadding] = useState(false);
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');
  useEffect(() => {
    setLoadding(true);
    HttpClient.GetJson('chonDiaDiem', {
      LOAI: route.params.LOAI,
      ID: route.params.ID,
    })
      .then(json => {
        setLoadding(false);
        if (json.isSuccess) {
          setData(json.data.arr);
        } else {
          alert(json.message);
        }
      })
      .catch(err => {
        setLoadding(false);
        alert(err);
      });
  }, []);

  const Item = ({id, title}) => (
    <TouchableOpacity style={styles.item} onPress={()=>{
        navigation.goBack();
        if (route.params.LOAI == 0) DeviceEventEmitter.emit("chonTinhThanh", id, title);
        else if (route.params.LOAI == 1) DeviceEventEmitter.emit("chonQuanHuyen", id, title);
        else if (route.params.LOAI == 2) DeviceEventEmitter.emit("chonPhuongXa", id, title);
    }}>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
  
  const renderItem = ({item}) => <Item key={item.ID} id={item.ID} title={item.NAME}/>;

  return (
    <>
      {loadding ? (
        <Loadding spinnerKey="loadding..." visible={loadding} />
      ) : (
        <View style={styles.container}>
          <TextInput placeholder='Tìm kiếm...' onChangeText={(text)=>setSearch(text)}/>
          <FlatList
            data={data.filter(item => item.NAME.indexOf(search) >= 0)}
            renderItem={renderItem}></FlatList>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    backgroundColor: 'white-smoke',
  },
  item: {
    backgroundColor: 'white',
    padding: 20,
    marginTop: 10,
  },
});

export default ChonDiaDiem;
