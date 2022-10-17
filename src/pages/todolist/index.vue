<!--
 * @Author: feng
 * @Date: 2022-09-28 15:33:47
 * @LastEditTime: 2022-10-14 14:39:51
 * @Description: file content
-->
<template>
    <el-row class="todolist" align="middle">
        <el-col :span="3">
            <h3 class="title">TODOLIST</h3>
        </el-col>
        <el-col :span="2">
            <el-button type="primary" @click="addInput">
                新增一条
            </el-button>
        </el-col>
        <el-col class="f12 tips" :span="4">
            可拖动卡片进行排序
        </el-col>
    </el-row>
    <draggable :force-fallback="true" :list="dataList" :animation="1000" item-key="idx" @end="onEnd" @start="onStart">
        <template #item="{element , index}">
            <el-row class="mt16">
                <el-col :span="20" :offset="2">
                    <el-card shadow="hover" class="relative" :class="element.status===3?'complete':''">
                        <div class="flex" v-if="element.status===0||element.status===1">
                            <div class="number-color">{{index+1}}、</div>
                            <div class="per80">
                                <el-input v-model="element.value" placeholder="Please input" clearable />
                            </div>
                            <el-button :disabled="lock" v-if="element.Status!==3" type="primary" class="ml20"
                                @click="save(element)">
                                保存
                            </el-button>
                            <el-button :disabled="lock" v-if="element.Status!==3" type="info"
                                @click="cancel(element,index)">
                                取消
                            </el-button>
                        </div>
                        <div class="flex" v-else>
                            <div class="number-color">{{index+1}}、</div>
                            <div class="per80 ">
                                <div class="text">{{element.value}}</div>
                                <div class="date">最新修改时间：{{element.date}}</div>
                            </div>
                            <div class="self-center" v-if="element.status!==3">
                                <el-button :disabled="lock" type="primary" class="ml20"
                                    @click="editItem(element,index)">
                                    编辑
                                </el-button>
                                <el-button :disabled="lock" type="success" @click="completeItem(element)">
                                    完成
                                </el-button>
                            </div>
                            <div class="del">
                                <el-icon @click="del(element,index)">
                                    <CloseBold />
                                </el-icon>
                            </div>
                        </div>
                    </el-card>
                </el-col>
            </el-row>
        </template>
    </draggable>
</template>
<script setup lang="ts">
import { getFormatTime } from '@/hook/date'
import draggable from 'vuedraggable';
// add：0新增输入框 edit：1更改内容 show：2 展示 complete: 3 完成
enum Status {
    add, edit, show, complete
}
interface List {
    id: string,
    value: string,
    originVal: string,
    status: Status.add,
    date?: string,
    idx: number
}
// 获取信息
const getData = (): List[] => {
    const list: List[] = localStorage.getItem('FASTPAGE-TODOLIST') && JSON.parse(localStorage.getItem('FASTPAGE-TODOLIST') as string) || []
    return list
}
const list: List[] = getData().sort((a, b) => a.idx - b.idx)
// 生成最新序号、新增时无法确保序号的准确性
const setData = (): void => {
    list.forEach((item, i) => item.idx = i + 1)
    localStorage.setItem('FASTPAGE-TODOLIST', JSON.stringify(list))
}
setData()
// 总信息数组
const dataList: List[] = reactive(list)
// 添加一条
const addInput = (): void => {
    const data: List = { value: '', originVal: '', status: Status.add, id: new Date().getTime() + '', idx: dataList.length + 1 }
    dataList.push(data)
}
// 保存新增/修改
const save = (item: List): void => {
    // 保存本条、改变状态为显示
    item.status = 2
    item.originVal = item.value
    item.date = getFormatTime()
    setItem(item)
}
// 取消新增、取消修改
const cancel = (item: List, i: number): void => {
    if (item.status === 0) {
        dataList.splice(i, 1)
    } else {
        item.value = item.originVal
        item.status = 2
    }
}
// 删除本条
const del = (item: List, i: number): void => {
    if (lock.value) { return }
    dataList.splice(i, 1) // 页面显示
    delItem(item) // 本地存储
}
// 修改本条
const editItem = (item: List, i: number): void => {
    // 保存原有值、改变状态为修改
    item.status = 1
}
// 保存当前至localStorage
const setItem = (item: List): void => {
    const list: List[] = getData()
    // 通过id判断是否是修改原有的数据
    const data = list.findIndex(cur => {
        return item.id === cur.id
    })
    if (data > -1) {
        list[data] = item
    } else {
        // 新增
        list.push(item)
    }
    localStorage.setItem('FASTPAGE-TODOLIST', JSON.stringify(list))
}
// 删除一条localStorage
const delItem = (item: List): void => {
    // 界面可能有新增,需获取本地存储内数据
    const list: List[] = getData()
    // 通过id判断是否是修改原有的数据
    const data = list.findIndex(data => {
        return item.id = data.id
    })
    list.splice(data, 1)
    localStorage.setItem('FASTPAGE-TODOLIST', JSON.stringify(list))
}
// 完成本条
const completeItem = (item: List): void => {
    item.status = 3
    item.date = getFormatTime()
    // 界面可能有新增,需获取本地存储内数据
    const list: List[] = getData()
    // 通过id判断是否是修改原有的数据
    const data = list.findIndex(data => {
        return item.id = data.id
    })
    list[data].status = 3
    list[data].date = item.date
    localStorage.setItem('FASTPAGE-TODOLIST', JSON.stringify(list))
}
const onEnd = (): void => {
    const list: List[] = getData()
    dataList.forEach((item, i) => item.idx = i + 1)
    const newList: List[] = dataList.filter(item => {
        return list.some(data => item.id === data.id)
    })
    newList.forEach(item => {
        if (item.status === Status.edit as Status) {
            item.status = 2
            item.value = item.originVal
        }
    })
    localStorage.setItem('FASTPAGE-TODOLIST', JSON.stringify(newList))
    lock.value = false
}
const lock = ref(false)
const onStart = (): void => {
    lock.value = true
}
</script>
<style lang="less" scoped>
.todolist {
    display: flex;

    .title {
        color: var(--el-color-success-dark-2);
    }
}

.per80 {
    width: 80%;
}

.text {
    color: var(--el-color-primary-dark-2);
    font-size: 18px;

}

.date {
    margin-top: 8px;
    font-size: 12px;
    color: var(--el-color-info-light-3);
}

.number-color {
    color: var(--el-color-warning-dark-2);
}

.tips {
    color: var(--el-color-danger-light-3);
}

.del {
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
}

.complete {
    background: var(--el-color-info-light-7);
}
</style>