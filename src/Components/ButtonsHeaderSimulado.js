import React, { Component } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native'

export default class ButtonsHeaderSimulado extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity >
                    <Text style={styles.time}>04:29</Text>
                </TouchableOpacity>
                <TouchableOpacity >
                    <Text style={styles.btn}>{'❮❮'}</Text>
                </TouchableOpacity>
                <TouchableOpacity >
                    <Text style={styles.btn}>{'❯❯'}</Text>
                </TouchableOpacity>
            </View >
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
    },
    btn: {
        fontWeight: 'bold',
        paddingVertical: 4,
        paddingHorizontal: 12,
        borderRadius: 4,
        color: 'black',
        fontSize: 20,
        marginHorizontal: 2,
    },
    time: {
        fontWeight: 'bold',
        paddingVertical: 8,
        paddingHorizontal: 4,
        borderRadius: 4,
        color: 'black',
        fontSize: 16,
        marginHorizontal: 2,
    }
})