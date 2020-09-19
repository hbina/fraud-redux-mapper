import { applyMiddleware, createStore } from '@reduxjs/toolkit'
import { createMapper } from '../src'
import { createActionMap } from '../src/types'

enum ActionType {
  PLUS_ONE = 'PLUS_ONE',
  PLUS_TWO = 'PLUS_TWO',
  PLUS_THREE = 'PLUS_THREE',
}

type TestState = {
  value: number
  history: ActionType[]
}

const defaultState: TestState = {
  value: 0,
  history: [],
}

type TestAction = { type: ActionType }

export const reducer = (state = defaultState, action: TestAction) => {
  switch (action.type) {
    case ActionType.PLUS_ONE: {
      return { value: state.value + 1, history: state.history.concat(action.type) }
    }
    case ActionType.PLUS_TWO: {
      return { value: state.value + 2, history: state.history.concat(action.type) }
    }
    case ActionType.PLUS_THREE: {
      return { value: state.value + 3, history: state.history.concat(action.type) }
    }
    default:
      return { ...state }
  }
}

describe('Triggers some function based on the action type.', () => {
  const store = createStore(
    reducer,
    applyMiddleware(
      createMapper([
        createActionMap(ActionType.PLUS_ONE, (store) => {
          store.dispatch({ type: ActionType.PLUS_THREE })
        }),
        createActionMap(ActionType.PLUS_TWO, (store) => {
          store.dispatch({ type: ActionType.PLUS_ONE })
        }),
      ])
    )
  )

  it('Signature must match what redux expects', () => {
    ;[
      {
        type: ActionType.PLUS_ONE,
        expected: {
          value: 4,
          history: [ActionType.PLUS_THREE, ActionType.PLUS_ONE],
        },
      },
      {
        type: ActionType.PLUS_TWO,
        expected: {
          value: 10,
          history: [
            ActionType.PLUS_THREE,
            ActionType.PLUS_ONE,
            ActionType.PLUS_THREE,
            ActionType.PLUS_ONE,
            ActionType.PLUS_TWO,
          ],
        },
      },
      {
        type: ActionType.PLUS_THREE,
        expected: {
          value: 13,
          history: [
            ActionType.PLUS_THREE,
            ActionType.PLUS_ONE,
            ActionType.PLUS_THREE,
            ActionType.PLUS_ONE,
            ActionType.PLUS_TWO,
            ActionType.PLUS_THREE,
          ],
        },
      },
      {
        type: ActionType.PLUS_ONE,
        expected: {
          value: 17,
          history: [
            ActionType.PLUS_THREE,
            ActionType.PLUS_ONE,
            ActionType.PLUS_THREE,
            ActionType.PLUS_ONE,
            ActionType.PLUS_TWO,
            ActionType.PLUS_THREE,
            ActionType.PLUS_THREE,
            ActionType.PLUS_ONE,
          ],
        },
      },
    ].forEach(({ type, expected }) => {
      store.dispatch({ type })
      expect(store.getState()).toEqual(expected)
    })
  })
})
