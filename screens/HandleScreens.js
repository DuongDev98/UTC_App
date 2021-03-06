import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FlashSc from './FlashScreen';
import MainSc from './Main';
import Login_Register_Sc from './Login_Register';
import EditProfileSc from './EditProfile';
import ViewNewsSc from './ViewNews';
import DanhSachMatHangSc from './DanhSachMatHang';
import MatHangSc from './MatHang';
import ThanhToanSc from './ThanhToan';
import DanhSachDonHangSc from './DanhSachDonHang';
import NhanHangThanhToanSc from './NhanHangThanhToan';
import PaypalSc from './PayPal';
import ChonDiaDiemSc from './ChonDiaDiem';
const Stack = createNativeStackNavigator();
function HandleScreens() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="FlashSc" component={FlashSc} options={{ headerShown: false }} />
                <Stack.Screen name="Login_Register_Sc" component={Login_Register_Sc} options={{ headerShown: false }} />
                <Stack.Screen name="MainSc" component={MainSc} options={{ headerShown: false }} />
                <Stack.Screen name="EditProfileSc" component={EditProfileSc} options={{ headerShown: true, title: "Chỉnh sửa thông tin" }} />
                <Stack.Screen name="ViewNewsSc" component={ViewNewsSc} options={{ headerShown: true, title: "Chi tiết bài viết" }} />
                <Stack.Screen name="DanhSachMatHangSc" component={DanhSachMatHangSc} options={{ headerShown: true, title: "" }} />
                <Stack.Screen name="MatHangSc" component={MatHangSc} options={{ headerShown: true, title: "Chi tiết sản phẩm" }} />
                <Stack.Screen name="ThanhToanSc" component={ThanhToanSc} options={{ headerShown: true, title: "Thanh toán" }} />
                <Stack.Screen name="DanhSachDonHangSc" component={DanhSachDonHangSc} options={{ headerShown: true, title: "Lịch sử mua hàng" }} />
                <Stack.Screen name="NhanHangThanhToanSc" component={NhanHangThanhToanSc} options={{ headerShown: true, title: "Xác nhận thanh toán" }} />
                <Stack.Screen name="PaypalSc" component={PaypalSc} options={{ headerShown: true, title: "Paypal payment" }} />
                <Stack.Screen name="ChonDiaDiemSc" component={ChonDiaDiemSc} options={{ headerShown: true, title: "Chọn địa điểm" }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default HandleScreens;