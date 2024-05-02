import { useState, useEffect, useReducer } from "react";
import { db } from "../firebase/config";
import { collection, addDoc, Timestamp } from "firebase/firestore";

const initialState = {
    loading: null,
    error: null
}

const insertReducer = (state, action) => {

    switch (action.type) {
        case "LOADING":
            return { loading: true, error: null }
        case "INSERTED_DOC":
            return { loading: false, error: null }
        case "ERROR":
            return { loading: false, error: action.payload }
        default:
            return state
    }

}

export const useInsertDocument = (docCollection) => {
    const [response, dispatch] = useReducer(insertReducer, initialState)

    const [cancelled, seteCancelled] = useState(false)

    const checkDispatch = (action) => {
        if (!cancelled) {
            dispatch(action)
        }
    }

    const insertDocument = async (document) => {

        checkDispatch({
            type: "LOADING",
        })

        try {
            const newDocument = { ...document, createdAt: Timestamp.now() }

            const insertDoc = await addDoc(collection(db, docCollection),
                newDocument)

            checkDispatch({
                type: "INSERTED_DOC",
                payload: insertDoc
            })

        } catch (error) {

            checkDispatch({
                type: "ERROR",
                payload: error.message
            })
        }
    }

    useEffect(() => {
        return () => seteCancelled(true)
    }, [])

    return { insertDocument, response }
} 

