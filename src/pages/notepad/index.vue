<!--
 * @Author: feng
 * @Date: 2022-09-28 15:33:47
 * @LastEditTime: 2022-10-17 09:19:02
 * @Description: file content
-->
<template>
    <el-row>
        <el-col class="tc">
            <el-button size="large" type="primary" @click="showDialog">新增</el-button>
        </el-col>
    </el-row>
    <el-card class="box-card mt20" shadow="never" v-for="(item,i) in dataList" :key="i">
        <div class="flex">
            <div>{{i+1}}、</div>
            <div>{{item}}</div>
        </div>
    </el-card>
    <el-dialog :close-on-click-modal="false" v-model="dialogVisible" title="记事本" size="middle" draggable>
        <el-input v-model="textarea" :rows="4" type="textarea" placeholder="Please input" />
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogVisible = false">取消</el-button>
                <el-button type="primary" @click="save">保存</el-button>
            </span>
        </template>
    </el-dialog>
</template>
<script setup lang="ts">
const dialogVisible = ref(false)
const textarea = ref('')
const showDialog = () => {
    dialogVisible.value = true
}
// 获取信息
const getData = (): string[] => {
    const list: [] = localStorage.getItem('FASTPAGE-NOTEPAD') && JSON.parse(localStorage.getItem('FASTPAGE-NOTEPAD') as string) || []
    return list
}
const list: string[] = getData()
// 总信息数组
const dataList = ref(list)
const save = () => {
    list.push(textarea.value)
    localStorage.setItem('FASTPAGE-NOTEPAD', JSON.stringify(list))
    dialogVisible.value = false
    textarea.value = ''
}
</script>
<style lang="less" scoped>

</style>