import React, { Component } from 'react';
import { View, TouchableOpacity, Button, Text, StyleSheet, Dimensions } from 'react-native'
import ProgressBar from 'react-native-progress/Bar'

class ButtonsHeader extends Component {
    constructor(props) {
        super(props);

        this.styles = StyleSheet.create({
            container: {
                flexDirection: 'row'
            },
            btn: {
                padding: 4,
                borderRadius: 4,
                backgroundColor: 'black',
                color: 'white',
                fontSize: 14,
                marginHorizontal: 12,
            }
        })
    }

    render() {
        return (
            <View style={this.styles.container}>
                <TouchableOpacity >
                    <Text style={this.styles.btn}>aa</Text>
                </TouchableOpacity>
                <TouchableOpacity >
                    <Text style={this.styles.btn}>aa</Text>
                </TouchableOpacity>
                <TouchableOpacity >
                    <Text style={this.styles.btn}>aa</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

class Simulado extends Component {
    static navigationOptions = {
        title: 'Nível 1 • 2º Fase • 2008',
        headerLeft: null,
        headerTitleStyle: {
            fontWeight: 'bold'
        },
        headerRight: <ButtonsHeader></ButtonsHeader>,
    }

    render() {
        return (
            <View style={styles.container}>
                <ProgressBar
                    width={Dimensions.get('window').width}
                    progress={12 / 20} />
            </View >
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})

export default Simulado;