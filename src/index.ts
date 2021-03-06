import { AnyAction, Dispatch, MiddlewareAPI } from '@reduxjs/toolkit'
import { reduxMiddlewareFactory } from 'redux-middleware-factory'
import { ActionMap } from './types'

export const createMapper = <S, A>(table: ActionMap<S, A>[]) => {
  return reduxMiddlewareFactory(
    (
      store: MiddlewareAPI<Dispatch<AnyAction>, S>,
      _next: Dispatch<AnyAction>,
      action: AnyAction
    ) => {
      const actionMap = table.find((from) => from.from === action.type)
      if (actionMap !== undefined) {
        actionMap.to(store)
      }
      return action
    }
  )
}
