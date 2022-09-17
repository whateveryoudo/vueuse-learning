/*
 * @Description: 
 * @Autor: ykx
 * @Date: 2022-09-18 02:32:44
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-09-18 02:33:46
 */
import { unref } from 'vue-demi';
import {MaybeComputedRef} from './utils'
export function resloveUnref<T>(r: MaybeComputedRef<T>): T {
    return typeof r === 'function' ?(r as any)() : unref(r);
}