import React, { Component } from 'react';
import { View, Text } from 'react-native';

class DanhSachTimKiem extends Component {

    constructor() {
        super();
        this.state = {
            data: []
        }
    }

    render() {
        return (
            <View>
                <Text>Danh sách tìm kiếm</Text>
            </View>
        );
    }
}

export default DanhSachTimKiem;