import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

type AddItemFormType = {
    addItem:(newTitle:string)=>void
}

export const AddItemForm:React.FC<AddItemFormType> = ({addItem}) => {
    let [newTitle, setNewTitle] = useState('')
    let [error, setError] = useState<string|null>(null)
    const addTaskHandler = ()=>{
        if (newTitle.trim()!=='') {
            addItem(newTitle.trim())
            setNewTitle('')
        } else {
            setError('Title is required !')
        }
    }
    const onChange = (e:ChangeEvent<HTMLInputElement>)=>{
        setNewTitle(e.currentTarget.value)
        setError('')
    }
    const onKeyDown = (e:KeyboardEvent<HTMLInputElement>)=>{if (e.key==='Enter') {
        addTaskHandler()
    }}
    return (
        <div>
            <input value={newTitle}
                   onChange={onChange}
                   onKeyDown={onKeyDown}
                   className={error ? 'error': ''}
            />
            <button onClick={addTaskHandler}>+</button>
            {error && <div className='error-message'>{error}</div>}
        </div>
    );
};

