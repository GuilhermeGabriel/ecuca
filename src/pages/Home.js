import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, Picker, TouchableOpacity, Dimensions, ActivityIndicator } from 'react-native'
import { FloatingAction } from "react-native-floating-action";
import ItemSimulado from '../Components/ItemSimulado'
import { Dialog } from 'react-native-simple-dialogs';
import Toast from 'react-native-simple-toast';
import firebase from '../FirebaseConnection'
import Sistema from '../Sistema'

class Home extends Component {
    static navigationOptions = {
        header: null
    }

    constructor(props) {
        super(props)
        this.state = {
            uid: '',
            name: this.props.navigation.state.params.name,
            dialogVisible: false,
            dialogInputAno: '',
            dialogInputNivel: '',
            loadSimuladosFirstTime: false,
            simulados: []
        }

        firebase.auth().onAuthStateChanged(user => {
            this.setState({ name: user.displayName.split(' ')[0], uid: user.uid })
            this.loadSimulados(user.uid);
        })

        console.disableYellowBox = true;
    }

    loadSimulados(uid) {
        Sistema.loadAllSimulados(uid, snapShot => {
            let sim = []
            snapShot.docChanges().forEach(change => {
                let qC = 0
                for (let i in change.doc.data().selectedAnswers) { qC++ }

                if (change.type == 'added') {
                    sim.push(change.doc.data())
                    sim[sim.length - 1].qC = qC
                }


                /* if (change.type == 'modified') {
                     for (ss of this.state.simulados) {
                         if (ss.id === change.doc.data().id) {
                             const sSim = this.state.simulados
                             const index = sSim.indexOf(ss)
                             sSim[index] = change.doc.data()
                             this.setState({ simulados: sSim })
                         }
                     }
                 }*/

            })
            this.setState({
                simulados: [...sim, ...this.state.simulados,],
                loadSimuladosFirstTime: true
            })
        });
    }

