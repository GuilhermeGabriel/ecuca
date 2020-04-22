import firebase from './FirebaseConnection'
import firestore from '@react-native-firebase/firestore';
import Toast from 'react-native-simple-toast';

class FirebaseSistema {
    constructor() {

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
                })
        } else {
            Toast.show('Você já adicionou esse simulado!', Toast.LONG);
        }
    }

    loadAllSimulados(uid, onSnap) {
        firestore()
            .collection('users')
            .doc(uid)
            .collection('simulados')
            .onSnapshot(onSnap)
    }

    getDataSimulado(uid, idProva, onSnap) {
        firestore()
            .collection('users')
            .doc(uid)
            .collection('simulados')
            .doc(idProva)
            .onSnapshot(onSnap)
    }

    markAndShowAnswer(uid, idProva, question, answer) {
        return firestore()
            .collection('users')
            .doc(uid)
            .collection('simulados')
            .doc(idProva)
            .update('selectedAnswers.' + question, answer)
    }
}

export default new FirebaseSistema();