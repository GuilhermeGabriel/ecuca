import firebase from '../FirebaseConnection'

export const editEmail = (email) => {
    return {
        type: 'editEmail',
        payload: {
            email: email
        }
    };
};

export const editPassword = (password) => {
    return {
        type: 'editPassword',
        payload: {
            password: password
        }
    }
}