import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native'
import ProgressBar from 'react-native-progress/Bar'

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
                <ProgressBar
                    width={Dimensions.get('window').width}
                    progress={12 / 20} />
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