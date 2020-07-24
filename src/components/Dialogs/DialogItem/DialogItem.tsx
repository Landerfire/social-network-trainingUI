import React from 'react'
import s from '../Dialogs.module.scss'
import { NavLink } from 'react-router-dom'


type CurrentProps = {
    id: number
    name: string
}

const DialogItem: React.FC<CurrentProps> = (props) => {
    let path = "/dialogs/" + props.id

    return (
        <div className={s.dialog}>
            <NavLink to={path} activeClassName={s.active}>{props.name}</NavLink>
        </div>
    )
}

export default DialogItem