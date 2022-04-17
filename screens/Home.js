import React, { Component } from 'react';
import {View} from 'react-native';
import { Appbar } from 'react-native-paper';

class Home extends Component {
    render() {
        return (
            <View>
                <Appbar.Header>
                    <Appbar.Action icon="magnify" onPress={()=>{}} />
                    <Appbar.Action icon="dots-vertical" onPress={()=>{}} />
                </Appbar.Header>
            </View>
        );
    }
}

export default Home;