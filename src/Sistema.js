import firebase from './FirebaseConnection'
import firestore from '@react-native-firebase/firestore';
import Toast from 'react-native-simple-toast';

class FirebaseSistema {
    constructor() {

    }

    getVersionActualSystem(onSnapshot) {
        return firebase.database()
            .ref('versionActual')
            .on('value', onSnapshot)
    }

    createNewUser(uid, name, email, photo) {
        return firestore()
            .collection('users')
            .doc(uid)
            .set({
                uid: uid,
                name: name,
                email: email,
                photo: photo
            })
    }

    async addNewSimuladoToUser(uid, nivel, ano) {
        const snap = await firestore()
            .collection('users')
            .doc(uid)
            .collection('simulados')
            .where('ano', '==', ano)
            .where('nivel', '==', nivel)
            .get();

        if (snap.size === 0) {
            return firestore()
                .collection('users')
                .doc(uid)
                .collection('simulados')
                .doc('f1' + 'n' + nivel + ano)
                .set({
                    id: 'f1' + 'n' + nivel + ano,
                    nivel: nivel,
                    ano: ano,
                    fase: 1,
                    lQ: 0,
                    lastModified: firestore.FieldValue.serverTimestamp(),
                })
        } else {
            Toast.show('Você já adicionou esse simulado!', Toast.LONG);
        }
    }

    addListenerToUser(uid, onSnapshot) {
        return firestore()
            .collection('users')
            .doc(uid)
            .onSnapshot(onSnapshot);
    }

    setUserToPremium(uid, value) {
        return firestore()
            .collection('users')
            .doc(uid)
            .update('isPremium', value)
    }

    loadAllSimulados(uid, onSnap) {
        firestore()
            .collection('users')
            .doc(uid)
            .collection('simulados')
            .orderBy('lastModified', 'desc')
            .onSnapshot(onSnap)
    }

    getDataSimulado(uid, idProva, onSnap) {
        return firestore()
            .collection('users')
            .doc(uid)
            .collection('simulados')
            .doc(idProva)
            .onSnapshot(onSnap)
    }

    async markAndShowAnswer(uid, idProva, question, answer) {
        await firestore()
            .collection('users')
            .doc(uid)
            .collection('simulados')
            .doc(idProva)
            .update('selectedAnswers.' + question, answer)

        await firestore()
            .collection('users')
            .doc(uid)
            .collection('simulados')
            .doc(idProva)
            .update('lastModified', firestore.FieldValue.serverTimestamp())
    }
}

export default new FirebaseSistema();