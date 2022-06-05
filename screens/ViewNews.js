import React from 'react';
import {View, StyleSheet, Dimensions, ScrollView} from 'react-native';
import RenderHtml from 'react-native-render-html';

function ViewNews({route}) {  
    return (
        <ScrollView style={styles.container}>
            {
                route.params == null ?
                null :
                <RenderHtml source={{
                    html: route.params.NOIDUNG
                }} contentWidth={Dimensions.get('window').width}/>
            }
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 5,
      backgroundColor: "white-smoke"
    },
    a:{
        fontWeight: '300',
        color: '#FF3366',
    }
});

export default ViewNews;