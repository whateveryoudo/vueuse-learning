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
        <!-- <input type="text" v-model="state.orage" />
        <input type="text" />
        <input type="text" /> -->
    </div>
</template>

<script setup lang="ts">
import type { Ref, ComputedRef } from 'vue'
import { computed, reactive, toRefs } from 'vue';
import { createGlobalState } from '../core';
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
const stateStorage = useStateStorage();


</script>

<style scoped>

</style>
