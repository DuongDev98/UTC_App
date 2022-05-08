import React, {Component} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import HttpClient from '../utils/HttpClient';
import MatHangItemList from './items/MatHangItemList';
import {FlatGrid} from 'react-native-super-grid';

class DanhSachMatHang extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
    };
  }

  async componentDidMount() {
    this.props.navigation.setOptions({title: this.props.route.params.title});

    let o = {};
    o.s = this.props.route.params.s;
    o.thuongHieuId = this.props.route.params.thuongHieuId;
    o.nhomId = this.props.route.params.nhomId;
    let json = await HttpClient.GetJson('timKiemMatHang', o);
    if (json.isSuccess) {
      this.setState({
        data: json.data.arr,
      });
    } else {
      alert(json.message);
    }
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.data == null || this.state.data.length == 0 ? (
          <Text>Danh sách trống</Text>
        ) : (
          <FlatGrid
            maxItemsPerRow={2}
            spacing={10}
            data={this.state.data}
            renderItem={({item}) => (
              <MatHangItemList
                navigation={this.props.navigation}
                key={item.ID}
                data={item}
              />
            )}
          />
        )}
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
});

export default DanhSachMatHang;
