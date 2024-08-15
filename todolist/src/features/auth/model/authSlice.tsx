import { Dispatch } from "redux"
import { setAppStatus } from "app/appSlice"
import { handleServerAppError } from "common/utils/handleServerAppError"
import { clearTodolists } from "features/TodolistsList/model/todolistSlice/todolistsSlice"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { LoginParamsType } from "features/auth/api/authApi.types"
import { authAPI } from "features/auth/api/authApi"
import { handleServerNetworkError } from "common/utils/handleServerNetworkError"
import { clearTasks } from "features/TodolistsList/model/tasksSlice/tasksSlice"

const slice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
  },
  reducers: {
    setIsLoginIn: (state, action: PayloadAction<{ isLoggedIn: boolean }>) => {
      state.isLoggedIn = action.payload.isLoggedIn
    },
  },
  selectors: {
    selectIsLoginIn: (state) => state.isLoggedIn,
  },
})

//TC
export const loginTC = (value: LoginParamsType) => {
  return (dispatch: Dispatch) => {
    dispatch(setAppStatus({ status: "loading" }))
    authAPI
      .login(value)
      .then((res) => {
        if (res.data.resultCode === 0) {
          dispatch(setIsLoginIn({ isLoggedIn: true }))
        } else {
          handleServerAppError(res.data, dispatch)
        }
        dispatch(setAppStatus({ status: "idle" }))
      })
      .catch((error) => {
        handleServerNetworkError(error, dispatch)
      })
  }
}
export const logoutTC = () => {
  return (dispatch: Dispatch) => {
    dispatch(setAppStatus({ status: "loading" }))
    authAPI
      .logout()
      .then((res) => {
        if (res.data.resultCode === 0) {
          dispatch(setIsLoginIn({ isLoggedIn: false }))
          /*dispatch(clearData())*/
          dispatch(clearTodolists())
          dispatch(clearTasks())
          dispatch(setAppStatus({ status: "succeeded" }))
        } else {
          handleServerAppError(res.data, dispatch)
        }
      })
      .catch((error) => {
        handleServerNetworkError(error, dispatch)
      })
  }
}

//type
/*export type AuthActionsType = ReturnType<typeof setIsLoginInAC>*/
export const authReducer = slice.reducer
export const { setIsLoginIn } = slice.actions
export const { selectIsLoginIn } = slice.selectors
