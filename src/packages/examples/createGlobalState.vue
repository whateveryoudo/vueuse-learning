<!--
 * @Description: 
 * @Autor: ykx
 * @Date: 2022-09-16 03:27:13
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-09-18 23:41:50
-->
<!--
 * new page
 * @author: zhaoyahui
 * @since: 2022-09-16
 * createGlobalState.vue
-->
<template>
    <div class="container">

        <!-- 不缓存操作 -->
        <button @click="state.setName">改变名字</button>
        <pre lang="yaml">{{state.name}}-{{state.age}}-计算年龄：{{state.newAge}}</pre>
        <!-- 结合缓存处理 -->
        <input type="text" v-model="stateStorage.name" />
        <input type="text" v-model="stateStorage.age" />
    </div>
</template>

<script setup lang="ts">
import type { Ref, ComputedRef } from 'vue'
import { computed, reactive, toRefs } from 'vue';
import { createGlobalState, useStorage } from '../core';
interface ReturnInfo {
    age: Ref<number>;
    name: Ref<string>;
    newAge: ComputedRef<number>;
    setName: () => void;
}
const useState = createGlobalState<ReturnInfo>(() => {
    // state
    const info = reactive({
        name: '张三',
        age: 20,

    })
    // getters
    const newAge = computed(() => info.age + 10);

    const setName = () => {
        info.name = '李四'
    }
    return {
        ...toRefs(info),
        newAge,
        setName
    }
})
const state = useState();
const useStateStorage = createGlobalState(() => {
    return useStorage('local-info', {
        'name': '李四',
        age: 20
    })
})
const stateStorage = useStateStorage();


</script>

<style scoped>

</style>
