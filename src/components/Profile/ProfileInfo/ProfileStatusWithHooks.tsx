import React, {ChangeEvent, useEffect, useState} from 'react'

type CurrentProps = {
    status: string
    updateStatus: (status: string) => void
}

const ProfileStatusWithHooks: React.FC<CurrentProps> = (props) => {

    const [editMode, setEditMode] = useState(false) // деструктурированное присваивание
    const [status, setStatus] = useState(props.status)

    useEffect(() => {
        setStatus(props.status)
    }, [props.status])

    const activateEditMode = () => {
        setEditMode(true)
    }

    const deactivateEditMode = () => {
        setEditMode(false)
        props.updateStatus(status)
    }

    const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        setStatus(e.target.value)
    }

    return (
        <div>
            {!editMode &&
            <div>
                <span onDoubleClick={activateEditMode}>{props.status || "Клик-клик"}</span>
            </div>
            }
            {editMode &&
            <div>
                <input autoFocus onChange={onStatusChange} onBlur={deactivateEditMode} value={status}/> {/* status из useState */}
            </div>
            }
        </div>
    )
}

export default ProfileStatusWithHooks