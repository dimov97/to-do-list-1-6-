import React, {ChangeEvent} from 'react';
import {filterType, tasksType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";

type ToDoListType = {
    id:string
    title:string
    tasks:tasksType[]
    removeTask:(id:string,todolistId:string)=>void
    changeTodolistsTitle:(id:string, newTitle:string)=>void
    filterTask:(value:filterType,todolistId:string)=>void
    addTask:(newTitle:string,todolistId:string)=>void
    changeTaskStatus:(id:string, isDone:boolean,todolistId:string)=>void
    changeTaskTitle:(id:string, newTitle:string,todolistId:string)=>void
    filter:filterType
    removeTodolist:(id:string)=>void
}

export const ToDoList:React.FC<ToDoListType> = ({title,tasks,removeTask,filterTask,addTask,changeTaskStatus,filter,id,removeTodolist,changeTaskTitle,changeTodolistsTitle}) => {

    const onClickAllHandler = ()=>{filterTask('all', id)}
    const onClickActiveHandler = ()=>{filterTask('active', id)}
    const onClickCompletedHandler = ()=>{filterTask('completed', id)}
    const addTasks = (newTitle:string)=>{
        addTask(newTitle, id)

    }
    const changeTodolistTitle = (newTitle:string)=> {
        changeTodolistsTitle(id, newTitle)

    }
    return (
        <div>
            <h3><EditableSpan title={title} onChange={changeTodolistTitle}/>
                <button onClick={()=>{removeTodolist(id)}}>x</button>
            </h3>
            <AddItemForm addItem={addTasks}/>

            <ul>
                {tasks.map((t)=>{
                    const onChangeStatusHandler = (e:ChangeEvent<HTMLInputElement>)=>{
                        let newTaskStatusChange = e.currentTarget.checked
                        changeTaskStatus(t.id, newTaskStatusChange,id)
                    }
                    const onChangeTitleHandler = (newValue:string)=>{
                        changeTaskTitle(t.id, newValue,id)
                    }
                    return(
                        <li key={t.id} className={t.isDone?'is-done':''}>
                            <button onClick={()=>{removeTask(t.id,id)}}>x</button>
                            <input type="checkbox"
                                   checked={t.isDone}
                                   onChange={onChangeStatusHandler}
                            />
                            <EditableSpan title={t.title}
                                          onChange={onChangeTitleHandler}/>
                        </li>
                    )
                })}
            </ul>
            <div>
                <button className={filter ==='all'?'active-filter':''} onClick={onClickAllHandler}>All</button>
                <button className={filter ==='active'?'active-filter':''} onClick={onClickActiveHandler}>Active</button>
                <button className={filter ==='completed'?'active-filter':''} onClick={onClickCompletedHandler}>Completed</button>
            </div>
        </div>
    );
};

