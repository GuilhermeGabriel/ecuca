import React, { Component } from 'react';
import { View, TouchableOpacity, Text, Image, StyleSheet, Dimensions, ScrollView } from 'react-native'
import ProgressBar from 'react-native-progress/Bar'
import ChoosesQuestionsSimulado from '../Components/ChoosesQuestionsSimulado'
import Icon from 'react-native-vector-icons/AntDesign';
import { Provas_Files, Provas_Images } from '../assets/Provas/Provas_Files'
import Sistema from '../Sistema';

class Simulado extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: ' F ' + navigation.state.params.f +
                ' • N ' + navigation.state.params.n +
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

        this.fase = this.props.navigation.state.params.f
        this.nivel = this.props.navigation.state.params.n
        this.ano = this.props.navigation.state.params.ano

        const lastQuestion = this.props.navigation.state.params.lQ
        const cA = []

        this.provaFile = Provas_Files[`n${this.nivel}f${this.fase}${this.ano}`]
        this.prova = this.provaFile
        this.prova.questions.forEach(element => {
            cA.push(element.answer)
        });

        this.state = {
            actualQuestion: lastQuestion,
            selecteds: [],
            selectedsFromDb: [],
            correctAnswers: cA,
            enunc: this.prova.questions[lastQuestion].enun,
            res: this.prova.questions[lastQuestion].res,
            alter: this.prova.questions[lastQuestion].alter,
            imgQ: Provas_Images['p' + this.ano].Images['q' + lastQuestion],
            imgR: Provas_Images['p' + this.ano].Images['r' + lastQuestion]
        }
        this.selectedAnswerForQuestion = this.selectedAnswerForQuestion.bind(this)
        this.changeQuestion = this.changeQuestion.bind(this)
        this.markAndShowAnswer = this.markAndShowAnswer.bind(this)

        this.dataSimuladoListnerUn = Sistema.getDataSimulado(this.props.navigation.state.params.uid, this.props.navigation.state.params.id, snapShot => {
            let markedInDb = []
            for (let i = 0; i < 20; i++) {
                if (snapShot.data().selectedAnswers != null) {
                    markedInDb.push(snapShot.data().selectedAnswers[i]);
                }
            }
            this.setState({ selectedsFromDb: markedInDb })
        })

        this.addListenerToUserUn = Sistema.addListenerToUser(this.props.navigation.state.params.uid, onSnapshot => {
            if (onSnapshot.data().isPremium == true) {
                this.setState({ isPremium: true })
            } else {
                this.setState({ isPremium: false })
            }
        });
    }

    changeQuestion(action) {
        if (action == 'next' && (this.state.actualQuestion + 1) < 20) {
            this.setState({
                actualQuestion: this.state.actualQuestion + 1,
                enunc: this.prova.questions[this.state.actualQuestion + 1].enun,
                alter: this.prova.questions[this.state.actualQuestion + 1].alter,
                res: this.prova.questions[this.state.actualQuestion + 1].res,
                imgQ: Provas_Images['p' + this.ano].Images['q' + (this.state.actualQuestion + 1)],
                imgR: Provas_Images['p' + this.ano].Images['r' + (this.state.actualQuestion + 1)],
            });
        }

        if (action == 'back' && (this.state.actualQuestion + 1) > 1) {
            this.setState({
                actualQuestion: this.state.actualQuestion - 1,
                enunc: this.prova.questions[this.state.actualQuestion - 1].enun,
                alter: this.prova.questions[this.state.actualQuestion - 1].alter,
                res: this.prova.questions[this.state.actualQuestion - 1].res,
                imgQ: Provas_Images['p' + this.ano].Images['q' + (this.state.actualQuestion - 1)],
                imgR: Provas_Images['p' + this.ano].Images['r' + (this.state.actualQuestion - 1)],
            });
        }
    }

    componentWillUnmount() {
        this.dataSimuladoListnerUn()
        this.addListenerToUserUn()
    }

    componentDidMount() {
        this.props.navigation.setParams({
            headerRight: (
                <View style={styles.containerHeader}>
                    <TouchableOpacity onPress={this.press}>
                        <Text style={styles.time}>{this.state.time}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { this.changeQuestion('back') }}>
                        <Icon style={styles.btn} name="leftcircle" size={18} color="#000" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { this.changeQuestion('next') }}>
                        <Icon style={styles.btn} name="rightcircle" size={18} color="#000" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { this.finish() }}>
                        <Icon style={styles.btn} name="checkcircle" size={18} color="#000" />
                    </TouchableOpacity>
                    <Text>{this.props.navigation.state.params.timee}</Text>
                </View >
            )
        })
    }

    async markAndShowAnswer() {
        const uid = this.props.navigation.state.params.uid
        const actualProva = this.props.navigation.state.params.id
        const question = this.state.actualQuestion
        const actualSelected = this.state.selecteds[this.state.actualQuestion]
        await Sistema.markAndShowAnswer(uid, actualProva, question, actualSelected)
    }

    finish() {
        this.props.navigation.goBack()
    }

    selectedAnswerForQuestion(question, answer) {
        let s = this.state;
        s.selecteds[question] = answer;
        this.setState(s);
    }

    render() {
        return (
            <View style={styles.container}>
                <ProgressBar
                    height={8}
                    borderWidth={0}
                    borderRadius={0}
                    width={Dimensions.get('window').width}
                    progress={(this.state.actualQuestion + 1) / 20} />
                <ScrollView >
                    <Text style={styles.title}>Questão {this.state.actualQuestion + 1} de 20</Text>
                    <Image resizeMode='contain' style={styles.img} source={this.state.imgQ}></Image>
                    <Text style={styles.enunciado}>{this.state.enunc}</Text>
                    <ChoosesQuestionsSimulado
                        isPremium={this.state.isPremium}
                        showAnswer={this.state.selectedsFromDb[this.state.actualQuestion] != undefined}
                        res={this.state.res}
                        imgR={this.state.imgR}
                        ableToSelectNewQuestion={this.state.selectedsFromDb[this.state.actualQuestion] != undefined}
                        alternativas={this.state.alter}
                        actualQuestion={this.state.actualQuestion}
                        actualSelected={(this.state.selectedsFromDb[this.state.actualQuestion] != undefined) ?
                            this.state.selectedsFromDb[this.state.actualQuestion] :
                            this.state.selecteds[this.state.actualQuestion]
                        }
                        actualAnswer={this.state.correctAnswers[this.state.actualQuestion]}
                        onClick={this.selectedAnswerForQuestion} />
                </ScrollView>

                {
                    (this.state.selecteds[this.state.actualQuestion] != undefined &&
                        this.state.selecteds[this.state.actualQuestion] != '') &&
                    <TouchableOpacity onPress={this.markAndShowAnswer}>
                        <Text style={styles.resp}>VER RESPOSTA</Text>
                    </TouchableOpacity>
                }
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
        width: Dimensions.get('window').width - 20,
        alignSelf: 'center',
        borderRadius: 4,
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
        paddingVertical: 12,
        paddingHorizontal: 12,
        borderRadius: 4,
        color: 'black',
        fontSize: 22,
        marginHorizontal: 2,
    },
    time: {
        fontWeight: 'bold',
        paddingVertical: 12,
        paddingHorizontal: 4,
        borderRadius: 4,
        color: 'black',
        fontSize: 16,
        marginHorizontal: 2,
    }
})

export default Simulado;