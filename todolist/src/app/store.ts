import {combineReducers} from "redux";
import {todolistsReducer} from "../features/TodolistsList/todolist-reducer/todolists-reducer";
import {tasksReducer} from "../features/TodolistsList/tasks-reducer/tasks-reducer";
import {Action, configureStore} from '@reduxjs/toolkit';
import {useDispatch} from "react-redux";
import {appReducer} from "./app-reducer";
import {thunk, ThunkDispatch} from 'redux-thunk'
import {authReducer} from "../features/login/auth-reducer";

/*type rootReducerType = {
    todolists: TodolistDomainType[]
    tasks: TasksType
}*/

const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer,
    app: appReducer,
    auth: authReducer
})

/*export const store = legacy_createStore(rootReducer, applyMiddleware(thunk))*/

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});
/*export const store = configureStore({
    reducer: rootReducer,
    middleware: [thunk]
});*/

export type AppRootStateType = ReturnType<typeof rootReducer>

export type ThunkDispatchType = ThunkDispatch<AppRootStateType, unknown, Action>

export const useAppDispatch = () => useDispatch<ThunkDispatchType>()
// @ts-ignore
window.store = store