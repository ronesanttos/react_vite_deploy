import Styles from "./Perfil.module.css"

import { useAuthValue } from '../../context/AuthContext'

const Perfil = () => {
    const { user } = useAuthValue()
    return (
        <div className={Styles.perfil}>
            <h1>Perfil</h1>
            <p>Bem vindo <span>{user.displayName}</span></p>

            <div>
                <ul>
                    <li>Nome: {user.displayName}</li>
                    <li>E-mail: {user.email}</li>
                </ul>
            </div>
        </div>
    )
}

export default Perfil
