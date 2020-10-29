import Swal from 'sweetalert2'

import { types } from './../types/types';
import { firebase, googleAuthProvider } from '../firebase/firebase-config';
import { finishLoading, startLoading } from './ui';
import { noteLogout } from './notes';


export const startLoginEmailPassword = (email, password) => {
    return (dispatch) => {

        dispatch(startLoading())

        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(({ user }) => {
                dispatch(login(user.uid, user.displayName));

                dispatch(finishLoading());
            })
            .catch(e => {
                dispatch(finishLoading())
                Swal.fire('Error', "Email y/o contraseña incorrectos, aseguresé de poner un email previamente regístrado.", 'error')
            })

    }
}


export const startRegisterWithEmailPasswordName = (email, password, name) => {

    return (dispatch) => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(async ({ user }) => {

                await user.updateProfile({
                    displayName: name
                })

                dispatch(
                    login(user.uid, user.displayName)
                )
            })
             .catch(e => {
                Swal.fire('Error', "El email ingresado ya esta en uso.", 'error')
            })
    }
}



export const startGoogleLogin = () => {
    return (dispatch) => {

        firebase.auth().signInWithPopup(googleAuthProvider)
            .then(({ user }) => {
                dispatch(
                    login(user.uid, user.displayName)
                )
            })
    }
}

// export const startFacebookLogin = () => {
//     return (dispatch) => {

//         firebase.auth().signInWithPopup(facebookAuthProvider)
//             .then(({ user }) => {
//                 dispatch(
//                     login(user.uid, user.displayName)
//                 )
//             })
//     }
// }




export const login = (uid, displayName) =>
    ({
        type: types.login,
        payload: {
            uid,
            displayName
        }

    })



export const startLogout = () => {
    return async (dispatch) => {
        await firebase.auth().signOut()

        dispatch(logout())
        dispatch(noteLogout())
    }
}


export const logout = () => ({
    type: types.logout
})