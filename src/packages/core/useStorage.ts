/*
 * @Description:
 * @Autor: ykx
 * @Date: 2022-09-18 01:11:18
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-09-18 23:49:44
 */
import { MaybeComputedRef, RemovableRef } from './utils'
import { ref, shallowRef } from 'vue-demi'
import { StorageLike, getSSRHandler } from './ssr-handles'
import { resloveUnref } from './resloveUnref'

interface UseStorageOptions<T> {
  shallow?: boolean
  window?: Window
  listenToStorageChanges?: boolean
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
    listenToStorageChanges = true,
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
  if (window && listenToStorageChanges) {
    useEventListener(window, 'storage', update);
  }
  function read () {
    try {
      const rawValue = storage!.getItem(key)
      if (rawValue == null) {
        if (rawInit !== null) {
          storage!.setItem(key, JSON.stringify(rawInit))
          return rawInit
        }
      }
      return rawValue ? JSON.parse(rawValue) : null;
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
