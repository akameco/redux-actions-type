# redux-actions-type

[![Build Status](https://travis-ci.com/akameco/redux-actions-type.svg?branch=master)](https://travis-ci.com/akameco/redux-actions-type)
[![tested with jest](https://img.shields.io/badge/tested_with-jest-99424f.svg)](https://github.com/facebook/jest)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors)

> easy typing of redux action

## Install

```
$ npm install redux-actions-type
```

```
$ yarn add redux-actions-type
```

## Usage

actions.ts

```ts
export const increment = (payload: number) =>
  ({
    type: 'increment',
    payload,
  } as const)

export const decrement = (payload: number) =>
  ({
    type: 'decrement',
    payload,
  } as const)

export const typo = (payload: string) =>
  ({
    // typo...
    typo: 'typo',
    payload,
  } as const)
```

types.ts

```ts
import { Reducer } from 'redux'
import { ActionType, ActionsType } from 'redux-actions-type'
import * as actions from './actions'

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
 * type IncrementAction = {
 *   type: "increment";
 *   payload: number;
 * }
 */
type IncrementAction = Actions['increment']

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
```

## Contributors

Thanks goes to these wonderful people ([emoji key](https://github.com/kentcdodds/all-contributors#emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
<table><tr><td align="center"><a href="http://akameco.github.io"><img src="https://avatars2.githubusercontent.com/u/4002137?v=4" width="100px;" alt="akameco"/><br /><sub><b>akameco</b></sub></a><br /><a href="https://github.com/akameco/eslint-checker/commits?author=akameco" title="Code">💻</a> <a href="https://github.com/akameco/eslint-checker/commits?author=akameco" title="Documentation">📖</a> <a href="https://github.com/akameco/eslint-checker/commits?author=akameco" title="Tests">⚠️</a> <a href="#infra-akameco" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a></td></tr></table>

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/kentcdodds/all-contributors) specification. Contributions of any kind welcome!

## License

MIT © [akameco](http://akameco.github.io)
