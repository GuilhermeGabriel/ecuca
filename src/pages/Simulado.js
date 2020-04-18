import React, { Component } from 'react';
import { View, TouchableOpacity, Image, Text, StyleSheet, Dimensions, ScrollView } from 'react-native'
import ProgressBar from 'react-native-progress/Bar'
import ButtonsHeaderSimulado from '../Components/ButtonsHeaderSimulado'
import ChoosesQuestionsSimulado from '../Components/ChoosesQuestionsSimulado'

class Simulado extends Component {
    static navigationOptions = {
        title: 'Nível 1 • 2º Fase • 2008',
        headerLeft: null,
        headerTitleStyle: {
            fontWeight: 'bold'
        },
        headerRight: <ButtonsHeaderSimulado></ButtonsHeaderSimulado>
    }

    constructor(props) {
        super(props)
        this.frase = 'Ouca estrutura inerente,dOuca estrutura inerente,do com as necessidades dos utilizaestrutura Oucao com as necessidades dos utilizaestrutura Ouca estrutura inerente,do com as necessidades dos utilizaestruturaOuca estrutura inerente,do com as necessidades dos utilizaestruturaOuca estrutura inerente,do com as necessidades dos utilizaestruturaOuca estrutura inerente,do com as necessidades dos utilizaestruturaOuca estrutura inerente,do com as necessidades dos utilizaestruturaOuca estrutura inerente,do com as necessidades dos utilizaestrutura'
    }

    render() {
        return (
            <View style={styles.container}>
                <ProgressBar
                    borderRadius={0}
                    width={Dimensions.get('window').width}
                    progress={12 / 20} />
                <ScrollView >
                    <Text style={styles.title}>Questão 5 de 20</Text>
                    <Text style={styles.enunciado}>{this.frase}</Text>
                    <Image style={styles.img} source={require('../assets/img.jpg')}></Image>
                    <ChoosesQuestionsSimulado />
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
        width: Dimensions.get('window').width - 24,
        marginBottom: 20
    },
    resp: {
        backgroundColor: 'black',
        padding: 14,
        textAlign: 'center',
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold'
    }
})

export default Simulado;