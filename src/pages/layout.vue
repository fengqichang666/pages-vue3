<!--
 * @Author: feng
 * @Date: 2022-10-09 20:42:45
 * @LastEditTime: 2022-10-11 09:34:26
 * @Description: file content
-->
<template>
    <el-container class="container">
        <el-header>
            <el-row align="middle" :gutter="12" class="header">
                <el-col :span="4">
                </el-col>
                <el-col :span="2">
                    <h1 class="page-name">FastPage</h1>
                </el-col>
                <el-col :span="12">
                    <el-input clearable @keypress="pressSearch" autocomplete="on" v-model="searchValue"
                        placeholder="Please input">
                        <template #prepend>
                            <el-select v-model="selectSearchType" value-key="key" size="large" style="width: 100px">
                                <el-option v-for="item in selectOptions" :key="item.key" :label="item.value"
                                    :value="item" />
                            </el-select>
                        </template>
                        <template #append>
                            <el-button type="primary" @click="search">
                                <el-icon>
                                    <Search />
                                </el-icon>
                                &nbsp;search
                            </el-button>
                        </template>
                    </el-input>
                </el-col>
            </el-row>
        </el-header>
        <el-container>
            <el-aside :width="isCollapse?'70px':'200px'">
                <el-menu router :collapse-transition="false" default-active="/todolist" :collapse="isCollapse">
                    <el-menu-item index="/todolist">
                        <el-icon>
                            <location />
                        </el-icon>
                        <template #title>
                            TODOLIST
                        </template>
                    </el-menu-item>
                    <el-menu-item index="/okr">
                        <el-icon>
                            <icon-menu />
                        </el-icon>
                        <template #title>OKRLIST</template>
                    </el-menu-item>
                    <el-menu-item index="/notepad">
                        <el-icon>
                            <document />
                        </el-icon>
                        <template #title>记事本/便签</template>
                    </el-menu-item>
                    <!-- <el-menu-item index="/">
                        <el-icon>
                            <setting />
                        </el-icon>
                        <template #title>清空所有</template>
                    </el-menu-item> -->
                </el-menu>
            </el-aside>
            <el-main>
                <router-view />
            </el-main>
        </el-container>
    </el-container>
</template>
<script lang="ts" setup>
import { getTime } from "@/hook/date";
const isCollapse = ref(false)
interface searchItem {
    key: string, value: string, url: string
}
const time = getTime()
console.log(time);

const searchValue = ref('')
const options: searchItem[] = [{ key: '1', value: 'Bing', url: 'https://cn.bing.com/search?q=' }, { key: '2', value: 'Baidu', url: 'https://www.baidu.com/s?wd=' }, { key: '3', value: 'Google', url: 'https://www.google.com/search?q=' }]
const selectSearchType = ref(options[0])
const selectOptions = reactive(options)
const search = () => {
    window.open(selectSearchType.value.url + searchValue.value)
}
const pressSearch = (e: KeyboardEvent) => {
    if (13 === e.which) {
        search()
    }
}
</script>
<style scoped lang="less">
.container {
    width: 100%;
    height: 100%;
    .el-aside {
        border-right: 1px solid var(--el-menu-border-color);
    }

    .el-menu {
        height: 100%;
        border-right: none;
    }

    .header {
        height: 100%;

        .page-name {
            color: var(--el-color-primary-dark-2);
        }
    }

}

.read-the-docs {
    color: #888;
}
</style>