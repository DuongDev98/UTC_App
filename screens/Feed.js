import React, { Component } from 'react';
import { FlatList, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import HttpClient from '../utils/HttpClient';

class Feed extends Component {

    constructor() {
        super();
        this.state = {
            tinTucs: null
        };
    }

    async componentDidMount() {
        let data = await HttpClient.GetJson("dsTinTuc", null);
        if (data.isSuccess)
        {
            let dataArr = data.data.arr;
            dataArr.forEach(element => {
                element.key = element.ID;
            });

            this.setState({
                tinTucs: dataArr
            });
        }
        else
        {
            alert(data.message);
        }
    }

    onPress(item) {
        this.props.navigation.navigate("ViewNewsSc", item);
    }

    render() {
        return (
            <View style={styles.container}>
                {
                    this.state.tinTucs == null ?
                        <Text style={{fontSize: 20}}>Tin tức trống</Text>
                    :
                    <FlatList
                        data={this.state.tinTucs}
                        renderItem={({item}) => <View style={styles.item}>
                            <TouchableOpacity onPress={()=>this.onPress(item)}>
                                <Text style={styles.time}>{item.TIMECREATED}</Text>
                                <Text style={styles.title}>{item.TITLE}</Text>
                            </TouchableOpacity>
                        </View>}
                    />
                }
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
    item: {
        padding: 10,
        backgroundColor: '#ffe6a1',
        marginBottom: 5,
        borderRadius: 10,
    },
    time: {
        marginBottom: 10,
        fontSize: 16,
        color: 'blue'
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold'
    },
});

export default Feed;