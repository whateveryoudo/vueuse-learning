/*
 * @Description:
 * @Autor: ykx
 * @Date: 2022-09-18 01:35:38
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-09-18 03:03:44
 */
export interface StorageLike {
  setItem(key: string, value: string): void
  getItem(key: string): string | null
  removeItem(key: string): void
}
export interface SSRHandlersMap {
  getDefaultStorage: () => StorageLike | undefined
}
const _global =
  typeof globalThis !== 'undefined'
    ? globalThis
    : typeof window !== 'undefined'
    ? window
    : typeof global !== 'undefined'
    ? global
    : typeof self !== 'undefined'
    ? self
    : {}
const globalKey = '__vueuse_ssr_handlers__'
_global[globalKey] = _global[globalKey] || {}
const handlers: Partial<SSRHandlersMap> = _global[globalKey]
export function getSSRHandler<T extends keyof SSRHandlersMap>(key: T, fallback: SSRHandlersMap[T]): SSRHandlersMap[T]
export function getSSRHandler<T extends keyof SSRHandlersMap>(key: T, fallback: SSRHandlersMap[T] | undefined): SSRHandlersMap[T] | undefined
export function getSSRHandler<T extends keyof SSRHandlersMap>(key: T, fallback?: SSRHandlersMap[T]): SSRHandlersMap[T] | undefined {
  return handlers[key] as SSRHandlersMap[T] || fallback
}

export function setSSRHandler<T extends keyof SSRHandlersMap>(key: T, fn: SSRHandlersMap[T]) {
  handlers[key] = fn
}
