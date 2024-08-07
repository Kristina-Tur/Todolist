import React from 'react'
import {Provider} from "react-redux";
import {applyMiddleware, combineReducers, createStore, legacy_createStore} from "redux";
import {v1} from "uuid";
import {tasksReducer} from "../../features/TodolistsList/tasks-reducer/tasks-reducer";
import {todolistsReducer} from "../../features/TodolistsList/todolist-reducer/todolists-reducer";
import {AppRootStateType} from "../../app/store";
import {TaskPriorities, TaskStatuses} from "../../api/API";
import {appReducer} from "../../app/app-reducer";
import {thunk} from "redux-thunk";
import {configureStore} from "@reduxjs/toolkit";
import {authReducer} from "../../features/login/auth-reducer";

/*type RootStateType = {
    tasks: TasksType
    todolists: TodolistDomainType[]
} | undefined*/

const rootReducer/*: Reducer<RootStateType, ActionsType & ActionType>*/  = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
    app: appReducer,
    auth: authReducer
})

const initialGlobalState: AppRootStateType = {
    todolists: [
        {id: "todolistId1", title: "What to learn", filter: "all", addedDate: '', order: 0, entityStatus: 'idle'},
        {id: "todolistId2", title: "What to buy", filter: "all", addedDate: '', order: 0, entityStatus: 'loading'}
    ] ,
    tasks: {
        ["todolistId1"]: [
            {
                id: v1(),
                title: "HTML&CSS",
                description: '',
                status: TaskStatuses.Completed,
                priority: TaskPriorities.Middle,
                startDate: '',
                deadline: '',
                todoListId: "todolistId1",
                order: 0,
                addedDate: ''
            },
            {
                id: v1(),
                title: "JS",
                description: '',
                status: TaskStatuses.New,
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                todoListId: "todolistId1",
                order: 0,
                addedDate: ''
            }
        ],
        ["todolistId2"]: [
            {
                id: v1(),
                title: "Milk",
                description: '',
                status: TaskStatuses.New,
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                todoListId: "todolistId2",
                order: 0,
                addedDate: ''
            },
            {
                id: v1(),
                title: "React Book",
                description: '',
                status: TaskStatuses.Completed,
                priority: TaskPriorities.Middle,
                startDate: '',
                deadline: '',
                todoListId: "todolistId2",
                order: 0,
                addedDate: ''
            }
        ]
    },
    app: {
        error: null,
        status: 'idle',
        isInitialized: false
    },
    auth: {
        isLoggedIn: false
    }
};


export const storyBookStore = legacy_createStore(rootReducer, initialGlobalState as any, applyMiddleware(thunk));


export const ReduxStoreProviderDecorator = (storyFn: () => React.ReactNode) => {
    return <Provider store={storyBookStore}>{storyFn()}</Provider>
}