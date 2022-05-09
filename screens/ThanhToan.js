import React, {Component} from 'react';
import Memory from '../utils/Memory';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {TextInput, Button, IconButton} from 'react-native-paper';
import {Picker} from '@react-native-picker/picker';
import HttpClient from '../utils/HttpClient';

class ThanhToan extends Component {
  constructor() {
    super();
    this.state = {
      loadding: false,
      id: '',
      name: '',
      dienthoai: '',
      diachi: '',
      tinhthanhid: '',
      quanhuyenid: '',
      phuongxaid: '',
      ghichu: '',
      datatinhthanh: [],
      dataquanhuyen: [],
      dataphuongxa: [],
    };
  }

  layDuLieuTinhThanh() {
    HttpClient.GetJson('dsTinhThanh', null).then(json => {
      if (json.isSuccess) {
        let o = json.data.arr;
        this.setState({datatinhthanh: o}, () => {
          this.layDuLieuQuanHuyen();
        });
      } else {
        alert(json.message);
      }
    });
  }

  layDuLieuQuanHuyen() {
    if (this.state.tinhthanhid.length > 0) {
      HttpClient.GetJson('dsQuanHuyen', {ID: this.state.tinhthanhid}).then(
        json => {
          if (json.isSuccess) {
            let o = json.data.arr;
            this.setState({dataquanhuyen: o}, () => {
              this.layDuLieuPhuongXa();
            });
          } else {
            alert(json.message);
          }
        },
      );
    }
  }

  layDuLieuPhuongXa() {
    if (this.state.quanhuyenid.length > 0) {
      HttpClient.GetJson('dsPhuongXa', {ID: this.state.quanhuyenid}).then(
        json => {
          if (json.isSuccess) {
            let o = json.data.arr;
            this.setState({dataphuongxa: o});
          } else {
            alert(json.message);
          }
        },
      );
    }
  }

  async thucHienThanhToan() {
    //chuẩn bị dữ liệu
    let donHang = {};
    let dsChiTiet = await Memory.GetCartItem();
    donHang.DKHACHHANGID = this.state.id;
    donHang.TENNGUOINHAN = this.state.name;
    donHang.DIENTHOAI = this.state.dienthoai;
    donHang.DIACHI = this.state.diachi;
    donHang.GHICHU = this.state.ghichu;
    donHang.DTINHTHANHID = this.state.tinhthanhid;
    donHang.DQUANHUYENID = this.state.quanhuyenid;
    donHang.DPHUONGXAID = this.state.phuongxaid;
    donHang.TDONHANGCHITIETs = dsChiTiet;
    let json = await HttpClient.GetJson('thucHienThanhToan', donHang);
    if (json.isSuccess) {
      alert('Thanh toán thành công');
    } else {
      alert(json.message);
    }
  }

  async componentDidMount() {
    this.layDuLieuTinhThanh();
    let o = await Memory.GetUserInfo();
    this.setState({
      id: o.ID,
      name: o.NAME,
      dienthoai: o.DIENTHOAI,
      diachi: o.DIACHI,
      tinhthanhid: o.DTINHTHANHID ?? '',
      quanhuyenid: o.DQUANHUYENID ?? '',
      phuongxaid: o.DPHUONGXAID ?? '',
    });
  }

  render() {
    let {datatinhthanh, dataquanhuyen, dataphuongxa} = this.state;
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.textInput}
          label="Họ và tên người nhận"
          placeholder="Nhập họ và tên"
          value={this.state.name}
          onChangeText={text => this.setState({name: text})}
        />
        <TextInput
          style={styles.textInput}
          label="Điện thoại người nhận"
          placeholder="Nhập số điện thoại"
          value={this.state.dienthoai}
          onChangeText={text => this.setState({dienthoai: text})}
        />
        {/* Tỉnh thành */}
        <Picker
          style={styles.combobox}
          selectedValue={this.state.tinhthanhid}
          onValueChange={(itemValue, itemIndex) => {
            if (itemValue != this.state.tinhthanhid) {
              this.setState(
                {
                  tinhthanhid: itemValue,
                  quanhuyenid: '',
                  phuongxaid: '',
                  dataquanhuyen: [],
                  dataphuongxa: [],
                },
                () => {
                  this.layDuLieuQuanHuyen();
                },
              );
            }
          }}>
          {datatinhthanh.map((val, i) => {
            return <Picker.Item key={val.ID} label={val.NAME} value={val.ID} />;
          })}
        </Picker>

        {/* Quận huyện */}
        <Picker
          style={styles.combobox}
          selectedValue={this.state.quanhuyenid}
          onValueChange={(itemValue, itemIndex) => {
            if (itemValue != this.state.quanhuyenid) {
              this.setState(
                {quanhuyenid: itemValue, dataphuongxa: [], phuongxaid: ''},
                () => {
                  this.layDuLieuPhuongXa();
                },
              );
            }
          }}>
          {dataquanhuyen.map((val, i) => {
            return <Picker.Item key={val.ID} label={val.NAME} value={val.ID} />;
          })}
        </Picker>

        {/* Phường xã */}
        <Picker
          style={styles.combobox}
          selectedValue={this.state.phuongxaid}
          onValueChange={(itemValue, itemIndex) => {
            //fill dữ liệu quận huyện
            this.setState({phuongxaid: itemValue});
          }}>
          {dataphuongxa.map((val, i) => {
            val.key = val.ID;
            return <Picker.Item key={val.ID} label={val.NAME} value={val.ID} />;
          })}
        </Picker>
        <TextInput
          style={styles.textInput}
          label="Địa chỉ người nhận"
          placeholder="Nhập số nhà..."
          value={this.state.diachi}
          onChangeText={text => this.setState({diachi: text})}
        />
        <TextInput
          style={styles.textInput}
          label="Ghi chú"
          placeholder="Nhập ghi chú..."
          value={this.state.ghichu}
          onChangeText={text => this.setState({ghichu: text})}
        />
        <Button
          style={styles.btn}
          mode="contained"
          onPress={() => this.thucHienThanhToan()}>
          <Text>Thanh toán</Text>
        </Button>
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
  textInput: {
    backgroundColor: 'white',
    marginTop: 5,
  },
  btn: {
    marginTop: 5,
  },
  combobox: {
    marginTop: 5,
    paddingTop: 32,
    paddingBottom: 32,
    paddingLeft: 10,
    backgroundColor: 'white',
    marginBottom: 2,
    elevation: 1,
    shadowColor: 'black',
  },
  diaDiemText: {
    fontSize: 16,
  },
});

export default ThanhToan;
