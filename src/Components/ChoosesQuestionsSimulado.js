import React, { Component } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native'

const ItemAlternativa = (props) => {
    return (
        <TouchableOpacity>
            <View style={styles.containerAlter}>
                <Text style={styles.select}>{props.alter}</Text>
                <Text style={styles.selectText}>{props.enun}</Text>
            </View>
        </TouchableOpacity>
    )
}

class ChoosesQuestionsSimulado extends Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.divisor} />

                <ItemAlternativa alter='A' enun='Essa é top'></ItemAlternativa>

                <View style={styles.divisor} />

                <ItemAlternativa alter='B' enun='Essa é top'></ItemAlternativa>

                <View style={styles.divisor} />

                <ItemAlternativa alter='C' enun='Essa é top'></ItemAlternativa>

                <View style={styles.divisor} />

                <ItemAlternativa alter='D' enun='Essa é top'></ItemAlternativa>

                <View style={styles.divisor} />

                <ItemAlternativa alter='E' enun='Essa é top'></ItemAlternativa>

                <View style={styles.divisor} />

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 16,
        marginBottom: 48
    },
    containerAlter: {
        flex: 1,
        marginVertical: 16,
        flexDirection: 'row'
    },
    select: {
        alignSelf: 'center',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 25,
        borderWidth: 1,
        marginEnd: 16
    },
    selectText: {
        width: 300,
        textAlign: 'left',
        fontSize: 18,
        textAlignVertical: 'center',
        fontWeight: 'bold',
        color: '#404040'
    },
    divisor: {
        borderBottomColor: '#EEEEEE',
        borderBottomWidth: 1,
    }
})

export default ChoosesQuestionsSimulado;