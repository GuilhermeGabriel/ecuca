//import firebase from './FirebaseConnection'
import firestore from '@react-native-firebase/firestore';

class FirebaseSistema {
    createNewUser(id, name, email, photo) {
        const userDocument = firestore()
            .collection('Users')
            .doc('ABC')
            .set({ name: 'asdf' })
    }

    addNewSimuladoToUser() {
        alert('aaa')
    }
}

export default new FirebaseSistema();