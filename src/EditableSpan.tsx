import React, {ChangeEvent, useState} from 'react';

type EditableSpanType = {
    title:string
    onChange:(newValue:string)=>void
}

export const EditableSpan:React.FC<EditableSpanType> = ({title,onChange}) => {
    let [editMode, setEditMode] = useState(false)
    let [newTitle, setNewTitle] = useState('')
    const activateEditMode = ()=> {
        setEditMode(true)
        setNewTitle(title)
    }
    const activateViewMode = ()=> {
        setEditMode(false)
        onChange(newTitle)
    }
    const onChangeNewTitleHandler = (e:ChangeEvent<HTMLInputElement>)=> {
        setNewTitle(e.currentTarget.value)
    }
    return editMode
        ? <input value={newTitle} onChange={onChangeNewTitleHandler} onBlur={activateViewMode} autoFocus/>
        : <span onDoubleClick={activateEditMode}>{title}</span>
};

