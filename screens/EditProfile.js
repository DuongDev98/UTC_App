import React, { Component } from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {TextInput} from 'react-native-paper';

class EditProfile extends Component {

    constructor () {
        super();
        this.state = {
            name: ""
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <TextInput label="Họ và tên" placeholder='Nhập họ và tên' value={this.state.name} onChangeText={text => this.setState({name: text})} />
            </View>
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
    }
});

export default EditProfile;