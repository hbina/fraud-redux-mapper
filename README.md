### Fraud Redux-Mapper

> A Redux middleware that maps an action to some lambda.

## Usage

To use this middleware, simply provide a table of `ActionMap<S, A>[]`.

```typescript
const store = createStore(
  reducer,
  applyMiddleware(
    createMapper([
      createActionMap('SOME_ACTION', (store) => {
        store.dispatch({ type: 'THIS_ACTION' })
      }),
      createActionMap('SOME_OTHER_ACTION', (store) => {
        store.dispatch({ type: 'THAT_ACTION' })
      }),
    ])
  )
)
```

Where the type signature for `ActionMap<S, A>[]` is,

```typescript
export type ActionMap<S, A> = {
  from: A
  to: (a: MiddlewareAPI<Dispatch<AnyAction>, S>) => void
}
```

Or simply, it maps a certain action `from` to some function `to` that accepts the reducer.
