/*
 * @Description:
 * @Autor: ykx
 * @Date: 2022-09-18 01:24:27
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-09-18 01:44:16
 */
import { ComputedRef, Ref } from 'vue-demi'

export type MaybeRef<T> = T | Ref<T>

export type MaybeComputedRef<T> = MaybeReadonlyRef<T> | MaybeRef<T>

export type MaybeReadonlyRef<T> = (() => T) | ComputedRef<T>


export type RemovableRef<T> = Omit<Ref<T>, 'value'> & {
    get value(): T
    set value(value: T | null | undefined)
  }