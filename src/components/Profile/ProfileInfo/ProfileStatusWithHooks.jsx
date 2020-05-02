import React, { useState } from 'react';


const ProfileStatusWithHooks = (props) => {

    const [editMode, setEditMode] = useState(false); // деструктурированное присваивание
    const [status, setStatus] = useState(props.status);

    const activateEditMode = () => {
        setEditMode(true);
    }
    
    const deactivateEditMode = () => {
        setEditMode(false);
        props.updateStatus(status);
    }

    const onStatusChange = (e) => {
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
                    <input autoFocus onChange={onStatusChange} onBlur={deactivateEditMode} value={status} /> {/* status из useState */}
                </div>
            }
        </div>
    )
}

export default ProfileStatusWithHooks;