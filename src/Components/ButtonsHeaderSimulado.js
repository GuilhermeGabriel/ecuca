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
                    <Text style={styles.btn}>aa</Text>
                </TouchableOpacity>
                <TouchableOpacity >
                    <Text style={styles.btn}>aa</Text>
                </TouchableOpacity>
                <TouchableOpacity >
                    <Text style={styles.btn}>aa</Text>
                </TouchableOpacity>
            </View >
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
    },
    btn: {
        padding: 4,
        borderRadius: 4,
        backgroundColor: 'black',
        color: 'white',
        fontSize: 14,
        marginHorizontal: 12,
    }
})