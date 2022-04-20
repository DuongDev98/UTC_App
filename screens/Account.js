import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Avatar, Button, IconButton } from 'react-native-paper';
import Contants from '../utils/Contants';
//Avatar, Tên, Cài đặt
//Chờ thanh toán, Chờ vận chuyển, Chờ giao hàng, Đơn hoàn thành, Đơn đã hủy

class Account extends Component {

    constructor() {
        super();
        this.state = {
            user: null
        };
    }

    async componentDidMount() {
        let json = await AsyncStorage.getItem(Contants.User);
        let o = JSON.parse(json);
        this.setState({
            user: o
        });
    }

    editProfile() {
        this.props.navigation.navigate("EditProfileSc");
    }

    render() {
        return (
            <>
                {
                    this.state.user == null ? null : 
                    <View style={styles.container}>
                        <View style={styles.rowuser}>
                            <Avatar.Image size={64} source={{ uri: Contants.ImgUri + this.state.user.AVATAR}}  />
                            <View style={styles.containerLblName}>
                                <Text style={styles.lblName}>{this.state.user.NAME}</Text>
                            </View>
                            <IconButton style={styles.iconEditProfile} icon={"account-edit"} size={30} onPress={()=>this.editProfile()}/>
                        </View>
                    </View>
                }
            </>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    rowuser: {
        flexDirection: 'row',
        padding: 10,
        backgroundColor: '#ffe6a1'
    },
    containerLblName: {
        justifyContent: 'center',
    },
    lblName: {
        fontSize: 20,
        marginLeft: 10,
        fontWeight: 'bold'
    },
    iconEditProfile: {
        marginLeft: 'auto',
    }
});

export default Account;