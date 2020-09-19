import { applyMiddleware, createStore } from '@reduxjs/toolkit'
import { defaultMapper } from '../src'
import { createActionMap } from '../src/types'

enum ActionType {
  PLUS_ONE = 'PLUS_ONE',
  PLUS_TWO = 'PLUS_TWO',
  PLUS_THREE = 'PLUS_THREE',
}

type TestState = {
  value: number
  actionBefore: ActionType[]
}

const defaultState: TestState = {
  value: 0,
  actionBefore: [],
}

type TestAction = { type: ActionType }

export const reducer = (state = defaultState, action: TestAction) => {
  switch (action.type) {
    case ActionType.PLUS_ONE: {
      return { value: state.value + 1, actionBefore: state.actionBefore.concat(action.type) }
    }
    case ActionType.PLUS_TWO: {
      return { value: state.value + 2, actionBefore: state.actionBefore.concat(action.type) }
    }
    case ActionType.PLUS_THREE: {
      return { value: state.value + 3, actionBefore: state.actionBefore.concat(action.type) }
    }
    default:
      return { ...state }
  }
}

describe('Triggers some function based on the action type.', () => {
  const store = createStore(
    reducer,
    applyMiddleware(
      defaultMapper([
        createActionMap(ActionType.PLUS_ONE, (store) => {
          store.dispatch({ type: ActionType.PLUS_THREE })
        }),
      ])
    )
  )

  it('Signature must match what redux expects', () => {
    ;[
      { type: ActionType.PLUS_ONE, expected: 4 },
      { type: ActionType.PLUS_TWO, expected: 6 },
      { type: ActionType.PLUS_THREE, expected: 9 },
      { type: ActionType.PLUS_ONE, expected: 13 },
    ].forEach(({ type, expected }) => {
      store.dispatch({ type })
      expect(store.getState().value).toEqual(expected)
    })
  })
})
