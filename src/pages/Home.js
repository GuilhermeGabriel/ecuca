import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet, ScrollView } from 'react-native'
import { FloatingAction } from "react-native-floating-action";
import ItemSimulado from '../Components/ItemSimulado'


class Home extends Component {
    static navigationOptions = {
        header: null
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Bons estudos, Guilherme</Text>

                <ScrollView>
                    <ItemSimulado
                        fase='1'
                        nivel='2'
                        ano='2005'
                        qC='15'
                        onPressItem={
                            () => {
                                this.props.navigation.navigate('Simulado', {
                                    f: 1,
                                    n: 1,
                                    ano: 2005,
                                    lastQuestion: 0
                                })
                            }}>
                    </ItemSimulado>
                    <ItemSimulado
                        fase='1'
                        nivel='2'
                        ano='2005'
                        qC='15'
                        onPressItem={
                            () => {
                                this.props.navigation.navigate('Simulado')
                            }}>
                    </ItemSimulado><ItemSimulado
                        fase='1'
                        nivel='2'
                        ano='2005'
                        qC='15'
                        onPressItem={
                            () => {
                                this.props.navigation.navigate('Simulado')
                            }}>
                    </ItemSimulado><ItemSimulado
                        fase='1'
                        nivel='2'
                        ano='2005'
                        qC='15'
                        onPressItem={
                            () => {
                                this.props.navigation.navigate('Simulado')
                            }}>
                    </ItemSimulado><ItemSimulado
                        fase='1'
                        nivel='2'
                        ano='2005'
                        qC='15'
                        onPressItem={
                            () => {
                                this.props.navigation.navigate('Simulado')
                            }}>
                    </ItemSimulado><ItemSimulado
                        fase='1'
                        nivel='2'
                        ano='2005'
                        qC='15'
                        onPressItem={
                            () => {
                                this.props.navigation.navigate('Simulado')
                            }}>
                    </ItemSimulado><ItemSimulado
                        fase='1'
                        nivel='2'
                        ano='2005'
                        qC='15'
                        onPressItem={
                            () => {
                                this.props.navigation.navigate('Simulado')
                            }}>
                    </ItemSimulado>
                </ScrollView>

                <FloatingAction
                    actions={[]}
                    onPressItem={name => {
                        console.log(`selected button: ${name}`);
                    }}
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
    actionButtonIcon: {
        fontSize: 20,
        height: 22,
        color: 'white',
    },
})

export default Home;