import React from 'react'
import s from '../Dialogs.module.scss'

type CurrentProps = {
    message: string
}

const Message: React.FC<CurrentProps> = (props) => {
    return <div className={s.message}>{props.message}</div>
}

export default Message