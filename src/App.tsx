import React, {useState} from 'react';
import './App.css';
import {ToDoList} from "./ToDoList";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";

export type tasksType = {
    id:string
    title:string
    isDone: boolean
}
export type filterType = 'all'|'active'|'completed'
type todolistType = {
    id:string
    title:string
    filter:filterType
}
type tasksStateType = {
    [key:string]:tasksType[]
}

function App() {

    function filterTask(value:filterType, todolistId:string) {
        let todolist = todolists.find(tl=>tl.id === todolistId)
        if (todolist) {
            todolist.filter = value
            setTodolists([...todolists])
        }
    }

    function removeTask(id:string,todolistId:string) {
        let todolistTasks = tasks[todolistId]
        tasks[todolistId] = todolistTasks.filter(t=> t.id !== id)
        setTasks({...tasks})
    }
    function addTask(newTitle:string,todolistId:string) {
        let task = {id:v1(), title:newTitle, isDone: false}
        let todolistTasks = tasks[todolistId]
        tasks[todolistId] = [task, ...todolistTasks]
        setTasks({...tasks})
    }
    function changeTaskStatus(id:string, isDone:boolean,todolistId:string) {
        let todolistTasks = tasks[todolistId]
        let changeStatus = todolistTasks.find(t=>t.id === id)
        if (changeStatus) {
            changeStatus.isDone=isDone
            setTasks({...tasks})
        }
    }
    function changeTaskTitle(id:string, newTitle:string,todolistId:string) {
        let todolistTasks = tasks[todolistId]
        let changeStatus = todolistTasks.find(t=>t.id === id)
        if (changeStatus) {
            changeStatus.title=newTitle
            setTasks({...tasks})
        }
    }
    function removeTodolist(id:string) {
        setTodolists(todolists.filter(tl=>tl.id!==id))
        delete tasks[id]
        setTasks({...tasks})
    }
    function changeTodolistsTitle(id:string, newValue:string) {
        const todolist = todolists.find(tl=>tl.id === id)
        if(todolist) {
            todolist.title = newValue
            setTodolists([...todolists])
        }
    }
    const todolistId1 = v1()
    const todolistId2 = v1()
    let [todolists, setTodolists] = useState<todolistType[]>([
        {id:todolistId1, title:'what to learn ?', filter:'all'},
        {id:todolistId2, title:'what to buy ?', filter:'all'},
    ])
    let [tasks, setTasks] = useState<tasksStateType>({
        [todolistId1]:[
            {id:v1(), title:'html', isDone: true},
            {id:v1(), title:'css', isDone: true},
            {id:v1(), title:'js', isDone: false}
        ],
        [todolistId2]:[
            {id:v1(), title:'milk', isDone: true},
            {id:v1(), title:'book', isDone: false}
        ]

    })
    function addTodoLists(newTitle:string) {
        let todolist:todolistType = {
            id:v1(),
            title:newTitle,
            filter:'all'
        }
        setTodolists([todolist,...todolists])
        setTasks({...tasks, [todolist.id]:[]})
    }

    return (
        <div className="App">
            <AddItemForm addItem={addTodoLists}/>
            {todolists.map((tl)=>{
                let filteredTasks = tasks[tl.id]
                if (tl.filter === 'active')
                    filteredTasks = filteredTasks.filter(t=> !t.isDone)
                if (tl.filter === 'completed')
                    filteredTasks = filteredTasks.filter(t=> t.isDone)
                return(
                    <ToDoList key={tl.id}
                        id={tl.id}
                        title={tl.title}
                              tasks={filteredTasks}
                              removeTask={removeTask}
                              filterTask={filterTask}
                              addTask={addTask}
                              changeTaskStatus={changeTaskStatus}
                              filter={tl.filter}
                              removeTodolist={removeTodolist}
                              changeTaskTitle={changeTaskTitle}
                              changeTodolistsTitle={changeTodolistsTitle}
                    />
                )
            })}
        </div>
    );
}

export default App;