    async addNewSimulado() {
        const uid = this.state.uid
        const ano = this.state.dialogInputAno
        const nivel = this.state.dialogInputNivel

        if (uid != '' && nivel != '' && ano != '') {
            await Sistema.addNewSimuladoToUser(uid, nivel, ano);
            this.setState({ dialogVisible: false })
            this.floatingAction.animateButton();
        } else {
            Toast.show('Os valores não devem ser vazios!', Toast.LONG);
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Bons estudos,{"\n"}{this.state.name}</Text>

                {(this.state.simulados.length === 0 && this.state.loadSimuladosFirstTime) &&
                    <View>
                        <Text style={styles.alertSimu}>Você ainda não adicionou nenhum simulado!</Text>
                    </View>
                }

                {(this.state.simulados.length === 0) &&
                    <ActivityIndicator style={styles.alertSimu} size="large" color="#0000ff" />
                }

                <Dialog
                    animationType='fade'
                    visible={this.state.dialogVisible}
                    titleStyle={{ fontWeight: 'bold', fontSize: 20 }}
                    title='Adicionar um novo simulado'
                    onTouchOutside={() => {
                        this.setState({ dialogVisible: false });
                        this.floatingAction.animateButton();
                    }} >
                    <View>
                        <Text style={{ fontWeight: 'bold', color: '#505050', marginBottom: 8, marginTop: 4 }}>Ano da prova</Text>
                        <View style={{ backgroundColor: '#cfcfcf', borderRadius: 4, marginLeft: -2 }}>
                            <Picker
                                style={{ fontWeight: 'bold' }}
                                selectedValue={this.state.dialogInputAno}
                                onValueChange={(itemValue, itemIndex) => { this.setState({ dialogInputAno: itemValue }) }}>
                                <Picker.Item label="Selecione o ano" value="" />
                                <Picker.Item label="2019" value="2019" />
                                <Picker.Item label="2018" value="2018" />
                                <Picker.Item label="2017" value="2017" />
                                <Picker.Item label="2016" value="2016" />
                                <Picker.Item label="2015" value="2015" />
                                <Picker.Item label="2015" value="2015" />
                                <Picker.Item label="2014" value="2014" />
                                <Picker.Item label="2013" value="2013" />
                                <Picker.Item label="2012" value="2012" />
                                <Picker.Item label="2011" value="2011" />
                                <Picker.Item label="2010" value="2010" />
                                <Picker.Item label="2009" value="2009" />
                                <Picker.Item label="2008" value="2008" />
                                <Picker.Item label="2007" value="2007" />
                                <Picker.Item label="2006" value="2006" />
                                <Picker.Item label="2005" value="2005" />
                            </Picker>
                        </View>
                        <Text style={{ color: '#808080', marginTop: 4, fontSize: 12 }}>
                            Selecione o ano da prova que você deseja fazer
                        </Text>

                        <Text style={{ fontWeight: 'bold', color: '#505050', marginTop: 28, marginBottom: 8 }}>Nível da prova</Text>
                        <View style={{ backgroundColor: '#cfcfcf', borderRadius: 4, marginLeft: -2 }}>
                            <Picker
                                style={{ fontWeight: 'bold' }}
                                selectedValue={this.state.dialogInputNivel}
                                onValueChange={(itemValue, itemIndex) => { this.setState({ dialogInputNivel: itemValue }) }}   >
                                <Picker.Item label="Selecione o nível" value="" />
                                <Picker.Item label="Nível 1" value="1" />
                                <Picker.Item label="Nível 2" value="2" />
                                <Picker.Item label="Nível 3" value="3" />
                            </Picker>
                        </View>
                        <Text style={{ color: '#808080', marginTop: 4, fontSize: 12 }}>
                            Selecione o nível da prova que você deseja fazer
                        </Text>

                        <View style={{ flexDirection: 'row', marginTop: 38, justifyContent: 'flex-end' }}>
                            <TouchableOpacity onPress={() => {
                                this.setState({ dialogVisible: false })
                                this.floatingAction.animateButton();
                            }}>
                                <Text style={{ padding: 8, marginRight: 8 }}>Cancelar</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => this.addNewSimulado()}>
                                <Text style={{ borderRadius: 4, padding: 8, backgroundColor: 'blue', color: 'white' }}>Adicionar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Dialog>

                <FlatList
                    keyExtractor={(item, index) => { { 'n' } { item.nivel } { 'f' } { item.fase } item.ano }}
                    data={this.state.simulados}
                    renderItem={({ item, index }) => (
                        <ItemSimulado
                            fase={item.fase}
                            nivel={item.nivel}
                            ano={item.ano}
                            qC={item.qC}
                            onPressItem={
                                () => {
                                    this.props.navigation.navigate('Simulado', {
                                        uid: this.state.uid,
                                        id: item.id,
                                        f: item.fase,
                                        n: item.nivel,
                                        ano: item.ano,
                                        lQ: item.lQ
                                    })
                                }}>
                        </ItemSimulado>
                    )}>
                </FlatList>

                <FloatingAction
                    ref={(ref) => { this.floatingAction = ref; }}
                    onOpen={() => this.setState({ dialogVisible: true })}
                    overlayColor={'0'}
                    actions={[]}
                    onPressItem={() => this.setState({ dialogVisible: true })}
                />
            </View >
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    title: {
        width: 256,
        fontSize: 26,
        fontWeight: 'bold',
        margin: 20
    },
    alertSimu: {
        textAlignVertical: 'center',
        height: Dimensions.get('window').height - 150,
        fontWeight: 'bold',
        marginHorizontal: 64,
        textAlign: 'center',
        fontSize: 28
    },
    actionButtonIcon: {
        fontSize: 20,
        height: 22,
        color: 'white',
    },
    dialog: {
        backgroundColor: 'transparent'
    }
})

export default Home;