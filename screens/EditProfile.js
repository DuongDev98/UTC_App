import React, { Component } from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {TextInput, Button, IconButton} from 'react-native-paper';
import Loadding from 'react-native-loading-spinner-overlay';
import {Picker} from '@react-native-picker/picker';
import HttpClient from '../utils/HttpClient';

class EditProfile extends Component {

    constructor () {
        super();
        this.state = {
            loadding: false,
            id: "",
            name: "",
            dienthoai: "",
            email: "",
            diachi: "",
            tinhthanhid: "",
            quanhuyenid: "",
            phuongxaid: "",
            datatinhthanh: [],
            dataquanhuyen: [],
            dataphuongxa: []
        }
    }

    layDuLieuTinhThanh() {
        HttpClient.GetJson("dsTinhThanh", null).then((json)=>{
            if (json.isSuccess)
            {
                let o = json.data.arr;
                this.setState({datatinhthanh: o}, ()=>{
                    this.layDuLieuQuanHuyen();
                });
            }
            else
            {
                alert(json.message);
            }
        });
    }

    layDuLieuQuanHuyen() {
        if (this.state.tinhthanhid.length > 0)
        {
            HttpClient.GetJson("dsQuanHuyen", {ID: this.state.tinhthanhid}).then((json)=>{
                if (json.isSuccess)
                {
                    let o = json.data.arr;
                    this.setState({dataquanhuyen: o}, ()=>{
                        this.layDuLieuPhuongXa();
                    });
                }
                else
                {
                    alert(json.message);
                }
            });
        }
    }

    layDuLieuPhuongXa() {
        if (this.state.quanhuyenid.length > 0)
        {
            HttpClient.GetJson("dsPhuongXa", {ID: this.state.quanhuyenid}).then((json)=>{
                if (json.isSuccess)
                {
                    let o = json.data.arr;
                    this.setState({dataphuongxa: o});
                }
                else
                {
                    alert(json.message);
                }
            });
        }
    }

    async capNhatDuLieu() {
        let o = { id : this.state.id, name: this.state.name, dienthoai: this.state.dienthoai, email: this.state.email, tinhthanhid : this.state.tinhthanhid, quanhuyenid: this.state.quanhuyenid, phuongxaid : this.state.phuongxaid, diachi : this.state.diachi };
        //kiểm tra thông tin cần thiết
        let err = "";
        if (o.name == null || o.name.length == 0) err = "Họ và tên trống";
        else if (o.email == null || o.email.length == 0) err = "Email trống";
        else if (o.dienthoai == null || o.dienthoai.length == 0) err = "Điện thoại trống";
        else if (o.diachi == null || o.diachi.length == 0) err = "Địa chỉ trống";

        if (err.length > 0) alert(err);
        else
        {
            //cap nhat du lieu
            this.setState({loadding: true});
            let json = await HttpClient.GetJson("capNhatThongTin", o);
            this.setState({loadding: false});
            if (json.isSuccess)
            {
                alert("Cập nhật thông tin thành công, thoát ứng dụng vào lại để cập nhật thông tin");
            }
            else
            {
                alert(json.message);
            }
        }
    }

    componentDidMount() {
        this.layDuLieuTinhThanh();
        let o = this.props.route.params;
        this.setState({
            id: o.ID,
            name: o.NAME,
            dienthoai: o.DIENTHOAI,
            diachi: o.DIACHI,
            email: o.EMAIL,
            tinhthanhid: o.DTINHTHANHID,
            quanhuyenid: o.DQUANHUYENID,
            phuongxaid: o.DPHUONGXAID,
        });
    }

    render() {
        let { datatinhthanh, dataquanhuyen, dataphuongxa} = this.state;
        return (
            <>
                {
                    this.state.loadding ? <Loadding spinnerKey='loadding...' visible={this.state.loadding}/>
                    :
                    <View style={styles.container}>
                        <TextInput style={styles.textInput} label="Họ và tên" placeholder='Nhập họ và tên' value={this.state.name} onChangeText={text => this.setState({name: text})} />
                        <TextInput style={styles.textInput} label="Điện thoại" placeholder='Nhập số điện thoại' value={this.state.dienthoai} onChangeText={text => this.setState({dienthoai: text})} />
                        <TextInput style={styles.textInput} label="Email" placeholder='Nhập email' value={this.state.email} onChangeText={text => this.setState({email: text})} />
                        {/* Tỉnh thành */}
                        <Picker style={styles.combobox} selectedValue={this.state.tinhthanhid}
                            onValueChange={(itemValue, itemIndex) => {
                                if (itemValue != this.state.tinhthanhid)
                                {
                                    this.setState({ tinhthanhid: itemValue, quanhuyenid: "", phuongxaid: "", dataquanhuyen: [], dataphuongxa: []}, ()=>{
                                        this.layDuLieuQuanHuyen();
                                    });
                                }
                            }}
                        >
                            {
                                datatinhthanh.map((val, i)=>{
                                    return <Picker.Item label={val.NAME} value={val.ID} />;
                                })
                            }
                        </Picker>

                        {/* Quận huyện */}
                        <Picker style={styles.combobox} selectedValue={this.state.quanhuyenid}
                            onValueChange={(itemValue, itemIndex) => {
                                if (itemValue != this.state.quanhuyenid)
                                {
                                    this.setState({ quanhuyenid: itemValue, dataphuongxa: [], phuongxaid: ""}, ()=>{
                                        this.layDuLieuPhuongXa();
                                    });
                                }
                            }}
                        >
                            {
                                dataquanhuyen.map((val, i)=>{
                                    return <Picker.Item label={val.NAME} value={val.ID} />;
                                })
                            }
                        </Picker>

                        {/* Phường xã */}
                        <Picker style={styles.combobox} selectedValue={this.state.phuongxaid}
                            onValueChange={(itemValue, itemIndex) => {
                                //fill dữ liệu quận huyện
                                this.setState({ phuongxaid: itemValue})
                            }}
                        >
                            {
                                dataphuongxa.map((val, i)=>{
                                    return <Picker.Item label={val.NAME} value={val.ID} />;
                                })
                            }
                        </Picker>
                        <TextInput style={styles.textInput} label="Địa chỉ" placeholder='Nhập số nhà...' value={this.state.diachi} onChangeText={text => this.setState({diachi: text})} />
                        <Button style={styles.btn} mode='contained' onPress={()=>this.capNhatDuLieu()}><Text>Cập nhật</Text></Button>
                    </View>
                }
            </>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 5,
      backgroundColor: "white-smoke"
    },
    textInput:{
        backgroundColor: 'white',
        marginTop:5
    },
    btn:{
        marginTop:5
    },
    combobox:{
        marginTop:5,
        paddingTop: 32,
        paddingBottom: 32,
        paddingLeft: 10,
        backgroundColor: 'white',
        marginBottom: 2,
        elevation: 1,
        shadowColor: 'black',
    },
    diaDiemText: {
        fontSize: 16
    }
});

export default EditProfile;