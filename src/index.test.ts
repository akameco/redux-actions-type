import { Reducer } from 'redux'
import { ActionType, ActionsType } from '.'

const increment = (payload: number) => ({
  type: 'increment' as 'increment',
  payload,
})

const decrement = (payload: number) => ({
  type: 'decrement' as 'decrement',
  payload,
})

const typo = (payload: string) => ({
  // typo...
  typo: 'typo' as 'typo',
  payload,
})

const actions = { increment, decrement, typo }

/**
 * @example
 * type Actions = {
 *   inc: {
 *     type: "increment";
 *     payload: number;
 *  };
 *  decrement: {
 *    type: "decrement";
 *    payload: number;
 *  };
 *  typo: never;
 * }
 */
type Actions = ActionsType<typeof actions>

/**
 * @example
 * type Action = {
 *   type: "increment";
 *   payload: number;
 * } | {
 *   type: "decrement";
 *   payload: number;
 * }
 */
type Action = ActionType<typeof actions>

/**
 * @example
 * type IncrementAction = {
 *  type: "increment";
 *  payload: number;
 * }
 */
type IncrementAction = Actions['increment']

test('type check', () => {
  const action1: Actions['increment'] = { type: 'increment', payload: 1 }
  const action2: Action = { type: 'increment', payload: 1 }
  const action3: IncrementAction = { type: 'increment', payload: 1 }
  expect(action1).toStrictEqual(action2)
  expect(action1).toStrictEqual(action3)
})

interface State {
  count: number
}

const reducer: Reducer<State, Action> = (
  state = { count: 0 },
  action: Action
) => {
  switch (action.type) {
    case 'increment':
      return { count: state.count + action.payload }
    case 'decrement':
      return { count: state.count - action.payload }
    // Type Error...
    // case 'typo':
    //   return { count: action.payload }
    default:
      return state
  }
}

test('type check with reducer', () => {
  expect(reducer({ count: 1 }, increment(10))).toStrictEqual({ count: 11 })
})
