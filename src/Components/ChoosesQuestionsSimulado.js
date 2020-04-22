import React, { Component } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native'

class ItemAlternativa extends Component {
    constructor(props) {
        super(props)
    }

    getStyle() {
        if (this.props.showAnswer) {
            if (this.props.alter == this.props.actualAnswer) {
                return styles.selectCorrect
            } else {
                if (this.props.actualSelected == this.props.alter) {
                    return styles.selectError
                } else {
                    return styles.select
                }
            }
        } else {
            if (this.props.actualSelected == this.props.alter) {
                return styles.selected
            } else {
                return styles.select
            }
        }
    }

    render() {
        return (
            <TouchableOpacity onPress={this.props.onClick}>
                <View style={styles.containerAlter}>
                    <Text style={this.getStyle()}>{this.props.alter}
                    </Text>
                    <Text style={styles.selectText}>{this.props.enun}</Text>
                </View>
            </TouchableOpacity>
        )
    }
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
        if (this.props.ableToSelectNewQuestion) {
            return
        }

        let s = this.state;

        if (s.selected === item) {
            s.selected = ''
        } else {
            s.selected = item
        }

        this.setState(s);
        this.props.onClick(this.props.actualQuestion, this.state.selected)
    }

    render() {
        return (
            <View style={styles.container}>

                <View style={styles.divisor} />

                <ItemAlternativa
                    showAnswer={this.props.showAnswer}
                    actualAnswer={this.props.actualAnswer}
                    actualSelected={this.props.actualSelected}
                    alter='A'
                    enun={this.props.alternativas[0]}
                    onClick={() => this.selectAlter('A')}></ItemAlternativa>

                <View style={styles.divisor} />

                <ItemAlternativa
                    showAnswer={this.props.showAnswer}
                    actualAnswer={this.props.actualAnswer}
                    actualSelected={this.props.actualSelected}
                    alter='B'
                    enun={this.props.alternativas[1]}
                    onClick={() => this.selectAlter('B')}></ItemAlternativa>

                <View style={styles.divisor} />

                <ItemAlternativa
                    showAnswer={this.props.showAnswer}
                    actualAnswer={this.props.actualAnswer}
                    actualSelected={this.props.actualSelected}
                    alter='C'
                    enun={this.props.alternativas[2]}
                    onClick={() => this.selectAlter('C')}></ItemAlternativa>

                <View style={styles.divisor} />

                <ItemAlternativa
                    showAnswer={this.props.showAnswer}
                    actualAnswer={this.props.actualAnswer}
                    actualSelected={this.props.actualSelected}
                    alter='D'
                    enun={this.props.alternativas[3]}
                    onClick={() => this.selectAlter('D')}></ItemAlternativa>

                <View style={styles.divisor} />

                <ItemAlternativa
                    showAnswer={this.props.showAnswer}
                    actualAnswer={this.props.actualAnswer}
                    actualSelected={this.props.actualSelected}
                    alter='E'
                    enun={this.props.alternativas[4]}
                    onClick={() => this.selectAlter('E')}></ItemAlternativa>

                <View style={styles.divisor} />

                {this.props.isPremium &&
                    <View>
                        <Text style={styles.titleResolucao}>Resolução</Text>

                        <Text style={{ fontSize: 18 }}>{'\n'}1. (alternativa B) {"\n\n"}
                    A expressão contém apenas adições e subtrações, por isso podemos efetuar essas operações em qualquer ordem. A escolha
                    sobre qual a melhor ordem é apenas uma questão de conveniência. Por exemplo, podemos efetuar primeiro as subtrações,
escrevendo 2005 - 205 + 25 - 2 = (2005 - 205) + (25 - 2) = 1800 + 23 = 1823 .</Text>
                    </View>
                }
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
    selectCorrect: {
        color: 'white',
        backgroundColor: 'green',
        alignSelf: 'center',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 25,
        borderWidth: 1,
        borderColor: 'green',
        marginEnd: 16
    },
    selectError: {
        color: 'white',
        backgroundColor: 'red',
        alignSelf: 'center',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 25,
        borderWidth: 1,
        borderColor: 'red',
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
    highOpacity: {
        opacity: 1
    },
    lowOpacity: {
        opacity: 0.3
    },
    divisor: {
        borderBottomColor: '#EEEEEE',
        borderBottomWidth: 1,
    },
    titleResolucao: {
        fontWeight: 'bold',
        marginTop: 24,
        fontSize: 20
    }
})

export default ChoosesQuestionsSimulado;