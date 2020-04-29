import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation'
import firebase from '../FirebaseConnection';
import analytics from '@react-native-firebase/analytics';

export default class Preload extends Component {
    static navigationOptions = {
        header: null
    }

    constructor(props) {
        super(props);
        this.state = {
        }

        this.initAnalytics()
    }

    async initAnalytics() {
        await analytics().setAnalyticsCollectionEnabled(true)
        await analytics().logAppOpen()
        await analytics().logEvent('openTheApp')
    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            if (user != null) {
                const stackAction = StackActions.reset({
                    index: 0,
                    actions: [
                        NavigationActions.navigate({ routeName: 'Home', params: { name: user.displayName.split(' ')[0] } })
                    ]
                })

                this.props.navigation.dispatch(stackAction);
            } else {
                const stackAction = StackActions.reset({
                    index: 0,
                    actions: [
                        NavigationActions.navigate({ routeName: 'Login' })
                    ]
                })

                this.props.navigation.dispatch(stackAction);
            }
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Ecuca</Text>
            </View >
        );
    }
}

const styles = StyleSheet.create({
    container: {
        margin: 20,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        fontSize: 56,
        fontWeight: 'bold',
        marginBottom: 16
    }
});