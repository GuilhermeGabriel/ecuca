const initialState = {
    email: '',
    senha: ''
}

const AuthReducer = (state = initialState, action) => {
    if (state.length == 0) {
        return initialState
    }

    return state
}

export default AuthReducer;