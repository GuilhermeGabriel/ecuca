import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import ProgressBar from 'react-native-progress/Bar'

class ItemSimulado extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <TouchableOpacity style={styles.container}>
                <Text style={styles.title}>Nível {this.props.nivel} • {this.props.fase}º Fase • {this.props.ano}</Text>
                <Text style={styles.title}>7/20 Concluídas </Text>
                <ProgressBar progress={this.props.qC / 20} width={190} style={styles.progress} />
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 20,
        marginVertical: 8,
        padding: 12,
        borderRadius: 4,
        borderWidth: 1.5
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    progress: {
        marginTop: 8,
        marginBottom: 4
    }
})

export default ItemSimulado;