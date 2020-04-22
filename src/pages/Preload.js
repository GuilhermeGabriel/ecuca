import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation'
import { GoogleSignin } from '@react-native-community/google-signin';

export default class Preload extends Component {
    static navigationOptions = {
        header: null
    }

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    getCurrentUserInfo = async () => {
        try {
            const userInfo = await GoogleSignin.signInSilently();
            const stackAction = StackActions.reset({
                index: 0,
                actions: [
                    NavigationActions.navigate({ routeName: 'Home', params: { name: userInfo.user.givenName } })
                ]
            })
            this.props.navigation.dispatch(stackAction);
        } catch (error) {
            const stackAction = StackActions.reset({
                index: 0,
                actions: [
                    NavigationActions.navigate({ routeName: 'Login' })
                ]
            })
            this.props.navigation.dispatch(stackAction);
        }
    };

    componentDidMount() {
        GoogleSignin.configure({
            webClientId: '92718398150-mnle4efvao8iim164mf0e0bveg49ql0o.apps.googleusercontent.com',
            offlineAccess: true,
        });

        this.getCurrentUserInfo();
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