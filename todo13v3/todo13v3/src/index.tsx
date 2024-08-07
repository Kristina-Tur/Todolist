import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import App from './App';
import {Provider} from 'react-redux';
import {store} from './state/store';
import {createBrowserRouter, Navigate} from "react-router-dom";
import {Login} from "./Login";

const router = createBrowserRouter([
        {
            path: "/",
            element: <App/>,
            errorElement: <Navigate to={'/404'}/>,
            children: [
                {
                    index: true,
                    element: <Navigate to="/todolists"/>
                },
                {
                    path: "/login",
                    element: <Login/>,
                },
                {
                    path: "/todolists",
                    element: <TodolistsList/>,
                },
            ],
        },
{
    path: "/404",
        element: <ErrorPage/>,
},
])

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <Provider store={store}>
    <App />
    </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
