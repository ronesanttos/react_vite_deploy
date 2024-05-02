import { useAuthValue } from '../context/AuthContext'
import { useAuth } from '../hooks/useAuth'
import Styles from './NavBar.module.css'
import { NavLink } from 'react-router-dom'

const NavBar = () => {
    const { user } = useAuthValue()
    const { logout } = useAuth()
    return (
        <nav className={Styles.navbar}>
            <NavLink to="/" className={Styles.brand}> Mini <span>Blog</span></NavLink>
            <ul className={Styles.links_list}>
                <li>
                    <NavLink to="/" className={({ isActive }) => (isActive ? Styles.active : '')}>Inicio</NavLink>
                </li>
                {!user && (
                    <>
                        <li>
                            <NavLink to="/login" className={({ isActive }) => (isActive ? Styles.active : '')}>Entrar</NavLink>
                        </li>
                        <li>
                            <NavLink to="/register" className={({ isActive }) => (isActive ? Styles.active : '')}>Cadastrar</NavLink>
                        </li>

                    </>
                )}

                {user && (
                    <>
                        <li>
                            <NavLink to="/posts/create" className={({ isActive }) => (isActive ? Styles.active : '')}>Postar</NavLink>
                        </li>
                        <li>
                            <NavLink to="/dashboard" className={({ isActive }) => (isActive ? Styles.active : '')}>Dashboard</NavLink>
                        </li>
                        <li>
                            <NavLink to="/perfil" className={({ isActive }) => (isActive ? Styles.active : '')}>Perfil</NavLink>
                        </li>
                    </>
                )}

                <li>
                    <NavLink to="/about" className={({ isActive }) => (isActive ? Styles.active : '')}>Sobre</NavLink>
                </li>
                {user && (
                    <button onClick={logout}>Sair</button>
                )}
            </ul>
        </nav>
    )
}

export default NavBar
