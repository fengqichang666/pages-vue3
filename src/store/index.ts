/*
 * @Author: feng
 * @Date: 2022-10-09 20:42:45
 * @LastEditTime: 2022-11-16 21:25:05
 * @Description: file content
 */
import { defineStore } from 'pinia'
import { getData } from '@/axios/common/api'
import type { RootObject, Children, ChinaTotal, ChinaAdd, StatisGradeCityDetail } from './type'
export const useStore = defineStore({
    id: 'counter',
    state: () => ({
        list: <RootObject>{},
        item: <Children[]>[],
        chinaAdd: <ChinaAdd>{},
        chinaTotal: <ChinaTotal>{},
        cityDetail: <StatisGradeCityDetail[]>[],
    }),
    actions: {
        async getList() {
            const result = await getData()
            this.list = result.data;
            this.chinaAdd = this.list.diseaseh5Shelf.chinaAdd
            this.chinaTotal = this.list.diseaseh5Shelf.chinaTotal
            this.cityDetail = this.list.statisGradeCityDetail.slice(0, 10)
        }
    }
})