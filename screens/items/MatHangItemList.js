import React, {Component} from 'react';
import {View, Text, StyleSheet, Dimensions, TouchableOpacity, Image} from 'react-native';
import Contants from '../../utils/Contants';
import Format from '../../utils/Format';

let width = Dimensions.get('window').width / 2 - 30;
let height = (width * 3) / 2;
class MatHangItemList extends Component {
  constructor() {
    super();
    this.state = {
      item: null
    }
  }

  componentDidMount() {
    this.setState({
      item: this.props.data
    });
    if (this.props.width != null) width = this.props.width;
    if (this.props.width != null) width = this.props.width;
  }

  render() {
    return (
      this.state.item == null ? null :
      <TouchableOpacity style={styles.container}>
        <Image source={{ uri: Contants.ImgUri + this.state.item.AVATAR}} style={{ width: width - 20, height: height - 90, resizeMode : 'contain' }} />
        <View style={styles.pnTitle}>
          <Text style={styles.title}>{this.state.item.NAME}</Text>
        </View>
        <View style={styles.pnTitle}>
          <Text style={styles.title}>{Format.formatNumber(this.state.item.GIABAN)}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
    flexDirection: 'column',
    width: width,
    height: height,
    // justifyContent: 'center',
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 8,
    borderColor: 'red',
    shadowColor: "#000",
    shadowOffset: { width: 10, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 8,
  },
  pnTitle: {
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 'auto',
    marginBottom: 'auto'
  },
  title: {
    padding: 5,
    fontSize: 16,
    color: 'black'
  }
});

export default MatHangItemList;
