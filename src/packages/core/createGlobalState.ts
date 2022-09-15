/*
 * @Description:
 * @Autor: ykx
 * @Date: 2022-09-16 03:26:59
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-09-16 03:44:25
 */
import { effectScope } from 'vue-demi'
type CreateGlobalStateReturn<T> = () => T
export function createGlobalState<T> (
  stateFactory: () => T
): CreateGlobalStateReturn<T> {
  let initialized = false
  let state: T
  const scope = effectScope(true)
  return () => {
    if (!initialized) {
      state = scope.run(stateFactory)!
      initialized = true
    }
    return state
  }
}
