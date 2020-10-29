import React, { useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux';


import { NotesAppBar } from './NotesAppBar';
import { useForm } from './../../hooks/useForm';
import { activeNote, startDeleting } from '../../actions/notes';


export const NoteScreen = () => {

    const dispatch = useDispatch()

    const { active: note } = useSelector(state => state.notes)
    const [formValues, handleInputChange, reset] = useForm(note)
    const { body, title, id } = formValues

    const activeId = useRef(note.id)

    useEffect(() => {

        if (note.id !== activeId.current) {
            reset(note)
            activeId.current = note.id
        }


    }, [note, reset])


    useEffect(() => {

        dispatch(activeNote(formValues.id, { ...formValues }))

    }, [formValues, dispatch])



    const handleDelete = () => {
        dispatch(startDeleting(id ))
    }


    return (
        <div className="notes__main-content animate__animated animate__fadeInUp">

            <NotesAppBar />

            <div className="notes__content">

                <input
                    autoComplete="off"
                    className="notes__title-input mb-5"
                    placeholder="Titulo"
                    name="title"
                    type="text"
                    value={title}
                    onChange={handleInputChange}
                />

                <textarea
                    className="notes__textarea"
                    placeholder="Descripción"
                    name="body"
                    value={body}
                    onChange={handleInputChange}
                ></textarea>


                {
                    (note.url) &&
                    <div className="notes__image">
                        <img
                            alt="imagen"
                            src={note.url}
                        />
                    </div>
                }

            </div>


            <button
                className="btn btn-danger"
                onClick={handleDelete}
            >
                Borrar
            </button>

        </div>
    )
}
