import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default class Payments extends Component {
    static navigationOptions = {
        header: null
    }

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>Ecuca</Text>
            </View >
        );
    }
}

const styles = StyleSheet.create({
    container: {
        margin: 20,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});