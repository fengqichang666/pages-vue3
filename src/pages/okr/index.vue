<!--
 * @Author: feng
 * @Date: 2022-09-28 15:33:47
 * @LastEditTime: 2022-10-17 09:55:27
 * @Description: file content
-->
<template>
    <el-row align="middle">
        <el-col :span="4" :offset="1">
            <el-button type="primary" @click="addOkr">添加OKR模板</el-button>
            <el-button type="danger" v-if="dataList.length>0" @click="dealList" v-text="delFlag?'返回':'删除'"></el-button>
        </el-col>
        <el-col class="f12 tips" :span="4">
            可拖动卡片进行排序
        </el-col>
    </el-row>
    <draggable :disabled="stopDraggable" class="flex wrap justify-center" :force-fallback="true" :list="dataList" :animation="1000"
        item-key="idx" @end="onEnd" @start="onStart">
        <template #item="{element , index}">
            <el-card class="box-card relative">
                <template #header>
                    <div class="card-header">
                        <span class="okr-title">OKR{{element.idx}}</span>
                        <input @change="saveChange" @focus="focusInput" @blur="blurInput" v-model="element.o"
                            class="ml12 o-width" placeholder="请输入你的Object" />
                    </div>
                </template>
                <div class="kr">
                    <input @change="saveChange" @focus="focusInput" @blur="blurInput" v-for="item in 5" :key="item"
                        v-model="element[`kr${index+1}`]" placeholder="请输入你的KR" />
                </div>
                <div v-if="delFlag" class="del-icon">
                    <el-icon @click="delItem(index)">
                        <Delete />
                    </el-icon>
                </div>
            </el-card>
        </template>
    </draggable>

</template>
<script setup lang="ts">
import draggable from 'vuedraggable';
interface List {
    idx: number,
    o: string,
    kr1: string,
    kr2: string,
    kr3: string,
    kr4: string,
    kr5: string,
}
const delFlag = ref(false)
const stopDraggable = ref(false)
// 获取信息
const getData = (): List[] => {
    const list: List[] = localStorage.getItem('FASTPAGE-OKRLIST') && JSON.parse(localStorage.getItem('FASTPAGE-OKRLIST') as string) || []
    return list
}

const dataList: List[] = reactive(getData())
const addOkr = () => {
    const data: List = { idx: dataList.length + 1, o: '', kr1: '', kr2: '', kr3: '', kr4: '', kr5: '' }
    dataList.push(data)
    saveList()
}
const saveChange = () => {
    saveList()
}
const focusInput = () => {
    stopDraggable.value = true
}
const blurInput = () => {
    stopDraggable.value = false
}
const saveList = () => {
    localStorage.setItem('FASTPAGE-OKRLIST', JSON.stringify(dataList))
}
const delItem = (i: number): void => {
    if (lock.value) { return }
    dataList.splice(i, 1)
    createIdx()
    localStorage.setItem('FASTPAGE-OKRLIST', JSON.stringify(dataList))
}
const dealList = () => {
    delFlag.value = !delFlag.value
}
const onEnd = (): void => {
    lock.value = false
    createIdx()
    saveList()
}
const lock = ref(false)
const onStart = (): void => {
    lock.value = true
}
const createIdx = () => {
    dataList.forEach((item, i) => {
        item.idx = i + 1
    })
}
</script>
<style lang="less" scoped>
.title {
    color: var(--el-color-success-dark-2);
}

.okr-title {
    color: red;
    font-size: 22px;
}

.box-card {
    width: 24rem;
    height: 300px;
    margin: 15px;

    .o-width {
        width: 16.8rem;
    }

    input {
        background: rgb(239, 236, 236);
        border: 1px solid #ddd;
        height: 28px;
        text-align: center;
        border-radius: 3px;
        color: #c45656;
        font-size: 1.2em;

        &:focus {
            outline: none;
            border: 1px solid rgb(200, 199, 199);
        }
    }

    .kr {
        input {
            width: 21.5rem;
            margin-top: 12px;
            font-size: 0.9rem;
            text-align: left;
            padding-left: 8px;
            box-sizing: border-box;

            &:first-child {
                margin-top: 0;
            }

        }
    }

    .del-icon {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        background: rgb(230, 228, 228);
        opacity: 0.8;
        cursor: pointer;
        font-size: 2.5rem;
        z-index: 999;
    }
}
.tips {
    color: var(--el-color-danger-light-3);
}
.w280 {
    width: 280px;
}
</style>