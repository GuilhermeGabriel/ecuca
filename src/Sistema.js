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
                .doc('n' + nivel + 'f1' + ano)
                .set({
                    nivel: nivel,
                    ano: ano,
                    fase: 1,
                    lQ: 0,
                    qC: 0
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

        /*
        .get()
        .then(querySnapshots => {
            let sim = []

            querySnapshots.forEach(document => {
                sim.push(document.data())
            });

            return sim
        })*/
    }
}

export default new FirebaseSistema();