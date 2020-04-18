import React, { Component } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native'

const ItemAlternativa = (props) => {
    return (
        <TouchableOpacity onPress={props.onClick}>
            <View style={styles.containerAlter}>
                <Text style={(props.selected == props.alter) ? styles.selected : styles.select}>{props.alter}</Text>
                <Text style={styles.selectText}>{props.enun}</Text>
            </View>
        </TouchableOpacity>
    )
}

class ChoosesQuestionsSimulado extends Component {

    constructor(props) {
        super(props)
        this.state = {
            selected: ''
        }

        this.selectAlter = this.selectAlter.bind(this)
    }

    selectAlter(item) {
        let s = this.state;
        s.selected = item
        this.setState(s);
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.divisor} />

                <ItemAlternativa selected={this.state.selected} alter='A' enun='Essa é top' onClick={() => this.selectAlter('A')}></ItemAlternativa>

                <View style={styles.divisor} />

                <ItemAlternativa selected={this.state.selected} alter='B' enun='Essa é top' onClick={() => this.selectAlter('B')}></ItemAlternativa>

                <View style={styles.divisor} />

                <ItemAlternativa selected={this.state.selected} alter='C' enun='Essa é top' onClick={() => this.selectAlter('C')}></ItemAlternativa>

                <View style={styles.divisor} />

                <ItemAlternativa selected={this.state.selected} alter='D' enun='Essa é top' onClick={() => this.selectAlter('D')}></ItemAlternativa>

                <View style={styles.divisor} />

                <ItemAlternativa selected={this.state.selected} alter='E' enun='Essa é top' onClick={() => this.selectAlter('E')}></ItemAlternativa>

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
    selected: {
        color: 'white',
        backgroundColor: 'black',
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