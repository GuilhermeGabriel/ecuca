import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native'

class Simulado extends Component {
    static navigationOptions = {
        title: 'Nível 1 • 2º Fase • 2008',
        headerLeft: null,
        headerTitleStyle: {
            fontWeight: 'bold'
        },
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Simulado</Text>
            </View >
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})

export default Simulado;