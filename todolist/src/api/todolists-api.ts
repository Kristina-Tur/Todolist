import axios from "axios";
import {CreateTodolist, DeleteTodolist, UpdateTodolistTitle} from "../stories/components/todolists-api.stories";

const settings = {
    withCredentials: true,
    headers: {
        "API-KEY": "0d6fcc4b-d0b8-4c34-b068-91acef8dc727"
    }
}

const instance = axios.create({
    baseUrl: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        "API-KEY": "0d6fcc4b-d0b8-4c34-b068-91acef8dc727"
    }
})

type TodolistsType = {
    id: string
    title: string
    addedDate: string
    order: number
}

type ResponceType<D = {}> = {
    resultCode: number
    messages: string[]
    data: D
}


type GetTasksResponce = {
    items: TaskType[]
    totalCount: number
    error: null | string
}

export type TaskType = {
    description: string
    title: string
    completed: boolean
    status: number
    priority: number
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}



export const todolistsApi = {
    getTodolists() {
        return instance.get<TodolistsType[]>('todo-lists')
    },
    createTodolist(title: string) {
        return instance.post<ResponceType<{ item: TodolistsType }>>(
            'todo-lists',
            {title}
        )
    },
    deleteTodolist(todolistId: string) {
        return instance.delete<ResponceType>(`todo-lists/${todolistId}`)
    },
    updateTodolistTitle(todolistId: string, title: string) {
        return instance.put<ResponceType>(`todo-lists/${todolistId}`,{title})
    },
    getTasks(todolistId: string) {
        return instance.get<GetTasksResponce>(`todo-lists/${todolistId}/tasks`)
    },
    deleteTasks(todolistId: string, taskId: string) {
        return instance.delete<ResponceType>(`todo-lists/${todolistId}/tasks/${taskId}`)
    },

}