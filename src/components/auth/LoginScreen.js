import Swal from 'sweetalert2'

import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import validator from 'validator';

import { useForm } from './../../hooks/useForm';
import { RemoveError } from './../../actions/ui';
import { startGoogleLogin, startLoginEmailPassword } from './../../actions/auth';





export const LoginScreen = () => {

    const dispatch = useDispatch()

    const { loading } = useSelector(state => state.ui);

    const [formValues, handleInputChange] = useForm({
        email: 'joel@gmail.com',
        password: '123456'

    })

    const { email, password } = formValues

    const handleLogin = (e) => {
        e.preventDefault();

        if (isFormValid()) {
            dispatch(startLoginEmailPassword(email, password))

        }
    }

    const isFormValid = () => {
        if (!validator.isEmail(email)) {
            // dispatch(setError("Email incorrecto"))
            return false
        } else if (password.length <= 5) {
            // dispatch(setError("Introducir una contraseña valida"))
            Swal.fire('Error', "Contraseña inválida.", 'error')
            return false
        }


        dispatch(RemoveError())
        return true
    }


    const handleGoogleLogin = () => {
        dispatch(startGoogleLogin());
    }


    // const handleFacebookLogin = () => {
    //     dispatch(startFacebookLogin() );
    // }


    return (
        <>
            <h3 className="auth__title">Iniciar sesión</h3>

            <form
                onSubmit={handleLogin}
                className="animate__animated animate__fadeIn animate__faster"
            >
                <input
                    autoComplete="off"
                    className="auth__input"
                    name="email"
                    placeholder="Email"
                    type="text"
                    value={email}
                    onChange={handleInputChange}
                />

                <input
                    className="auth__input"
                    name="password"
                    placeholder="Contraseña"
                    type="password"
                    value={password}
                    onChange={handleInputChange}
                />

                <button
                    className="btn btn-primary btn-block mt-1"
                    type="submit"
                    disabled={loading}
                >
                    Entrar
                </button>



                <div className="auth__social-networks">
                    <p>Iniciar sesión con redes sociales</p>

                    <div
                        className="google-btn"
                        onClick={handleGoogleLogin}

                    >
                        <div className="google-icon-wrapper">
                            <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="google button" />
                        </div>
                        <p className="btn-text">
                            <b>Entrar con Google</b>
                        </p>
                    </div>





                    {/* <div
                        className="facebook-btn"
                        onClick={ handleFacebookLogin }

                    >
                        <div className="facebook-icon-wrapper">
                            <img className="facebook-icon"
                            //  src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" 
                             alt="google button" />
                        </div>
                        <p className="btn-text">
                            <b>Sign in with facebook</b>
                        </p>
                    </div> */}





                </div>


                <Link to="/auth/register" className="link">
                    Crear una cuenta
                </Link>

            </form>


        </>
    )
}
