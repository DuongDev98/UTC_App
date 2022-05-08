import React, {Component} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import Memory from '../utils/Memory';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {IconButton} from 'react-native-paper';

class Cart extends Component {
  constructor() {
    super();
    this.state = {
      arr: null,
    };
  }

  tangSl(item) {
    let arr = this.state.arr;
    arr.forEach(element => {
      if (element.DMATHANGID == item.DMATHANGID) {
        element.SOLUONG += 1;
      }
    });
    Memory.setCartItem(arr).then(() => {
      this.setState({arr: arr});
    });
  }

  giamSl(item) {
    let arr = this.state.arr;
    arr.forEach(element => {
      if (element.DMATHANGID == item.DMATHANGID) {
        if (element.SOLUONG > 0) {
          element.SOLUONG -= 1;
        }
      }
    });
    Memory.setCartItem(arr).then(() => {
      this.setState({arr: arr});
    });
  }

  itemList(item) {
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
              onPress={() => this.giamSl(item)}>
              <MaterialCommunityIcons name="numeric-negative-1" size={35} />
            </TouchableOpacity>
            <Text style={[styles.title, {padding: 10, fontSize: 25}]}>
              {item.SOLUONG}
            </Text>
            <TouchableOpacity
              style={styles.btn}
              onPress={() => this.tangSl(item)}>
              <MaterialCommunityIcons name="numeric-positive-1" size={35} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  loadding = false;
  async loadDataFromMemory() {
    if (this.loadding) return;
    this.loadding = true;
    let arr = await Memory.getCartItem();
    this.setState(
      {
        arr: arr,
      },
      () => {
        this.loadding = false;
      },
    );
  }

  async componentDidMount() {
    this.loadDataFromMemory();
  }

  async componentDidUpdate() {
    this.loadDataFromMemory();
  }

  thanhToan() {
    this.props.navigation.navigate('ThanhToanSc');
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.arr == null || this.state.arr.length == 0 ? (
          <Text>Danh sách giỏ hàng trống</Text>
        ) : (
          this.state.arr.map((item, index) => this.itemList(item))
        )}
        <IconButton
          color="white"
          icon={'cash-fast'}
          style={styles.btnThanhToan}
          onPress={() => this.thanhToan()}
        />
      </View>
    );
  }
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
