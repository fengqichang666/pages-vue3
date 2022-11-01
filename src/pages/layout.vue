<!--
 * @Author: feng
 * @Date: 2022-10-09 20:42:45
 * @LastEditTime: 2022-11-01 16:17:59
 * @Description: file content
-->
<template>
    <el-container class="container">
        <el-header>
            <el-row align="middle" :gutter="12" class="header">
                <el-col :span="3" :class="['control-menu', isCollapse ? '' : 'tc']">
                    <div @click="changeCollapse" v-show="isCollapse">
                        <el-icon>
                            <Expand />
                        </el-icon>
                    </div>
                    <div @click="changeCollapse" v-show="!isCollapse">折叠菜单<el-icon>
                            <Fold />
                        </el-icon>
                    </div>
                </el-col>
                <el-col :span="3" :offset="2">
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
                <el-col :span="4">
                    <el-switch @change="changeTheme" v-model="darkTheme" class="mt-2" style="margin-left: 24px"
                        inline-prompt :active-icon="Moon" :inactive-icon="Sunny" />
                </el-col>
            </el-row>
        </el-header>
        <el-container class="content">
            <el-aside :width="isCollapse ? '70px' : '200px'">
                <el-menu router :collapse-transition="false" :default-active="activeIndex" :collapse="isCollapse">
                    <el-menu-item index="/okr">
                        <el-icon>
                            <Aim />
                        </el-icon>
                        <template #title>OKRLIST</template>
                    </el-menu-item>
                    <el-menu-item index="/todolist">
                        <el-icon>
                            <List />
                        </el-icon>
                        <template #title>
                            TODOLIST
                        </template>
                    </el-menu-item>
                    <el-menu-item index="/notepad">
                        <el-icon>
                            <Notebook />
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
const isCollapse = ref(false)
interface searchItem {
    key: string, value: string, url: string
}

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
const changeCollapse = () => {
    isCollapse.value = !isCollapse.value
}
const route = useRoute()
const activeIndex = ref('/okr')
activeIndex.value = route.path
const isDark:string = localStorage.getItem('isDark') || '0'
const darkFlag:boolean  = isDark ==='0'?false:true
const darkTheme = ref(darkFlag)
const Sunny = 'Sunny'
const Moon = 'Moon'
const changeTheme = (e: boolean) => {
    if (e) {
        document.getElementById('app')?.setAttribute('class', 'dark')
        localStorage.setItem('isDark', '1')
    } else {
        document.getElementById('app')?.setAttribute('class', '')
        localStorage.setItem('isDark', '0')
    }
}
changeTheme(darkTheme.value)
</script>
<style scoped lang="less">
.control-menu {
    font-size: 1.3rem;
    color: var(--el-color-warning-dark-2);
    cursor: pointer;
}

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
            text-align: center;
            color: var(--el-color-primary-dark-2);
        }
    }

    .content {
        height: calc(100% - 60px);
    }

}

i {
    vertical-align: -10%;
}

.read-the-docs {
    color: #888;
}
</style>