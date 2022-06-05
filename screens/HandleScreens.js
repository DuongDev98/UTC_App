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
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default HandleScreens;