import { AnyAction } from 'redux'

export type ActionsType<ActionCreaters extends object> = {
  [Key in keyof ActionCreaters]: ActionCreaters[Key] extends (
    ...args: any[]
  ) => AnyAction
    ? ReturnType<ActionCreaters[Key]>
    : never
}

export type ActionType<
  ActionCreaters extends object,
  Actions = ActionsType<ActionCreaters>
> = {
  [Key in keyof Actions]: Actions[Key] extends AnyAction ? Actions[Key] : never
}[keyof Actions]
