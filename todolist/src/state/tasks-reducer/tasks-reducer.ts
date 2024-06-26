import {TasksType} from "../../App";
import {v1} from "uuid";
import {
    AddTodolistActionType,
    RemoveTodolistActionType,
    todolistId1,
    todolistId2
} from "../todolist-reducer/todolists-reducer";

export type RemoveTaskActionType = ReturnType<typeof removeTaskAC>
export type ChangeTaskTitleActionType = ReturnType<typeof changeTaskTitleAC>
export type ChangeTaskStatusActionType = ReturnType<typeof changeTaskStatusAC>
export type AddTaskActionType = ReturnType<typeof addTaskAC>

type actionType =
    RemoveTaskActionType |
    AddTaskActionType |
    ChangeTaskTitleActionType |
    ChangeTaskStatusActionType |
    AddTodolistActionType |
    RemoveTodolistActionType

const initialState: TasksType = {}

export const tasksReducer = (state: TasksType = initialState, action: actionType) => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            return ({
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].filter(task => task.id !== action.payload.taskId)
            })
        }
        case 'ADD-TASK': {
            const newTask = {id: v1(), isDone: false, title: action.payload.title}
            return {...state, [action.payload.todolistId]: [newTask, ...state[action.payload.todolistId]]}
        }
        case 'CHANGE-TASK-TITLE': {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map(task => task.id === action.payload.taskId
                    ? {...task, title: action.payload.title} : task)
            }
        }
        case 'CHANGE-TASK-STATUS': {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map(task => task.id === action.payload.taskId
                    ? {...task, isDone: action.payload.isDone} : task)
            }
        }
        case 'ADD-TODOLIST': {
            return {...state, [action.payload.todolistId]: []}
        }
        case "REMOVE-TODOLIST": {
            delete state[action.payload.id]
            return {...state}
        }
        default:
            return state
    }
}

export const removeTaskAC = (todolistId: string, taskId: string) => {
    return { type: 'REMOVE-TASK', payload: { todolistId, taskId } } as const
}
export const addTaskAC = (todolistId: string, title: string) => {
    return { type: 'ADD-TASK', payload: { todolistId, title } } as const
}
export const changeTaskTitleAC = (todolistId: string, taskId: string, title: string) => {
    return { type: 'CHANGE-TASK-TITLE', payload: { todolistId, taskId, title } } as const
}
export const changeTaskStatusAC = (todolistId: string, taskId: string, isDone: boolean) => {
    return { type: 'CHANGE-TASK-STATUS', payload: { todolistId, taskId, isDone } } as const
}
