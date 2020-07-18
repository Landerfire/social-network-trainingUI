import React from 'react'
import s from './Header.module.scss'
import { NavLink } from 'react-router-dom'

type PropsType = {
    isAuth: boolean
    login: string | null
    logout: () => void
}

const Header = (props: PropsType) => {
    return (
        <header className={s.header}>
            <img src="https://s1.logaster.com/static/v3/img/products/logo.png" alt="logo" />

            <div className={s.loginBlock}>
                {props.isAuth
                    ? <div>{props.login} - <button onClick={props.logout}>Logout</button></div>
                    : <NavLink to={`/login`}><span>Login</span></NavLink>
                }
            </div>
        </header>
    )
}

export default Header