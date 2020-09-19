import { AnyAction, Dispatch, MiddlewareAPI } from '@reduxjs/toolkit'
import { reduxMiddlewareFactory } from 'redux-middleware-factory'
import { ActionMap } from './types'

export const defaultMapper = <S, A>(table: ActionMap<S, A>[]) => {
  console.log(`table==>\n${JSON.stringify(table)}`)
  return reduxMiddlewareFactory(
    (
      store: MiddlewareAPI<Dispatch<AnyAction>, S>,
      next: Dispatch<AnyAction>,
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
