import React, { Component } from 'react';
import { FlatList, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import HttpClient from '../utils/HttpClient';
import Icon from 'react-native-vector-icons/Ionicons';

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
                <View style={styles.topbar}>
                    <View style={styles.pntitle}>
                        <Icon style={styles.title} name='leaf-outline' size={30}/>
                        <Text style={[styles.title, {fontSize: 25}]}>Tin tức</Text>
                        <Icon style={styles.title} name='leaf-outline' size={30}/>
                    </View>
                </View>
                {
                    this.state.tinTucs == null ?
                        <Text style={{fontSize: 20, marginTop: 10}}>Tin tức trống</Text>
                    :
                    <FlatList style={{ padding: 10 }}
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
    //   padding: 5,
    //   backgroundColor: "white-smoke"
    },
    item: {
        padding: 10,
        backgroundColor: 'white',
        marginBottom: 10,
        borderRadius: 10,
    },
    time: {
        marginBottom: 10,
        fontSize: 16,
        color: 'blue'
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        margin: 5
    },
    topbar: {
        flexDirection: 'row',
        height:60,
        justifyContent: 'center',
        backgroundColor: '#ffe6a1',
    },
    pntitle: {
        fontSize: 25,
        marginTop: 'auto',
        marginBottom: 'auto',
        flexDirection: 'row'
    }
});

export default Feed;