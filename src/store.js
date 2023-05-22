import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

import {createVuexPersistedState} from "vue-persistedstate";
export default new Vuex.Store({
    plugins: [createVuexPersistedState()],
    state: {
        isLogin2 : false, // 로그인 여부
        accGrade : 9, // 0-관리자 / 9-승인전
    },
    mutations: {
        setLogin2( state, data ){
            state.isLogin2 = data
        },
        setAccGrade( state, accGrade ){
            state.accGrade = accGrade
        }
    },
    getters:{
        isLogin2( state, getters ){
            return state.isLogin2
        },
        getAccGrade( state, accGrade ){
            return state.accGrade
        }
    },
})