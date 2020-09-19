import { AnyAction, Dispatch, MiddlewareAPI } from '@reduxjs/toolkit'

export type ActionMap<S, A> = {
  from: A
  to: (a: MiddlewareAPI<Dispatch<AnyAction>, S>) => void
}

export const createActionMap: <S, A>(
  a: A,
  f: (a: MiddlewareAPI<Dispatch<AnyAction>, S>) => void
) => ActionMap<S, A> = (from, f) => {
  return {
    from: from,
    to: f,
  }
}
