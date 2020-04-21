import firebase from './FirebaseConnection'
import firestore from '@react-native-firebase/firestore';

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

    addNewSimuladoToUser(uid, nivel, ano) {
        firestore()
            .collection('users')
            .doc(uid)
            .collection('simulados')
            .doc('n' + nivel + 'f1' + ano)
            .set({
                nivel: nivel,
                ano: ano
            })
    }
}

export default new FirebaseSistema();