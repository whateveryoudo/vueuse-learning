/*
 * @Description:
 * @Autor: ykx
 * @Date: 2022-09-18 01:11:18
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-09-18 03:05:18
 */
import { MaybeComputedRef, RemovableRef } from './utils'
import { ref, shallowRef } from 'vue-demi'
import { StorageLike, getSSRHandler } from './ssr-handles'
import { resloveUnref } from './resloveUnref'

interface UseStorageOptions<T> {
  shallow?: boolean
  window?: Window
  onError?: (error: unknown) => void
}

export const defaultWindow = window;
export function useStorage<
  T extends string | number | boolean | object | null
> (
  key: string,
  defaults: MaybeComputedRef<T>,
  storage?: StorageLike | undefined,
  options: UseStorageOptions<T> = {}
): RemovableRef<T> {
  const {
    shallow,
    window = defaultWindow,
    onError = e => {
      console.error(e)
    }
  } = options

  const data = (shallow ? shallowRef : ref)(defaults) as RemovableRef<T>
  if (!storage) {
    try {
      storage = getSSRHandler('getDefaultStorage', () => defaultWindow?.localStorage)();
    } catch (e) {
      onError(e)
    }
  }
  if (!storage) {
    return data
  }
  const rawInit: T = resloveUnref(defaults)
  function read () {
    try {
      const rawValue = storage!.getItem(key)
      if (rawValue == null) {
        if (rawInit !== null) {
          storage!.setItem(key, JSON.stringify(rawInit))
          return rawInit
        }
      }
      return rawValue
    } catch (error) {
      onError(error)
    }
  }
  update()
  return data
  function update () {

    data.value = read() as any;
  }
}
