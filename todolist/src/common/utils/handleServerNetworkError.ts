import { AppDispatchType } from "app/store"
import axios from "axios"
import { setAppError, setAppStatus } from "app/appSlice"
import { Dispatch } from "redux"

export const handleServerNetworkError = (err: unknown, dispatch: AppDispatchType): void => {
  let errorMessage = "Some error occurred"

  if (axios.isAxiosError(err)) {
    // ⏺️ err.response?.data?.message - например получение тасок с невалидной todolistId
    // ⏺️ err?.message - например при создании таски в offline режиме
    errorMessage = err.response?.data?.message || err?.message || errorMessage
    // ❗ Проверка на наличие нативной ошибки
  } else if (err instanceof Error) {
    errorMessage = `Native error: ${err.message}`
    // ❗Какой-то непонятный кейс
  } else {
    errorMessage = JSON.stringify(err)
  }

  dispatch(setAppError({ error: errorMessage }))
  dispatch(setAppStatus({ status: "failed" }))
}
