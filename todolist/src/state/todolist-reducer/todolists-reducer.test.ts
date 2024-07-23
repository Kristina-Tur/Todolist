import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC, removeTodolistAC, setTodolistsAC,
    todolistsReducer
} from './todolists-reducer'
import { v1 } from 'uuid'
import {TodolistDomainType} from "../../app/App";

let todolistId1: string
let todolistId2: string
let startState: TodolistDomainType[]

beforeEach(() => {
    todolistId1 = v1()
    todolistId2 = v1()

     startState = [
        { id: todolistId1, title: 'What to learn', filter: 'all', addedDate: '', order: 0 },
        { id: todolistId2, title: 'What to buy', filter: 'all', addedDate: '', order: 0 },
    ]
})

test('correct todolist should be removed', () => {
    const endState = todolistsReducer(startState, removeTodolistAC(todolistId1))

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistId2)
})

test('correct todolist should be added', () => {
    const endState = todolistsReducer(startState, addTodolistAC('New Todolist'))

    expect(endState.length).toBe(3)
    expect(endState[0].title).toBe('New Todolist')
    expect(endState[0].filter).toBe('all')
})

test('correct todolist should change its name', () => {
    const endState = todolistsReducer(startState, changeTodolistTitleAC(todolistId2, 'New Todolist'))

    expect(endState[0].title).toBe('What to learn')
    expect(endState[1].title).toBe('New Todolist')
})

test('correct filter of todolist should be changed', () => {
    const endState = todolistsReducer(startState, changeTodolistFilterAC(todolistId2, 'completed'))

    expect(endState[0].filter).toBe('all')
    expect(endState[1].filter).toBe('completed')
})

test('todolists should be set to the state ', () => {
    const endState = todolistsReducer(startState, setTodolistsAC(startState))

    expect(endState.length).toBe(2)
})
