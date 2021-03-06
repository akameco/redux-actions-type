import { ActionType, ActionsType } from '.'

const increment = (payload: number) =>
  ({
    type: 'increment',
    payload,
  } as const)

const decrement = (payload: number) =>
  ({
    type: 'decrement',
    payload,
  } as const)

const typo = (payload: string) =>
  ({
    // typo...
    typo: 'typo',
    payload,
  } as const)

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

type State = {
  count: number
}

export const reducer = (state: State = { count: 0 }, action: Action): State => {
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
