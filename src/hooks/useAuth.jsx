import { db } from '../firebase/config'
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    signOut
} from 'firebase/auth'

import { useState, useEffect } from 'react'

export const useAuth = () => {
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(null)

    const [cancelled, setCancelled] = useState(false)

    const auth = getAuth()

    function checkCancelled() {
        if (cancelled) {
            return
        }
    }

    const createUser = async (data) => {
        checkCancelled()
        setLoading(true)
        setError(null)

        try {
            const { user } = await createUserWithEmailAndPassword(
                auth,
                data.email,
                data.password,
                data.idade,
            )
            await updateProfile(user, {
                displayName: data.displayName,
            })

            setLoading(false)

            return user

        } catch (error) {
            let messageError

            if (error.message.includes("Password")) {
                messageError = "Senhar precisar conter mais de 6 caracteres."
            }
            else if (error.message.includes("email-already")) {
                messageError = "E-mail já cadastrado"
            }
            else {
                messageError = "Ocorreu um erro, tente mais tarde"
            }

            setLoading(false)
            setError(messageError)
        }
    }

    const logout = () => {
        checkCancelled()
        signOut(auth)
    }

    const login = async (data) => {
        checkCancelled()

        setLoading(true)
        setError(false)

        try {
            await signInWithEmailAndPassword(auth, data.email, data.password)
            setLoading(false)
        } catch (error) {
            let messageError

            if (error.message.includes("auth/network-request-failed")) {
                messageError = "Usuário não encontrado."
            }
            else if (error.message.includes("auth/invalid-credential")) {
                messageError = "E-mail ou senha incorretos."
            }
            else if (error.message.includes("wrong-password")) {
                messageError = "Senha incorreta."
            }
            else {
                messageError = "Erro, tente mais tarde."
            }
            setError(messageError)
            setLoading(false)
        }
    }

    useEffect(() => {
        return () => setCancelled(true)
    }, [])

    return {
        auth,
        createUser,
        error,
        loading,
        logout,
        login
    }
}