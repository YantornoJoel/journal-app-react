import Swal from 'sweetalert2'

import React from 'react'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import validator from 'validator'

import { useForm } from './../../hooks/useForm';
import { RemoveError } from './../../actions/ui';
import { startRegisterWithEmailPasswordName } from '../../actions/auth';



export const RegisterScreen = () => {

    const dispatch = useDispatch();

    const { msgError } = useSelector(state => state.ui)


    const [formValues, handleInputChange] = useForm({
        name: 'Joel',
        email: 'joel@gmail.com',
        password: '123456',
        password2: '123456'
    })

    const { name, email, password, password2 } = formValues


    const handleRegister = (e) => {
        e.preventDefault();

        if (isFormValid()) {
            dispatch(startRegisterWithEmailPasswordName(email, password, name))
        }
    }


    const isFormValid = () => {
        if (name.trim().length === 0) {
            Swal.fire('Advertencia', "Nombre incorrecto.", 'warning')
            return false
        } else if (!validator.isEmail(email)) {
            Swal.fire('Advertencia', "Email incorrecto.", 'warning')
            return false
        } else if (password !== password2 || password2.length < 5) {
            Swal.fire('Advertencia', "Las contraseñas no coinciden, o tiene menos de 6 caracteres.", 'warning')
            return false
        }


        dispatch(RemoveError())
        return true
    }

    return (
        <>
            <h3 className="auth__title">Regístrarse</h3>

            <form
                onSubmit={handleRegister}
                className="animate__animated animate__bounce "
            >

                {
                    msgError &&
                    (
                        <div className="auth__alert-error">
                            {msgError}
                        </div>
                    )
                }

                <input
                    autoComplete="off"
                    className="auth__input"
                    name="name"
                    placeholder="Nombre"
                    type="text"
                    onChange={handleInputChange}
                    value={name}
                />


                <input
                    autoComplete="off"
                    className="auth__input"
                    name="email"
                    placeholder="Email"
                    type="text"
                    onChange={handleInputChange}
                    value={email}
                />


                <input
                    className="auth__input"
                    name="password"
                    placeholder="Contraseña"
                    type="password"
                    onChange={handleInputChange}
                    value={password}
                />


                <input
                    className="auth__input"
                    name="password2"
                    placeholder="Confirmar Contraseña"
                    type="password"
                    onChange={handleInputChange}
                    value={password2}
                />


                <button
                    className="btn btn-primary btn-block mt-1 mb-5"
                    type="submit"
                >
                    Regístrarse
                 </button>

                <p>
                    Ya estás registrado?
                < Link to="/auth/login" className="link" id="link-register">
                        Iniciar sesión
                </Link>
                </p>

            </form>


        </>
    )
}
