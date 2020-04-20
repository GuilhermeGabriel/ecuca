import React, { Component } from 'react';
import { View, TouchableOpacity, Image, Text, StyleSheet, Dimensions, ScrollView } from 'react-native'

import ProgressBar from 'react-native-progress/Bar'
import ChoosesQuestionsSimulado from '../Components/ChoosesQuestionsSimulado'
import { n1f1 } from '../assets/Provas/2005/n1f1'

class Simulado extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: ' Nível ' + navigation.state.params.n +
                '• Fase ' + navigation.state.params.f +
                ' • ' + navigation.state.params.ano,
            headerLeft: null,
            headerTitleStyle: {
                fontWeight: 'bold'
            },
            headerRight: navigation.state.params && navigation.state.params.headerRight
        }
    }

    constructor(props) {
        super(props)

        const params = this.props.navigation.state.params
        const f = params.f
        const n = params.n
        const ano = params.ano
        const lastQuestion = params.lastQuestion
        this.prova = n1f1

        this.state = {
            actualQuestion: lastQuestion,
            answers: [],
            enunc: this.prova.questions[lastQuestion].enun,
            alter: this.prova.questions[lastQuestion].alter,
            imgQ: this.prova.questions[lastQuestion].img,
            time: 10
        }
        this.selectedAnswerForQuestion = this.selectedAnswerForQuestion.bind(this)
        this.changeQuestion = this.changeQuestion.bind(this)
    }

    changeQuestion(action) {
        if (action == 'next' && (this.state.actualQuestion + 1) < 20) {
            this.setState({
                actualQuestion: this.state.actualQuestion + 1,
                enunc: this.prova.questions[this.state.actualQuestion + 1].enun,
                alter: this.prova.questions[this.state.actualQuestion + 1].alter,
                imgQ: this.prova.questions[this.state.actualQuestion + 1].img,
            });
        }

        if (action == 'back' && (this.state.actualQuestion + 1) > 1) {
            this.setState({
                actualQuestion: this.state.actualQuestion - 1,
                enunc: this.prova.questions[this.state.actualQuestion - 1].enun,
                alter: this.prova.questions[this.state.actualQuestion - 1].alter,
                imgQ: this.prova.questions[this.state.actualQuestion - 1].img,
            });
        }
    }

    componentDidMount() {
        this.props.navigation.setParams({
            headerRight: (
                <View style={styles.containerHeader}>
                    <TouchableOpacity onPress={this.press}>
                        <Text style={styles.time}>{this.state.time}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { this.changeQuestion('back') }}>
                        <Text style={styles.btn}>{'❮❮'}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { this.changeQuestion('next') }}>
                        <Text style={styles.btn}>{'❯❯'}</Text>
                    </TouchableOpacity>
                </View >
            )
        })
    }

    selectedAnswerForQuestion(question, answer) {
        let s = this.state;
        s.answers[question] = answer;
        this.setState(s);
    }

    render() {
        return (
            <View style={styles.container}>
                <ProgressBar
                    borderRadius={0}
                    width={Dimensions.get('window').width}
                    progress={(this.state.actualQuestion + 1) / 20} />
                <ScrollView >
                    <Text style={styles.title}>Questão {this.state.actualQuestion + 1} de 20</Text>
                    <Image resizeMode='contain' style={styles.img} source={this.state.imgQ}></Image>
                    <Text style={styles.enunciado}>{this.state.enunc}</Text>
                    <ChoosesQuestionsSimulado
                        alternativas={this.state.alter}
                        actualQuestion={this.state.actualQuestion}
                        actualAnswer={this.state.answers[this.state.actualQuestion]}
                        onClick={this.selectedAnswerForQuestion} />
                </ScrollView>

                <TouchableOpacity>
                    <Text style={styles.resp}>RESPONDER</Text>
                </TouchableOpacity>
            </View >
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    title: {
        marginTop: 20,
        marginStart: 12,
        marginBottom: 12,
        alignSelf: 'flex-start',
        color: '#101010',
        fontSize: 17,
        fontWeight: 'bold',
        fontStyle: 'italic',
        color: 'black'
    },
    enunciado: {
        marginHorizontal: 12,
        fontSize: 16,
        textAlign: 'justify',
        fontWeight: 'bold',
        color: '#505050',
        marginBottom: 12
    },
    img: {
        alignSelf: 'center',
        borderRadius: 4,
        width: Dimensions.get('window').width - 20,
        marginBottom: 12
    },
    resp: {
        backgroundColor: 'black',
        padding: 14,
        textAlign: 'center',
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold'
    },
    containerHeader: {
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

export default Simulado;