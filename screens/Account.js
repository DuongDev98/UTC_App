import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Avatar, Button, IconButton, Badge } from 'react-native-paper';
import Contants from '../utils/Contants';
import Icon from 'react-native-vector-icons/FontAwesome';

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
        this.props.navigation.navigate("EditProfileSc", this.state.user);
    }

    danhSachDonHang(trangthai) {
        alert("danh sach don hang");
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
                        <View style={{ flexDirection: 'row', padding: 10 }}>
                            <Text style={{ fontWeight: 'bold', fontSize: 16}}>Đơn hàng của tôi</Text>
                            <TouchableOpacity style={{marginLeft: 'auto'}} onPress={()=>this.danhSachDonHang("")}>
                                <Text style={{ color: "blue" }}>Xem tất cả đơn hàng</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={[{ flexDirection: 'column', padding: 10 }, { paddingTop: 0 }]}>
                            <TouchableOpacity onPress={()=>this.danhSachDonHang("")} style={styles.containerBtn}><View style={styles.iconBtn}><Badge style={{position: 'absolute'}}>3</Badge><Text style={{fontSize: 16}}>Chở xử lý</Text></View></TouchableOpacity>
                            <TouchableOpacity onPress={()=>this.danhSachDonHang("")} style={styles.containerBtn}><View style={styles.iconBtn}><Badge style={{position: 'absolute'}}>3</Badge><Text style={{fontSize: 16}}>Đã xác nhận</Text></View></TouchableOpacity>
                            <TouchableOpacity onPress={()=>this.danhSachDonHang("")} style={styles.containerBtn}><View style={styles.iconBtn}><Badge style={{position: 'absolute'}}>3</Badge><Text style={{fontSize: 16}}>Chờ giao hàng</Text></View></TouchableOpacity>
                            <TouchableOpacity onPress={()=>this.danhSachDonHang("")} style={styles.containerBtn}><View style={styles.iconBtn}><Badge style={{position: 'absolute'}}>3</Badge><Text style={{fontSize: 16}}>Đơn hoàn thành</Text></View></TouchableOpacity>
                            <TouchableOpacity onPress={()=>this.danhSachDonHang("")} style={styles.containerBtn}><View style={styles.iconBtn}><Badge style={{position: 'absolute'}}>3</Badge><Text style={{fontSize: 16}}>Đơn đã hủy</Text></View></TouchableOpacity>
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
    },
    containerBtn: {
        padding: 10,
        paddingTop: 20,
        paddingBottom: 20,
        marginTop: 5,
        backgroundColor: 'white',
    },
    iconBtn: {
        width: 150
    }
});

export default Account;