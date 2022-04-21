import React, { Component } from 'react';
import {View, StyleSheet, Dimensions, ScrollView} from 'react-native';
import RenderHtml from 'react-native-render-html';

class ViewNews extends Component {

    constructor() {
        super();
    }

    render() {
        return (
            <ScrollView style={styles.container}>
                {
                    this.props.route.params == null ?
                    null :
                    <RenderHtml source={{
                        html: this.props.route.params.NOIDUNG
                    }} contentWidth={Dimensions.get('window').width}/>
                }
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 5,
      backgroundColor: "white-smoke"
    },
    a:{
        fontWeight: '300',
        color: '#FF3366', // make links coloured pink
    }
});

export default ViewNews;