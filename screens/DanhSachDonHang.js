import React from 'react';
import {View, FlatList, Text, StyleSheet} from 'react-native';

function DanhSachDonHang({route}) {
  let arr = route.params.data;
  return (
    <View>
      {arr.length == 0 ? (
        <Text style={{fontSize: 20, marginTop: 10}}>
          Lịch sử giao dịch trống
        </Text>
      ) : (
        <FlatList
          style={{padding: 10}}
          data={arr}
          renderItem={({item}) => (
            <>
              <View style={[styles.donhang, {backgroundColor: '#c0d7fc'}]}>
                <View style={styles.donHangHeader}>
                  <Text style={[styles.donHangHeaderItem, {textAlign: 'left'}]}>
                    {item.NGAY}
                  </Text>
                  <Text
                    style={[styles.donHangHeaderItem, {textAlign: 'center'}]}>
                    {item.NAME}
                  </Text>
                  <Text
                    style={[styles.donHangHeaderItem, {textAlign: 'right'}]}>
                    {item.TRANGTHAI}
                  </Text>
                </View>
              </View>
              {item.CHITIET.map((chitiet, index) => {
                return (
                  <View style={[styles.donhang, {fontSize: 20,}]} key={index}>
                    <View style={styles.donHangHeader}>
                        <Text style={styles.donHangHeaderItem}>{chitiet.CODE + ' - ' + chitiet.NAME}</Text>
                    </View>
                    <View style={styles.donHangHeader}>
                        <Text style={[styles.donHangHeaderItem, {textAlign: 'left'}]}>{chitiet.DONGIA}</Text>
                        <Text style={[styles.donHangHeaderItem, {textAlign: 'center'}]}>{chitiet.SOLUONG}</Text>
                        <Text style={[styles.donHangHeaderItem, {textAlign: 'right'}]}>{chitiet.THANHTIEN}</Text>
                    </View>
                  </View>
                );
              })}

              <View style={[styles.donhang, {backgroundColor: '#ffe6a1', marginBottom: 10}]}>
                <View style={styles.donHangHeader}>
                  <Text style={[styles.donHangHeaderItem, {textAlign: 'left'}]}>
                    TỔNG CỘNG
                  </Text>
                  <Text
                    style={[styles.donHangHeaderItem, {textAlign: 'right'}]}>
                    {item.TONGCONG}
                  </Text>
                </View>
              </View>
            </>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  donhang: {
    padding: 10,
    backgroundColor: 'white',
    marginTop: 5,
  },
  donHangHeader: {
    flexDirection: 'row',
  },
  donHangHeaderItem: {
    flex: 1,
    fontSize: 20,
  },
});

export default DanhSachDonHang;
