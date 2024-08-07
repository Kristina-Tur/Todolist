import {addTodolistAC, todolistsReducer} from "./TodolistsList/todolist-reducer/todolists-reducer";
import {tasksReducer, TasksType} from "./TodolistsList/tasks-reducer/tasks-reducer";
import {TodolistDomainType} from "../api/API";

test('ids should be equals', () => {
    const startTasksState: TasksType = {}
    const startTodolistsState: Array<TodolistDomainType> = []

    const action = addTodolistAC(
        {
            id: '1',
            title: 'new todolist',
            addedDate: '',
            order: 0
        }
    )

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = todolistsReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState)
    const idFromTasks = keys[0]
    const idFromTodolists = endTodolistsState[0].id

    expect(idFromTasks).toBe(action.payload.todolist.id)
    expect(idFromTodolists).toBe(action.payload.todolist.id)
})
