import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import firebase from '../FirebaseConnection';
import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
} from '@react-native-community/google-signin';

import Sistema from '../Sistema'
import { StackActions, NavigationActions } from 'react-navigation'

import { connect } from 'react-redux';
import { editEmail, editPassword } from '../actions/AuthActions';


export class Login extends Component {
    static navigationOptions = {
        header: null
    }

    constructor(props) {
        super(props);
        this.state = {
            loggedIn: false,
            userInfo: null,
            isSigninInProgress: false
        }
    }

    getCurrentUserInfo = async () => {
        try {
            const userInfo = await GoogleSignin.signInSilently();
            this.setState({ userInfo: userInfo, loggedIn: true });
        } catch (error) {
            if (error.code === statusCodes.SIGN_IN_REQUIRED) {
                // user has not signed in yet
                this.setState({ loggedIn: false });
            } else {
                // some other error
                this.setState({ loggedIn: false });
            }
        }
    };

    signIn = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            this.setState({ userInfo: userInfo, loggedIn: true });
            const credential = firebase.auth.GoogleAuthProvider.credential(userInfo.idToken);
            await firebase.auth().signInWithCredential(credential)

            //Sistema.createNewUser(userInfo.user.id, userInfo.user.givenName + userInfo.user.email + userInfo.user.photo)

            const stackAction = StackActions.reset({
                index: 0,
                actions: [
                    NavigationActions.navigate({ routeName: 'Home' })
                ]
            })
            this.props.navigation.dispatch(stackAction);

        } catch (error) {
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                // user cancelled the login flow
            } else if (error.code === statusCodes.IN_PROGRESS) {
                // operation (f.e. sign in) is in progress already
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                // play services not available or outdated
            } else {
                // some other error happened
            }
        }
    }

    signOut = async () => {
        try {
            await GoogleSignin.revokeAccess();
            await GoogleSignin.signOut();
            await firebase.auth().signOut();
            this.setState({ userInfo: null, loggedIn: false }); // Remember to remove the user from your app's state as well
        } catch (error) {
            console.error(error);
        }
    };

    componentDidMount() {
        GoogleSignin.configure({
            //scopes: ['https://www.googleapis.com/auth/userinfo.profile'],
            webClientId: '92718398150-mnle4efvao8iim164mf0e0bveg49ql0o.apps.googleusercontent.com',
            offlineAccess: true,
            //hostedDomain: '',
            //loginHint: '',
            //forceConsentPrompt: true,
            //accountName: '',
            //iosClientId: 'XXXXXX-krv1hjXXXXXXp51pisuc1104q5XXXXXXe.apps.googleusercontent.com'
        });

        this.getCurrentUserInfo();
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Bem-Vindo ao Ecuca</Text>
                {/*this.state.loggedIn == true ? <Text>Logado</Text> : <Text>Deslogado</Text>*/}

                <TouchableOpacity style={styles.loginBtn} onPress={this.signIn}>
                    <Text style={styles.loginTxt}>Vamos lá</Text>
                </TouchableOpacity>
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
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 16
    },
    loginBtn: {
        width: 180,
        height: 60,
        borderRadius: 30,
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center'
    },
    loginTxt: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold'
    }
});

const mapStateToProps = (state) => {
    return {
        email: state.auth.email,
        senha: state.auth.senha
    };
}

const LoginConnect = connect(mapStateToProps, { editEmail, editPassword })(Login);
export default LoginConnect;