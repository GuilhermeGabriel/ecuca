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
            <View>
                <Text style={styles.title}>Bons estudos, Guilherme</Text>
                <FloatingAction
                    actions={actions}
                    onPressItem={name => {
                        console.log(`selected button: ${name}`);
                    }}
                />

                <ScrollView>
                    <ItemSimulado fase='1' nivel='2' ano='2005' qC='15' ></ItemSimulado>
                    <ItemSimulado fase='1' nivel='2' ano='2005' qC='15' ></ItemSimulado>
                    <ItemSimulado fase='1' nivel='2' ano='2005' qC='15' ></ItemSimulado>
                    <ItemSimulado fase='1' nivel='2' ano='2005' qC='15' ></ItemSimulado>
                    <ItemSimulado fase='1' nivel='2' ano='2005' qC='15' ></ItemSimulado>
                    <ItemSimulado fase='1' nivel='2' ano='2005' qC='15' ></ItemSimulado>
                    <ItemSimulado fase='1' nivel='2' ano='2005' qC='15' ></ItemSimulado>
                    <ItemSimulado fase='1' nivel='2' ano='2005' qC='15' ></ItemSimulado>
                    <ItemSimulado fase='1' nivel='2' ano='2005' qC='15' ></ItemSimulado>
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
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

const actions = [
    {
        text: "Accessibility",
        icon: require('../assets/logo_transparent.png'),
        name: "bt_accessibility",
        position: 2
    }
];

export default Home;