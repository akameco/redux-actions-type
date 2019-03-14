import { ActionType, ActionsType } from '.'

const increment = (payload: number) => ({
  type: 'increment' as 'increment',
  payload,
})

const decrement = (payload: number) => ({
  type: 'decrement' as 'decrement',
  payload,
})

const hello = (payload: string) => ({
  type: 'hello' as 'hello',
  payload,
})

const actions = { increment, decrement, hello }

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
 *  hello: {
 *    type: "hello";
 *    payload: string;
 *  };
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
 * } | {
 *   type: "hello";
 *   payload: string;
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
