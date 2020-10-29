import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { startLogout } from '../../actions/auth';


import { JournalEntries } from './JournalEntries';
import { startNewNote } from './../../actions/notes';


export const Sidebar = () => {

    const dispatch = useDispatch()

    const { name } = useSelector(state => state.auth)

    const handleLogout = () => {
        dispatch(startLogout())
    }

    const handleAddNew = () => {
        dispatch(startNewNote())
    }


    return (
        <aside className="journal__sidebar">

            <div className="journal__sidebar-navbar">
                <h3 className="mt-5">
                    <i className="fas fa-laptop-code"></i>
                    <span> { name } </span>
                </h3>

                <button
                    className="btn"
                    onClick={handleLogout}
                >
                    Cerrar sesión
            </button>
            </div>


            <div className="journal__new-entry" onClick={handleAddNew}>
                <i className="far fa-calendar-plus fa-5x"></i>
                <p className="mt-5">Nueva nota</p>
            </div>


            <JournalEntries />

        </aside>
    )
}